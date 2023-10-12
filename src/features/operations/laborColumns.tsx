import { format, addMinutes } from "date-fns";
import { Box, Button, Text, Textarea } from "@mantine/core";
import { formatDate } from "../../utils";

export const getColumns = (fetchPDF: any) => {
  const columns = [
    {
      accessorKey: "Employee",
      accessorFn: (row: any) => {
        const { employee } = row;
        const { First_Name, Last_Name } = employee;
        return `${First_Name} ${Last_Name}`;
      },
      header: "Employee",
      enableEditing: false,
    },
    {
      accessorKey: "Act_Setup_Hrs",
      header: "Setup Hrs",
      enableEditing: false,
    },
    {
      accessorKey: "Act_Run_Hrs",
      header: "Run Hrs",
      enableEditing: false,
    },
    {
      accessorKey: "Act_Run_Qty",
      header: "Run Qty",
      enableEditing: false,
    },
    {
      accessorKey: "Act_Scrap_Qty",
      header: "Scrap Qty",
      enableEditing: false,
    },
    {
      accessorKey: "Work_Date",
      accessorFn: (row: any) => {
        const oDay = new Date(row.Work_Date);
        return oDay;
      },
      header: "Work Date",
      enableEditing: false,
      Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue()),
    },
  ];

  return columns;
};
