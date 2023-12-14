import { format, addMinutes } from "date-fns";
import { Box, Button, Text, Skeleton } from "@mantine/core";

import { GLTextarea } from "../../components/ReactTableTextarea";
import { CheckboxFilter } from "../../components/TableComponents";
import {
  getDateColor,
  subBusDays,
  formatDateWithoutTZ,
  getShipByDateColumn,
} from "../../utils";

export const getColumns = (
  fetchPDF: any,
  editedUsers: any,
  setEditedUsers: any,
  getTableData: any,
  nowAtLoading: any
) => {
  const onQtyClick = (job: any) => {
    window.open(
      `/delivery-queue-details/${job}`,
      "_blank",
      "rel=noopener noreferrer"
    );
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

  const handleInventoryActionBtn = (row) => {
    window.open(
      `/delivery-queue-details/${row.original.Part_Number}`,
      "_blank"
    );
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
      // filterVariant: 'autocomplete',
    },
    {
      accessorKey: "Part_Number",
      header: "Part Number",
      enableEditing: false,
      // filterVariant: 'autocomplete',
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
    getShipByDateColumn(),
    {
      accessorKey: "Type",
      header: "Job Type",
      enableEditing: false,
    },
    {
      accessorKey: "Sales_Code",
      accessorFn: (row: any) => {
        return row.Sales_Code ? row.Sales_Code : "-";
      },
      header: "Sales Code",
      enableEditing: false,
      filterVariant: "multi-select",
      // mantineFilterMultiSelectProps
      Filter: ({ column, table }) => (
        <CheckboxFilter
          column={column}
          options={[
            ...new Set(
              getTableData.map((item) => item.Sales_Code).filter((item) => item)
            ),
          ]}
        />
      ),
      filterFn: (row, id, filterValue) => {
        if (filterValue.length > 0) {
          if (row.getValue(id)) {
            return filterValue.includes(row.getValue(id));
          } else {
            return false;
          }
        } else {
          return true;
        }
      },
    },
    //   ],
    // },
    // {
    //   header: "Notes",
    //   enableColumnFilterModes: false,
    //   Header: ({ column }) => (
    //     <Box style={{ background: "aliceblue" }}>
    //       <em>{column.columnDef.header}</em>
    //     </Box>
    //   ),
    //   columns: [
    {
      accessorKey: "Priority",
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
    {
      accessorKey: "Notes",
      header: "Notes",
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
    //   accessorKey: "On_Hand_Qty",
    //   header: "On Hand Qty",
    //   filterVariant: "autocomplete",
    //   enableEditing: false,
    //   mantineTableBodyCellProps: ({ cell, row }: { cell: any; row: any }) => ({
    //     onClick: () => {
    //       onQtyClick(row.original?.Job);
    //     },
    //   }),
    //   Cell: ({ cell, row }: { cell: any; row: any }) => (
    //     <Button variant="light" size="xs" compact>
    //       Qty
    //     </Button>
    //   ),
    // },
    {
      accessorKey: "Promised_Quantity",
      header: "Promised Quantity",
    },
    // {
    //   accessorKey: "On_Hand_Qty",
    //   header: "On Hand Qty",
    //   enableEditing: false,
    //   // accessorFn: (row: any) => {
    //   //   const Job = row["Now At"] || "";
    //   //   return Job;
    //   // },
    //   mantineTableBodyCellProps: ({ cell, row }: { cell: any; row: any }) => ({
    //     onClick: () => {
    //       handleInventoryActionBtn(row);
    //     },
    //   }),
    //   Cell: ({ cell, row }: { cell: any; row: any }) => {
    //     if (nowAtLoading) {
    //       return <Skeleton height={8} mt={6} width="70%" radius="xl" />;
    //     } else if (cell.getValue() === undefined) {
    //       return "-";
    //     } else {
    //       return (
    //         <p
    //           style={{
    //             textDecoration: "underline",
    //             cursor: "pointer",
    //             margin: 0,
    //           }}
    //         >
    //           {cell.getValue()}
    //         </p>
    //       );
    //     }
    //   },
    //   // filterVariant: 'autocomplete',
    // },
    // {
    //   accessorKey: "Allocated_Qty",
    //   header: "Allocated Qty",
    //   enableEditing: false,
    //   Cell: ({ cell, row }: { cell: any; row: any }) => {
    //     if (nowAtLoading) {
    //       return <Skeleton height={8} mt={6} width="70%" radius="xl" />;
    //     } else if (cell.getValue() === undefined) {
    //       return "-";
    //     } else {
    //       return cell.getValue();
    //     }
    //   },
    // },
    // {
    //   accessorKey: "Available_Quantity",
    //   accessorFn: (row: any) => {
    //     return row.On_Hand_Qty - row.Allocated_Qty;
    //   },
    //   header: "Available Quantity",
    //   enableEditing: false,
    //   Cell: ({ cell, row }: { cell: any; row: any }) => {
    //     if (nowAtLoading) {
    //       return <Skeleton height={8} mt={6} width="70%" radius="xl" />;
    //     } else if (cell.getValue() === undefined) {
    //       return "-";
    //     } else {
    //       return cell.getValue();
    //     }
    //   },
    // },
    {
      accessorKey: "Rev",
      header: "Rev",
    },
    {
      accessorKey: "Customer",
      header: "Customer",
      enableEditing: false,
      // filterVariant: 'autocomplete',
    },
    {
      accessorKey: "Status",
      header: "Status",
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
      accessorKey: "Customer_PO",
      header: "Customer PO",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Customer_PO = row["Customer_PO"] || "";
        return Customer_PO;
      },
    },
    {
      accessorKey: "Order_Quantity",
      header: "Order Quantity",
      enableEditing: false,
    },
    {
      accessorKey: "Completed_Quantity",
      header: "Completed Quantity",
      enableEditing: false,
    },
    {
      accessorKey: "Lead_Days",
      header: "Lead Days",
      enableEditing: false,
    },
    {
      accessorFn: (row: any) => {
        const sDay = new Date(row.Promised_Date);
        return sDay;
      },
      enableEditing: false,
      id: "promisedDate",
      header: "Promised Date",
      filterVariant: "date",
      sortingFn: "datetime",
      enableColumnFilterModes: false,
      Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue()),
    },
    {
      id: "requestedDate",
      enableEditing: false,
      accessorFn: (row: any) => {
        const sDay = new Date(row.Requested_Date);
        return sDay;
      },
      header: "Requested Date",
      filterVariant: "date",
      sortingFn: "datetime",
      enableColumnFilterModes: false,
      Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue()),
    },
    //   ],
    // },
  ];

  return columns;
};
