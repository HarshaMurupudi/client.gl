import { Box, Button, Text, Textarea } from "@mantine/core";
import { format, addMinutes } from "date-fns";

import {
  formatDate,
  getDateColor,
  subBusDays,
  formatDateWithoutTZ,
  getShipByDateColumn,
} from "../../utils";

export const getColumns = (fetchPDF: any) => {
  const onFetchPDFClick = (partNumber: any) => {
    fetchPDF(partNumber);
  };

  const columns = [
    // {
    //   header: "Job",
    //   Header: ({ column }) => (
    //     <Box style={{ background: "yellow" }}>
    //       <em>{column.columnDef.header}</em>
    //     </Box>
    //   ),
    //   columns: [
    {
      accessorKey: "Job",
      header: "Job",
      enableEditing: false,
      filterVariant: "autocomplete",
    },
    {
      id: "Part_Number",
      accessorKey: "Part_Number",
      header: "Part Number",
      enableEditing: false,
      filterVariant: "autocomplete",
      accessorFn: (row: any) => {
        const Part_Number = row.Part_Number || "";
        return Part_Number;
      },
      mantineTableBodyCellProps: ({ cell }: { cell: any }) => ({
        onClick: () => {
          onFetchPDFClick(cell.getValue());
        },
      }),
      Cell: ({ cell, row }: { cell: any; row: any }) => (
        <p
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            margin: 0,
          }}
        >
          {cell.getValue()}
        </p>
      ),
    },
    getShipByDateColumn("model"),
    //   ],
    // },
    // {
    //   header: "Info",
    //   Header: ({ column }) => (
    //     <Box style={{ background: "antiquewhite" }}>
    //       <em>{column.columnDef.header}</em>
    //     </Box>
    //   ),
    //   columns: [
    {
      accessorKey: "Sales_Rep",
      header: "Sales Rep",
      enableEditing: false,
    },
    {
      accessorKey: "Customer",
      header: "Customer",
      enableEditing: false,
      // filterVariant: 'autocomplete',
    },
    {
      accessorKey: "Quote",
      header: "Quote",
      enableEditing: false,
    },
    {
      accessorKey: "Ship_Via",
      header: "Ship Via",
      enableEditing: false,
      // filterVariant: 'autocomplete',
    },
    {
      accessorKey: "Rev",
      header: "Rev",
      enableEditing: false,
    },
    {
      accessorKey: "Description",
      header: "Description",
      enableEditing: false,
    },
    {
      accessorKey: "Order_Quantity",
      header: "Order Quantity",
      enableEditing: false,
    },
    {
      accessorKey: "Make_Quantity",
      header: "Make Quantity",
      enableEditing: false,
    },
    {
      accessorKey: "Shipped_Quantity",
      header: "Shipped Quantity",
      enableEditing: false,
    },
    {
      accessorKey: "Customer_PO",
      header: "Customer PO",
      enableEditing: false,
    },
    {
      accessorKey: "Unit_Price",
      header: "Unit Price",
      enableEditing: false,
    },
    {
      // accessorKey: "Order_Amount",
      accessorFn: (row: any) => {
        const { Unit_Price, Order_Quantity } = row;
        const Part_Number = (Unit_Price * Order_Quantity).toFixed(2);
        return Part_Number;
      },
      header: "Order Amount",
      enableEditing: false,
      Cell: ({ cell, row }: { cell: any; row: any }) => (
        <p
          style={{
            margin: 0,
          }}
        >
          ${cell.getValue()}
        </p>
      ),
    },
    {
      accessorFn: (row: any) => {
        const oDay = new Date(row.Order_Date);
        return oDay;
      },
      accessorKey: "Order_Date",
      header: "Order Date",
      id: "orderDate",
      enableEditing: false,
      filterVariant: "date",
      sortingFn: "datetime",
      Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue()),
    },
    {
      accessorKey: "Status",
      header: "Status",
      enableEditing: false,
    },
    //   ],
    // },
  ];

  return columns;
};
