import { Box, Button, Text, Textarea } from "@mantine/core";
import { format, addMinutes } from "date-fns";
import { GLTextarea } from "../../components/ReactTableTextarea";

import {
  formatDate,
} from "../../utils";

export const getColumns = (
    fetchPDF: any,
    editedUsers: any,
    setEditedUsers: any,
    getTableData: any,
    nowAtLoading: any
  ) => {
    const onBlur = (event: any, cell: any, column: any) => {
      const { row } = cell;
  
      if (editedUsers[row.id]) {
        setEditedUsers({
          ...editedUsers,
          [row.id]: {
            ...editedUsers[row.id],
            ...{ [column.id]: event.currentTarget.value },
          },
        });
      } else {
        setEditedUsers({
          ...editedUsers,
          [row.id]: {
            ...row.original,
            ...{ [column.id]: event.currentTarget.value },
          },
        });
      }
    };

    const onFetchPDFClick = (partNumber: any) => {
      fetchPDF(partNumber);
    };
    function isValidDate(d) {
      // @ts-ignore
      return d instanceof Date && !isNaN(d);
    }
  
    function formatDate(date: any) {
      return date
        ? isValidDate(date)
          ? format(addMinutes(date, date.getTimezoneOffset()), "MM/dd/yyyy")
          : "-"
        : "-";
    }

    return [
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
      accessorKey: "Status",
      header: "Status",
      enableEditing: false,
    },
    {
      accessorFn: (row: any) => {
        const oDay = new Date(row.Status_Date);
        return oDay;
      },
      accessorKey: "Status_Date",
      header: "Status Date",
      id: "statusDate",
      enableEditing: false,
      filterVariant: "date",
      sortingFn: "datetime",
      Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue()),
    },
    {
      accessorKey: "Hold_Note",
      header: "Hold Notes",
      enableEditing: true,
      size: 250,
      Cell: ({ cell, row }: { cell: any; row: any }) => (
        <Text>{cell.getValue()}</Text>
      ),
      Edit: ({
        cell,
        column,
        table,
      }: {
        cell: any;
        column: any;
        table: any;
      }) => {
        return (
          <GLTextarea
            cell={cell}
            table={table}
            onTextChange={(e: any) => onBlur(e, cell, column)}
          />
        );
      },
    },
    {
      id: "Priority",
      accessorKey: "Priority",
      accessorFn: (row: any) => {
        if (row.Priority) {
          return row.Priority;
        } else {
          return "5";
        }
      },
      header: "Priority",
      enableEditing: true,
      Cell: ({ cell, row }: { cell: any; row: any }) => (
        <Text>{cell.getValue()}</Text>
      ),
      mantineEditTextInputProps: ({ cell, row }: { cell: any; row: any }) => ({
        type: "test",
        onBlur: (event: any) => {
          if (editedUsers[row.id]) {
            setEditedUsers({
              ...editedUsers,
              [row.id]: {
                ...editedUsers[row.id],
                ...{ Priority: event.currentTarget.value },
              },
            });
          } else {
            setEditedUsers({
              ...editedUsers,
              [row.id]: {
                ...row.original,
                ...{ Priority: event.currentTarget.value },
              },
            });
          }
        },
      }),
    },
    // {
    //   accessorFn: (row: any) => {
    //     const oDay = new Date(row.Ship_By_Date);
    //     return oDay;
    //   },
    //   accessorKey: "Ship_By_Date",
    //   header: "Ship By Date",
    //   id: "shipByDate",
    //   enableEditing: false,
    //   filterVariant: "date",
    //   sortingFn: "datetime",
    //   Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue()),
    // },
    {
      accessorKey: "DeliveryKey",
      header: "Delivery Key",
      enableEditing: false,
      filterVariant: "autocomplete",
    },
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
  ];
};
