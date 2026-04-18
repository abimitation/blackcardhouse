import { Box, Container, Paper } from "@mantine/core";
import { Metadata } from "next";
import LoginForm from "./_components/LoginForm";

export const metadata: Metadata = { title: "Giriş | BlackCardHouse" };

export default function LoginPage() {
  return (
    <Box display={"flex"} mih={"100dvh"}>
      <Container size={420} py={40} my={"auto"} w={"100%"}>
        <Paper withBorder shadow="md" p={30} radius="md">
          <LoginForm />
        </Paper>
      </Container>
    </Box>
  );
}
