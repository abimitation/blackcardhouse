import { createPayment } from "@/actions/payment";
import { db } from "@/db";
import { ordersTable, usersTable } from "@/db/schema";
import { calculateOrderAmount } from "@/lib/utils";
import {
  checkoutFormSchema,
  CLIENT_TYPES,
  PAYMENT_STATUSES,
} from "@/lib/validations";
import { TRPCError } from "@trpc/server";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { baseProcedure } from "../init";

// Preprocess to convert empty strings to undefined for optional fields
const checkoutInputSchema = z.preprocess(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data: any) => {
    const processed = { ...data };
    const optionalFields = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "email",
      "phone",
      "street",
      "city",
      "postcode",
      "country",
      "experiences",
      "service",
    ];

    for (const field of optionalFields) {
      if (
        processed[field] === "" ||
        processed[field] === null ||
        (Array.isArray(processed[field]) && processed[field].length === 0)
      ) {
        processed[field] = undefined;
      }
    }

    return processed;
  },
  checkoutFormSchema.partial({
    firstName: true,
    lastName: true,
    dateOfBirth: true,
    email: true,
    phone: true,
    street: true,
    city: true,
    postcode: true,
    country: true,
    experiences: true,
    service: true,
  }),
);

export const checkoutRouter = {
  create: baseProcedure
    .input(checkoutInputSchema)
    .mutation(async ({ input }) => {
      return await db.transaction(async (tx) => {
        if (!input.telegram) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Missing Telegram username",
          });
        }

        const [existingUser] = await tx
          .select()
          .from(usersTable)
          .where(eq(usersTable.telegram, input.telegram))
          .limit(1);

        if (
          input.clientType === CLIENT_TYPES.EXISTING &&
          (!existingUser || !existingUser.isServiceActive)
        ) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No account found with this Telegram username",
          });
        }

        if (
          input.clientType === CLIENT_TYPES.NEW &&
          existingUser?.isServiceActive
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "An account with this Telegram username already exists",
          });
        }

        let user;
        let experiences: string[];

        if (input.clientType === CLIENT_TYPES.NEW) {
          // For new clients, validate required fields
          if (
            !input.experiences ||
            !input.service ||
            !input.dateOfBirth ||
            !input.firstName ||
            !input.lastName ||
            !input.email ||
            !input.phone ||
            !input.street ||
            !input.city ||
            !input.country ||
            !input.postcode
          ) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "All personal details are required for new clients",
            });
          }

          experiences = input.experiences;

          const userValues = {
            dateOfBirth: input.dateOfBirth.toISOString().split("T")[0],
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone,
            street: input.street,
            city: input.city,
            country: input.country,
            postcode: input.postcode,
            telegram: input.telegram,
            notes: input.notes || "",
            experiences: input.experiences,
            service: input.service,
            isServiceActive: false,
            marketplacePackages: input.marketplacePackages || [],
          };

          if (existingUser) {
            // Overwrite stale record from a previous abandoned payment
            [user] = await tx
              .update(usersTable)
              .set({ ...userValues, updatedAt: sql`NOW()` })
              .where(eq(usersTable.id, existingUser.id))
              .returning();
          } else {
            [user] = await tx.insert(usersTable).values(userValues).returning();
          }
        } else {
          // Use existing user for existing clients
          user = existingUser;
          experiences = input.experiences || user.experiences;
        }

        const orderAmount = calculateOrderAmount({
          currency: input.currency,
          marketplacePackages: input.marketplacePackages || [],
          // @ts-expect-error as service in checkout can be undefined for existing users
          service: input.service,
          serviceAmount: input.serviceAmount,
        });

        const [order] = await tx
          .insert(ordersTable)
          .values({
            amount: orderAmount,
            currency: input.currency,
            paymentId: null,
            paymentStatus: PAYMENT_STATUSES.CREATED,
            experiences,
            userId: user.id,
            service: input.service || user.service,
            marketplacePackages: input.marketplacePackages || [],
          })
          .returning();

        // For new clients, use their provided details for payment
        // For existing clients, use their stored details
        const paymentDetails = {
          amount: orderAmount,
          city:
            input.clientType === CLIENT_TYPES.NEW ? input.city! : user.city!,
          country:
            input.clientType === CLIENT_TYPES.NEW
              ? input.country!
              : user.country!,
          email:
            input.clientType === CLIENT_TYPES.NEW ? input.email! : user.email,
          firstName:
            input.clientType === CLIENT_TYPES.NEW
              ? input.firstName!
              : user.firstName,
          lastName:
            input.clientType === CLIENT_TYPES.NEW
              ? input.lastName!
              : user.lastName,
          orderId: order.id,
          postcode:
            input.clientType === CLIENT_TYPES.NEW
              ? input.postcode!
              : user.postcode!,
          street:
            input.clientType === CLIENT_TYPES.NEW
              ? input.street!
              : user.street!,
          userId: user.id,
        };

        const { data, error } = await createPayment(paymentDetails);

        if (!data || error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to create payment",
          });
        }

        return {
          redirectUrl: data.redirectUrl,
        };
      });
    }),
};
