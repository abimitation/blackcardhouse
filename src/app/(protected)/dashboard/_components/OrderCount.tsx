"use client";

import { useTRPC } from "@/trpc/client";
import { Skeleton, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

export default function OrderCount() {
  const trpc = useTRPC();
  const { data, error, isPending } = useQuery(trpc.order.getAllCount.queryOptions());
  if (isPending) return <Skeleton mt="xs" mb={6} h={24} w={100} />;
  if (error) return <Text c="red">{error.message}</Text>;
  return <Text fz="h2" fw={700}>{data}</Text>;
}
