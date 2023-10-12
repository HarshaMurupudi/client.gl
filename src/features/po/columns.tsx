import { format, addMinutes } from "date-fns";
import { Box, Button, Text, Textarea } from "@mantine/core";
import {
  getDateColor,
  subBusDays,
  formatDateWithoutTZ,
  getShipByDateColumn,
} from "../../utils";

export const getColumns = (fetchPDF: any) => {
  const onFetchPDFClick = (partNumber: any) => {
    fetchPDF(partNumber);
  };
  function isValidDate(d) {
    // @ts-ignore
    return d instanceof Date && !isNaN(d);
  }
  function formatDate(date: any) {
    if (date) {
      if (isValidDate(date)) {
        return format(addMinutes(date, date.getTimezoneOffset()), "MM/dd/yyyy");
      } else {
        return "-";
      }
    } else {
      return "-";
    }
  }

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
      accessorKey: "NRE_Charges",
      header: "NRE Charges",
      enableEditing: false,
    },
    {
      accessorKey: "Customer_PO",
      header: "Customer PO",
      enableEditing: false,
    },
    {
      accessorKey: "Order_Quantity",
      header: "Order Quantity",
      enableEditing: false,
    },
    {
      accessorKey: "Rev",
      header: "Rev",
      enableEditing: false,
    },
    {
      accessorFn: (row: any) => {
        const sDay = new Date(row.Sched_Start);

        if (row.Sched_Start) return sDay;
      },
      id: "schedDate",
      header: "Sched Start",
      filterVariant: "date-range",
      sortingFn: "datetime",
      enableEditing: false,
      Cell: ({ cell }: { cell: any }) => {
        const dayOfWeekTZOffset = addMinutes(
          cell.getValue(),
          cell.getValue()?.getTimezoneOffset()
        );
        const currentDate = dayOfWeekTZOffset;
        const nDate = new Date(currentDate);

        return (
          <Text c={getDateColor(nDate)}>{formatDate(cell.getValue())}</Text>
        );
      },
    },
    getShipByDateColumn(),
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
    //   ],
    // },
  ];

  return columns;
};
