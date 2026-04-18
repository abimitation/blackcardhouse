import { auth } from "@/lib/auth";
import { Flex, Stack, Title } from "@mantine/core";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import OrderData from "./_components/OrderData";

export const metadata: Metadata = {
  title: "Siparişler | BlackCardHouse",
};

export default async function SiparişlerPage() {
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
        <Title>Siparişler</Title>
      </Flex>
      <OrderData />
    </Stack>
  );
}
