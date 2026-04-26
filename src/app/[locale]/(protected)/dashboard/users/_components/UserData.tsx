"use client";

import { useTRPC } from "@/trpc/client";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import UserTable from "./UserTable";

import { useTranslations } from "next-intl";

export default function UserData() {
  const t = useTranslations("Dashboard.common");
  const trpc = useTRPC();
  const { data, error, isPending } = useQuery(trpc.user.getAll.queryOptions());
  if (isPending) return <Text>{t("loading")}</Text>;
  if (error) return <Text c="red">{error.message}</Text>;
  // @ts-expect-error inferred timestamp types mismatch
  return <UserTable data={data} />;
}
