import { auth } from "@/lib/auth";
import { Paper, SimpleGrid, Stack, Title } from "@mantine/core";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import OrderCount from "./_components/OrderCount";
import UserCount from "./_components/UserCount";

export const metadata: Metadata = {
  title: "Panel | BlackCardHouse",
};

export default async function PanelPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <Stack gap="xl">
      <Title>Panel</Title>
      <SimpleGrid spacing="xl" cols={{ base: 1, md: 2, lg: 3 }}>
        <Paper p="lg" withBorder>
          <Stack gap={0}>
            <Title c={"dimmed"} order={2} size="h5" fw={500}>
              Siparişler
            </Title>
            <OrderCount />
          </Stack>
        </Paper>
        <Paper p="lg" withBorder>
          <Stack gap={0}>
            <Title c={"dimmed"} order={2} size="h5" fw={500}>
              Kullanıcılar
            </Title>
            <UserCount />
          </Stack>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
}
