import { Box, Button, Text, Textarea } from "@mantine/core";

import { formatDate } from "../../utils";

export const getColumns = (fetchPDF: any) => {
  const onFetchPDFClick = (partNumber: any) => {
    fetchPDF(partNumber);
  };

  const columns = [
    {
      accessorKey: "Job",
      header: "Job",
      enableEditing: false,
      filterVariant: "autocomplete",
    },
    {
      accessorKey: "Packlist",
      header: "Packlist",
      enableEditing: false,
    },
    {
      accessorKey: "Tracking_Nbr",
      header: "Tracking Nbr",
      enableEditing: false,
    },
    {
      accessorKey: "Rev",
      header: "Rev",
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
      header: "Description",
      enableEditing: false,
    },
    {
      accessorKey: "Quote",
      header: "Quote",
      enableEditing: false,
    },
    {
      accessorKey: "Shipped_Date",
      id: "Shipped_Date",
      sortingFn: "datetime",
      accessorFn: (row: any) => {
        const sDay = new Date(row.Shipped_Date);
        return sDay;
      },
      header: "Shipped Date",
      enableEditing: false,
      Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue()),
    },
    {
      accessorKey: "Shipped_Quantity",
      header: "Shipped Quantity",
      enableEditing: false,
    },
    {
      accessorKey: "Ship_Via",
      header: "Ship Via",
      enableEditing: false,
    },
    {
      accessorKey: "Ship_To",
      header: "Ship To",
      enableEditing: false,
    },
    {
      accessorKey: "Invoice_Line",
      header: "Invoice Line",
      enableEditing: false,
    },
  ];

  return columns;
};
