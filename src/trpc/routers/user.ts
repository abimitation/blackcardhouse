import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { count } from "drizzle-orm";
import { baseProcedure } from "../init";

export const userRouter = {
  getAll: baseProcedure.query(async () => {
    return await db.select().from(usersTable);
  }),
  getAllCount: baseProcedure.query(async () => {
    const [result] = await db.select({ count: count() }).from(usersTable);

    return result.count;
  }),
};
