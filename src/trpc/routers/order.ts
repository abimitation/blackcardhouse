import { db } from "@/db";
import { ordersTable } from "@/db/schema";
import { count } from "drizzle-orm";
import { baseProcedure } from "../init";

export const orderRouter = {
  getAll: baseProcedure.query(async () => {
    return await db.select().from(ordersTable);
  }),
  getAllCount: baseProcedure.query(async () => {
    const [result] = await db.select({ count: count() }).from(ordersTable);

    return result.count;
  }),
};
