import { format, addMinutes } from "date-fns";
import { Box, Button, Text, Textarea } from "@mantine/core";
import { formatDate } from "../../utils";

export const getOperationColumns = (fetchPDF: any) => {
  const columns = [
    // {
    //   accessorKey: "Job",
    //   header: "Job",
    //   enableEditing: false,
    // },
    {
      accessorKey: "Work_Center",
      header: "Work Center",
      enableEditing: false,
    },
    {
      accessorKey: "WC_Vendor",
      header: "WC Vendor",
      enableEditing: false,
    },
    {
      accessorKey: "Sequence",
      header: "Sequence",
      enableEditing: false,
    },
    {
      accessorKey: "Description",
      header: "Description",
      enableEditing: false,
    },
    {
      accessorKey: "Status",
      header: "Status",
      enableEditing: false,
      Cell: ({ cell, row }: { cell: any; row: any }) => {
        const isCompleted = row.getValue("Status") === "C";
        if (isCompleted) {
          return (
            <Text style={{ backgroundColor: "darkseagreen" }}>
              {cell.getValue()}
            </Text>
          );
        } else {
          return <Text>{cell.getValue()}</Text>;
        }
      },
    },
  ];

  return columns;
};