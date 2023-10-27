import { format, addMinutes } from "date-fns";
import { Box, Button, Text, Textarea } from "@mantine/core";
import { formatDate } from "../../utils";

export const getMaterialRequirementsColumns = () => {
  const columns = [
    {
      accessorKey: "Job",
      header: "Job",
      enableEditing: false,
    },
    {
      accessorKey: "Material",
      header: "Material",
      enableEditing: false,
    },
    {
      accessorKey: "Est_Qty",
      header: "Qty Need",
      enableEditing: false,
    },
  ];

  return columns;
};
