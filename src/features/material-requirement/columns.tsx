import { format, addMinutes } from "date-fns";
import { Box, Button, Text, Textarea } from "@mantine/core";
import { formatDate } from "../../utils";

export const getColumns = (fetchPDF: any, totalOpenQty) => {
  const columns = [
    // Description
    {
      accessorKey: "Job",
      header: "Job",
      enableEditing: false,
    },
    {
      accessorKey: "Due_Date",
      accessorFn: (row: any) => {
        const sDay = row.Due_Date ? new Date(row.Due_Date) : null;
        return sDay;
      },
      header: "Due Date",
      enableEditing: false,
      Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue()),
    },
    {
      accessorKey: "Sales_Code",
      header: "Sales Code",
      enableEditing: false,
    },
    {
      accessorKey: "Priority",
      header: "Priority",
      enableEditing: false,
    },
    {
      accessorKey: "Customer",
      header: "Customer",
      enableEditing: false,
    },
    {
      accessorKey: "Part_Number",
      header: "Part Number",
      enableEditing: false,
    },
    {
      accessorKey: "Description",
      header: "Part Description",
      enableEditing: false,
    },
    {
      accessorKey: "Order_Quantity",
      header: "Order Quantity",
      enableEditing: false,
    },
    {
      accessorKey: "Sched_End",
      header: "Next Due Date",
      accessorFn: (row: any) => {
        const sDay = row.Sched_End ? new Date(row.Sched_End) : null;
        return sDay;
      },
      enableEditing: false,
      Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue()),
    },
    {
      accessorKey: "Quantity_Per",
      header: "Qty Per Part",
      enableEditing: false,
    },
    {
      accessorKey: "Est_Qty",
      header: "Qty Need",
      enableEditing: false,
    },
    {
      accessorKey: "Act_Qty",
      header: "Qty Used",
      enableEditing: false,
    },
    {
      accessorKey: "Deferred_Qty",
      accessorFn: (row: any) => {
        return row.Deferred_Qty.toFixed(2);
      },
      header: "Qty Open",
      enableEditing: false,
    },
  ];

  return columns;
};
