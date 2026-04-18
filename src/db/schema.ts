import { marketplacePackageIdsMap } from "@/config/marketplace";
import { serviceMap } from "@/config/services";
import { PAYMENT_STATUSES } from "@/lib/validations";
import {
  boolean,
  date,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { v4 as uuid } from "uuid";

const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
  updatedAt: timestamp("updated_at"),
};

export const marketplacePackageEnum = pgEnum(
  "marketplace_package",
  marketplacePackageIdsMap,
);
export const serviceEnum = pgEnum("service", serviceMap);

/**
 *  https://portal.cardiful.com/docs/en/guides/payments/status-list
 * */
export const paymentStatusEnum = pgEnum(
  "payment_status",
  Object.values(PAYMENT_STATUSES) as [string, ...string[]],
);

export const adminsTable = pgTable("admins", {
  id: varchar({ length: 255 }).primaryKey(),
  name: varchar({ length: 50 }).notNull(),
  email: varchar({ length: 150 }).notNull().unique(),
  image: varchar({ length: 255 }),
  isEmailVerified: boolean("is_email_verified").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const usersTable = pgTable("users", {
  id: varchar({ length: 255 })
    .primaryKey()
    .$defaultFn(() => uuid()),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  email: varchar({ length: 150 }).notNull().unique(),
  phone: varchar({ length: 20 }).notNull(),
  telegram: varchar({ length: 32 }).notNull().unique(),
  notes: text(),
  street: varchar({ length: 100 }),
  city: varchar({ length: 85 }),
  country: varchar({ length: 56 }),
  postcode: varchar({ length: 20 }),
  experiences: text().array().notNull(),
  service: serviceEnum("service").notNull(),
  isServiceActive: boolean("is_service_active").default(false),
  marketplacePackages: marketplacePackageEnum("marketplace_package").array(),
  ...timestamps,
});

export type UserCreate = typeof usersTable.$inferInsert;
export type UserSelect = typeof usersTable.$inferSelect;

export const sessionsTable = pgTable("sessions", {
  id: varchar({ length: 255 }).primaryKey(),
  adminId: varchar("admin_id", { length: 255 })
    .notNull()
    .references(() => adminsTable.id, { onDelete: "cascade" }),
  token: varchar({ length: 255 }).notNull().unique(),
  ipAddress: varchar("ip_address", { length: 255 }),
  userAgent: varchar("user_agent", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const accountsTable = pgTable("accounts", {
  id: varchar({ length: 255 }).primaryKey(),
  accountId: varchar("account_id", { length: 255 }).notNull(),
  providerId: varchar("provider_id", { length: 255 }).notNull(),
  adminId: varchar("admin_id", { length: 255 })
    .notNull()
    .references(() => adminsTable.id, { onDelete: "cascade" }),
  accessToken: varchar("access_token", { length: 255 }),
  refreshToken: varchar("refresh_token", { length: 255 }),
  idToken: varchar("id_token", { length: 255 }),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: varchar({ length: 255 }),
  password: varchar({ length: 255 }),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const verificationsTable = pgTable("verifications", {
  id: varchar({ length: 255 }).primaryKey(),
  identifier: varchar({ length: 255 }).notNull(),
  value: varchar({ length: 255 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const ordersTable = pgTable("orders", {
  id: varchar({ length: 255 })
    .primaryKey()
    .$defaultFn(() => uuid()),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  amount: numeric({ mode: "number" }),
  currency: varchar().notNull(),
  experiences: text().array().notNull(),
  service: serviceEnum("service").notNull(),
  paymentId: varchar(),
  paymentStatus: paymentStatusEnum("payment_status").notNull(),
  marketplacePackages: marketplacePackageEnum("marketplace_package").array(),
  ...timestamps,
});

export type OrderCreate = typeof ordersTable.$inferInsert;
export type OrderSelect = typeof ordersTable.$inferSelect;
