"use client";

import { authClient } from "@/lib/authClient";
import {
  AppShell,
  Avatar,
  Burger,
  Divider,
  Group,
  NavLink,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logoImg from "@public/img/logo-plain.webp";
import {
  HouseIcon,
  LogOutIcon,
  ReceiptTextIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onError: ({ error }) => console.error("[Better Auth]:", error),
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  }
  return (
    <NavLink
      c="red"
      fw={500}
      onClick={handleSignOut}
      label="Çıkış Yap"
      leftSection={<LogOutIcon size={20} />}
    />
  );
};

const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession();
  if (isPending || !session) {
    return (
      <Group p="xs">
        <Skeleton h={38} w={38} circle />
        <Stack gap={6}>
          <Skeleton h={12} w={80} radius="xl" />
          <Skeleton h={10} w={128} radius="xl" />
        </Stack>
      </Group>
    );
  }
  return (
    <Group p="xs" gap="xs" wrap="nowrap">
      <Avatar name={session.user.email} color="initials" />
      <Stack gap={0} maw={{ base: 124, sm: 88, md: 124 }}>
        <Text size="sm" fw={500} truncate>
          {session.user.name}
        </Text>
        <Text c="dimmed" size="xs" truncate>
          {session.user.email}
        </Text>
      </Stack>
    </Group>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [opened, { close, toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: { base: 60, sm: 0 } }}
      navbar={{
        width: { base: 256, md: 300 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding={{ base: "md", sm: "xl" }}
    >
      <AppShell.Header hiddenFrom="sm">
        <Group justify="space-between" h="100%" px="md">
          <Image
            src={logoImg}
            width={48}
            height={48}
            alt="BlackCardHouse logo"
            quality={100}
          />
          <Burger opened={opened} onClick={toggle} size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section visibleFrom="sm">
          <Stack gap="xs">
            <Image
              src={logoImg}
              width={48}
              height={48}
              alt="BlackCardHouse logo"
              quality={100}
            />
            <Divider />
          </Stack>
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          <Stack pt="xs" gap="xs">
            <NavLink
              component={Link}
              fw={500}
              href="/dashboard"
              leftSection={<HouseIcon size={20} />}
              label="Panel"
              onClick={close}
            />
            <NavLink
              component={Link}
              fw={500}
              href="/dashboard/orders"
              leftSection={<ReceiptTextIcon size={20} />}
              label="Siparişler"
              onClick={close}
            />
            <NavLink
              component={Link}
              fw={500}
              href="/dashboard/users"
              leftSection={<UsersIcon size={20} />}
              label="Kullanıcılar"
              onClick={close}
            />
          </Stack>
        </AppShell.Section>
        <AppShell.Section>
          <Stack gap="xs">
            <Divider />
            <SignOutButton />
            <UserInfo />
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
