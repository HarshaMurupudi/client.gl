import { format, addMinutes } from "date-fns";
import { Box, Button, Text } from "@mantine/core";

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
  getTableData: any
) => {
  const columns = [
    {
      accessorKey: "Material",
      header: "Part Number",
      enableEditing: false,
    },
    {
      accessorKey: "Description",
      header: "Description",
      enableEditing: false,
    },
    {
      accessorKey: "Location_ID",
      header: "Location",
      enableEditing: false,
    },
    {
      accessorKey: "Lot",
      header: "Lot",
      enableEditing: false,
    },
    {
      accessorKey: "On_Hand_Qty",
      header: "On Hand Qty",
      enableEditing: false,
    },
  ];

  return columns;
};
