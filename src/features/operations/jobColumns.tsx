import { format, addMinutes } from "date-fns";
import { Box, Button, Text, Textarea } from "@mantine/core";
import { formatDate } from "../../utils";

export const getJobColumns = (fetchPDF: any) => {
  const columns = [
    {
      accessorKey: "Job",
      header: "Job",
      enableEditing: false,
      Cell: ({ cell, row }: { cell: any; row: any }) => {
        const isCompleted = row.original["Status"] === "C";
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
    // Description
    {
      accessorKey: "Description",
      header: "Description",
      enableEditing: false,
    },
  ];

  return columns;
};
