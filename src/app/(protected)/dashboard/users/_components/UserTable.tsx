"use client";

import { UserSelect } from "@/db/schema";
import { Box, Divider, Flex, Pagination, Table, Text } from "@mantine/core";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";

export default function UserTable({ data }: { data: UserSelect[] }) {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const columns = useMemo<ColumnDef<UserSelect>[]>(() => [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "firstName", header: "Ad" },
    { accessorKey: "lastName", header: "Soyad" },
    { accessorKey: "email", header: "E-posta" },
    { accessorKey: "telegram", header: "Telegram" },
    { accessorKey: "service", header: "Hizmet" },
    { accessorKey: "createdAt", header: "Oluşturuldu", cell: (info) => { const value = info.getValue(); if (typeof value === "string") return new Date(value).toLocaleString(); } },
  ], []);
  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel(), onPaginationChange: setPagination, state: { pagination }, initialState: { sorting: [{ id: "createdAt", desc: false }] } });
  const startRow = table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1;
  const endRow = Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length);
  const totalRows = data.length;
  return <div><div style={{ display: "flow-root" }}><Box mx={{ base: "-1rem", sm: "-2rem" }} px={{ base: "md", sm: "xl" }} style={{ overflowX: "auto" }}><Table><Table.Thead>{table.getHeaderGroups().map((headerGroup) => <Table.Tr key={headerGroup.id}>{headerGroup.headers.map((header) => <Table.Th key={header.id} colSpan={header.colSpan} style={{ width: `calc(100% / ${headerGroup.headers.length})`, whiteSpace: "nowrap" }}>{flexRender(header.column.columnDef.header, header.getContext())}</Table.Th>)}</Table.Tr>)}</Table.Thead><Table.Tbody>{table.getRowModel().rows.map((row) => <Table.Tr key={row.id}>{row.getVisibleCells().map((cell) => <Table.Td key={cell.id} style={{ whiteSpace: "nowrap" }}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Td>)}</Table.Tr>)}</Table.Tbody></Table></Box></div>{table.getPageCount() > 1 && <><Divider /><Flex align="center" justify="space-between" direction={{ base: "column", sm: "row" }} p="xs" gap="xs"><Text>Gösterilen <Text component="span" fw={600}>{startRow}</Text> ile <Text component="span" fw={600}>{endRow}</Text> / <Text component="span" fw={600}>{totalRows}</Text> sonuç</Text><Pagination value={table.getState().pagination.pageIndex + 1} onChange={(index) => table.setPageIndex(index - 1)} total={table.getPageCount()} /></Flex></>}</div>;
}
