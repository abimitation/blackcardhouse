import { auth } from "@/lib/auth";
import { Paper, SimpleGrid, Stack, Title } from "@mantine/core";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import OrderCount from "./_components/OrderCount";
import UserCount from "./_components/UserCount";

import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard" });

  return {
    title: `${t("panel.title")} | BlackCardHouse`,
  };
}

export default async function PanelPage() {
  const t = await getTranslations("Dashboard.panel");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <Stack gap="xl">
      <Title>{t("title")}</Title>
      <SimpleGrid spacing="xl" cols={{ base: 1, md: 2, lg: 3 }}>
        <Paper p="lg" withBorder>
          <Stack gap={0}>
            <Title c={"dimmed"} order={2} size="h5" fw={500}>
              {t("order_count_label")}
            </Title>
            <OrderCount />
          </Stack>
        </Paper>
        <Paper p="lg" withBorder>
          <Stack gap={0}>
            <Title c={"dimmed"} order={2} size="h5" fw={500}>
              {t("user_count_label")}
            </Title>
            <UserCount />
          </Stack>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
}
