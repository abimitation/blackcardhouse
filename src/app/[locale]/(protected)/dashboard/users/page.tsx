import { auth } from "@/lib/auth";
import { Flex, Stack, Title } from "@mantine/core";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UserData from "./_components/UserData";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard" });

  return {
    title: `${t("users.title")} | BlackCardHouse`,
  };
}

export default async function UsersPage() {
  const t = await getTranslations("Dashboard.users");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  return (
    <Stack gap="xl">
      <Flex
        align={{ xs: "center" }}
        gap={"md"}
        direction={{ base: "column", xs: "row" }}
        justify="space-between"
      >
        <Title>{t("title")}</Title>
      </Flex>
      <UserData />
    </Stack>
  );
}
