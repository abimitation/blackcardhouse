import { sendOrderConfirmationMail } from "@/actions/mail";
import { sendTelegramMessage } from "@/actions/telegram";
import { Currency } from "@/config/currencies";
import { db } from "@/db";
import { ordersTable, usersTable } from "@/db/schema";
import {
  PAYMENT_STATUSES,
  TransactionCallbackResponse,
} from "@/lib/validations";
import { eq, sql } from "drizzle-orm";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // const signature = request.headers.get("x-signature");

  // if (!signature) {
  //   return new Response("Unauthorized", { status: 401 });
  // }
  const searchParams = request.nextUrl.searchParams;
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return new Response("Bad Request", { status: 400 });
  }

  const data = (await request.json()) as TransactionCallbackResponse;

  const [order] = await db
    .update(ordersTable)
    .set({
      paymentId: data.transaction_id,
      paymentStatus: data.status,
      updatedAt: sql`NOW()`,
    })
    .where(eq(ordersTable.id, orderId))
    .returning();

  if (!order) {
    return new Response(JSON.stringify({ error: "Order not found" }), {
      status: 404,
    });
  }

  if (data.status === PAYMENT_STATUSES.DONE) {
    await db
      .update(usersTable)
      .set({ isServiceActive: true, updatedAt: sql`NOW()` })
      .where(eq(usersTable.id, order.userId));

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, order.userId));

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    await Promise.all([
      sendTelegramMessage({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        experiences: user.experiences,
        service: user.service,
        telegram: user.telegram,
      }).catch(() => console.log("Failed to send a Telegram message")),
      sendOrderConfirmationMail({
        amount: data.amount_out,
        cardNetwork: "",
        cardNumber: data.deposit_details.bank_card_mask,
        currency: order.currency as Currency,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        marketplacePackages: order.marketplacePackages,
        orderId: order.id,
        phone: user.phone,
        service: order.service ?? null,
        transactionDate: order.createdAt
          .toISOString()
          .replace("T", " ")
          .substring(0, 19),
        transactionId: order.paymentId!,
      }).catch(() => console.log("Failed to send order confirmation email")),
    ]);
  }

  return Response.json({ ok: true });
}
