import { auth } from "@/lib/auth";
import { Flex, Stack, Title } from "@mantine/core";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UserData from "./_components/UserData";

export const metadata: Metadata = {
  title: "Kullanıcılar | BlackCardHouse",
};

export default async function KullanıcılarPage() {
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
        <Title>Kullanıcılar</Title>
      </Flex>
      <UserData />
    </Stack>
  );
}
