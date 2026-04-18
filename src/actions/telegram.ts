"use server";

import { UserSelect } from "@/db/schema";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const ADMIN_IDS = [878887234, 846085138];

export async function sendTelegramMessage({
  email,
  experiences,
  firstName,
  lastName,
  phone,
  service,
  telegram,
}: Pick<
  UserSelect,
  | "email"
  | "experiences"
  | "firstName"
  | "lastName"
  | "phone"
  | "service"
  | "telegram"
>) {
  const message = `🆕 *Yeni müşteri*\n\n*Ad Soyad:* ${firstName} ${lastName} (${email}; ${phone})\n*Telegram:* ${telegram}\n*Hizmet:* ${service}\n*İlgilendiği alanlar:* ${experiences.join(", ")}`;

  await Promise.all(
    ADMIN_IDS.map((adminId) =>
      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: adminId,
          text: message,
          parse_mode: "Markdown",
        }),
      }),
    ),
  );
}
