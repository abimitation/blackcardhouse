"use client";

import { useTRPC } from "@/trpc/client";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import OrderTable from "./OrderTable";

export default function OrderData() {
  const trpc = useTRPC();
  const { data, error, isPending } = useQuery(trpc.order.getAll.queryOptions());
  if (isPending) return <Text>Yükleniyor...</Text>;
  if (error) return <Text c="red">{error.message}</Text>;
  // @ts-expect-error inferred timestamp types mismatch
  return <OrderTable data={data} />;
}
