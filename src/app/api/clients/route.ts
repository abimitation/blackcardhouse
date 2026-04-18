import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const clients = await db
    .select({
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      telegram: usersTable.telegram,
    })
    .from(usersTable)
    .where(eq(usersTable.isServiceActive, true));

  return Response.json({ clients });
}
