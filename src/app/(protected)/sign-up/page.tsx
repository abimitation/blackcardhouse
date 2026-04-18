import { Box, Container, Paper } from "@mantine/core";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import SignUpForm from "./_components/SignUpForm";

export const metadata: Metadata = { title: "Kayıt Ol | BlackCardHouse" };

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
