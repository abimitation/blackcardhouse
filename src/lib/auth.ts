import * as schema from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: "adminsTable",
    fields: {
      emailVerified: "isEmailVerified",
    },
  },
  session: {
    modelName: "sessionsTable",
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
    fields: {
      userId: "adminId",
    },
  },
  account: {
    modelName: "accountsTable",
    fields: {
      userId: "adminId",
    },
  },
  verification: {
    modelName: "verificationsTable",
  },
});
