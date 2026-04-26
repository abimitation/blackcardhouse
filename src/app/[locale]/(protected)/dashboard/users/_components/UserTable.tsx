"use client";

import { UserSelect } from "@/db/schema";
import { Box, Divider, Flex, Pagination, Table, Text } from "@mantine/core";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

export default function UserTable({ data }: { data: UserSelect[] }) {
  const t = useTranslations("Dashboard.users.table");
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const columns = useMemo<ColumnDef<UserSelect>[]>(() => [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "firstName", header: t("first_name") },
    { accessorKey: "lastName", header: t("last_name") },
    { accessorKey: "email", header: t("email") },
    { accessorKey: "telegram", header: t("telegram") },
    { accessorKey: "service", header: t("service") },
    { accessorKey: "createdAt", header: t("created_at"), cell: (info) => { const value = info.getValue(); if (typeof value === "string") return new Date(value).toLocaleString(); } },
  ], [t]);
  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel(), onPaginationChange: setPagination, state: { pagination }, initialState: { sorting: [{ id: "createdAt", desc: false }] } });
  const startRow = table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1;
  const endRow = Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length);
  const totalRows = data.length;
  return <div><div style={{ display: "flow-root" }}><Box mx={{ base: "-1rem", sm: "-2rem" }} px={{ base: "md", sm: "xl" }} style={{ overflowX: "auto" }}><Table><Table.Thead>{table.getHeaderGroups().map((headerGroup) => <Table.Tr key={headerGroup.id}>{headerGroup.headers.map((header) => <Table.Th key={header.id} colSpan={header.colSpan} style={{ width: `calc(100% / ${headerGroup.headers.length})`, whiteSpace: "nowrap" }}>{flexRender(header.column.columnDef.header, header.getContext())}</Table.Th>)}</Table.Tr>)}</Table.Thead><Table.Tbody>{table.getRowModel().rows.map((row) => <Table.Tr key={row.id}>{row.getVisibleCells().map((cell) => <Table.Td key={cell.id} style={{ whiteSpace: "nowrap" }}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Td>)}</Table.Tr>)}</Table.Tbody></Table></Box></div>{table.getPageCount() > 1 && <><Divider /><Flex align="center" justify="space-between" direction={{ base: "column", sm: "row" }} p="xs" gap="xs"><Text>{t("results_count", { start: startRow, end: endRow, total: totalRows })}</Text><Pagination value={table.getState().pagination.pageIndex + 1} onChange={(index) => table.setPageIndex(index - 1)} total={table.getPageCount()} /></Flex></>}</div>;
}
