import { Box, Container, Paper } from "@mantine/core";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import SignUpForm from "./_components/SignUpForm";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Auth" });

  return {
    title: `${t("signup_title")} | BlackCardHouse`,
  };
}

export default async function SignUpPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) {
  const { id } = await searchParams;
  if (id !== "admin") redirect("/");
  return (
    <Box display={"flex"} mih={"100dvh"}>
      <Container size={420} py={40} my={"auto"} w={"100%"}>
        <Paper withBorder shadow="md" p={30} radius="md">
          <SignUpForm />
        </Paper>
      </Container>
    </Box>
  );
}
