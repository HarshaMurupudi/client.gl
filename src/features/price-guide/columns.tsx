import { Box, Button, Text, Textarea, Skeleton } from "@mantine/core";
import { format, addMinutes } from "date-fns";
import { CheckboxFilter } from "../../components/TableComponents";

import {
  formatDate,
  getDateColor,
  subBusDays,
  formatDateWithoutTZ,
  getShipByDateColumn,
} from "../../utils";

const handleInventoryActionBtn = (row) => {
  window.open(
    `/delivery-queue-details/${row.original.Part_Number}_${row.original.Job}`,
    "_blank"
  );
};

export const getColumns = (fetchPDF: any, getTableData: any) => {
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
      accessorKey: "Order_Quantity",
      header: "Order Quantity",
      enableEditing: false,
    },
    {
      accessorKey: "Unit_Price",
      header: "Unit Price",
      enableEditing: false,
      Cell: ({ cell }: { cell: any }) => Math.round(cell.getValue()).toFixed(2),
    },
    {
      accessorKey: "Quote",
      header: "Quote",
      enableEditing: false,
    },
    {
      accessorKey: "Estimated",
      header: "Est. Cost",
      enableEditing: false,
      Cell: ({ cell }: { cell: any }) => Math.round(cell.getValue()).toFixed(2),
    },
    {
      accessorKey: "Actual",
      header: "Act. Cost",
      enableEditing: false,
      Cell: ({ cell }: { cell: any }) => Math.round(cell.getValue()).toFixed(2),
    },

    {
      accessorKey: "Total_Price",
      header: "Total Price",
      enableEditing: false,
      Cell: ({ cell }: { cell: any }) => Math.round(cell.getValue()).toFixed(2),
    },
    {
      accessorKey: "Act_Revenue",
      header: "Act. Revenue",
      enableEditing: false,
      Cell: ({ cell }: { cell: any }) => Math.round(cell.getValue()).toFixed(2),
    },
    {
      accessorKey: "Profit",
      header: "Profit",
      enableEditing: false,
      Cell: ({ cell }: { cell: any }) => `${Math.round(cell.getValue()).toFixed(2)}%`,
    },
    
    // getShipByDateColumn("model"),
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
    // {
    //   accessorKey: "Sales_Rep",
    //   header: "Sales Rep",
    //   enableEditing: false,
    // },
    // {
    //   accessorKey: "Customer",
    //   header: "Customer",
    //   enableEditing: false,
    //   // filterVariant: 'autocomplete',
    // },
    // {
    //   accessorKey: "Ship_Via",
    //   header: "Ship Via",
    //   enableEditing: false,
    //   // filterVariant: 'autocomplete',
    // },
    // {
    //   accessorKey: "Rev",
    //   header: "Rev",
    //   enableEditing: false,
    // },
    // {
    //   accessorKey: "Description",
    //   header: "Description",
    //   enableEditing: false,
    // },
    // {
    //   accessorKey: "Make_Quantity",
    //   header: "Make Quantity",
    //   enableEditing: false,
    // },
    // {
    //   accessorKey: "Shipped_Quantity",
    //   header: "Shipped Quantity",
    //   enableEditing: false,
    // },
    // {
    //   accessorKey: "Customer_PO",
    //   header: "Customer PO",
    //   enableEditing: false,
    // },
    // {
    //   accessorKey: "Sales_Code",
    //   accessorFn: (row: any) => {
    //     return row.Sales_Code ? row.Sales_Code : "-";
    //   },
    //   header: "Sales Code",
    //   enableEditing: false,
    //   filterVariant: "multi-select",
    //   // mantineFilterMultiSelectProps
    //   Filter: ({ column, table }) => (
    //     <CheckboxFilter
    //       column={column}
    //       options={[
    //         ...new Set(
    //           getTableData.map((item) => item.Sales_Code).filter((item) => item)
    //         ),
    //       ]}
    //     />
    //   ),
    //   filterFn: (row, id, filterValue) => {
    //     if (filterValue.length > 0) {
    //       if (row.getValue(id)) {
    //         return filterValue.includes(row.getValue(id));
    //       } else {
    //         return false;
    //       }
    //     } else {
    //       return true;
    //     }
    //   },
    // },
    // {
    //   // accessorKey: "Order_Amount",
    //   accessorFn: (row: any) => {
    //     const { Unit_Price, Order_Quantity } = row;
    //     const Part_Number = (Unit_Price * Order_Quantity).toFixed(2);
    //     return Part_Number;
    //   },
    //   header: "Order Amount",
    //   enableEditing: false,
    //   Cell: ({ cell, row }: { cell: any; row: any }) => (
    //     <p
    //       style={{
    //         margin: 0,
    //       }}
    //     >
    //       ${cell.getValue()}
    //     </p>
    //   ),
    // },
    // {
    //   accessorKey: "Status",
    //   header: "Status",
    //   enableEditing: false,
    // },
    //   ],
    // },
  ];

  return columns;
};
