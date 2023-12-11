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
    // {
    //   accessorKey: "Allocated_Qty",
    //   header: "Allocated Qty",
    //   accessorFn: (row: any) => {
    //     return row.Allocated_Qty ? row.Allocated_Qty : 0;
    //   },
    //   enableEditing: false,
    //   Cell: ({ cell, row }: { cell: any; row: any }) => (
    //     <Text>{cell.getValue()}</Text>
    //   ),
    // },
    // {
    //   accessorKey: "Available_Quantity",
    //   accessorFn: (row: any) => {
    //     return row.On_Hand_Qty - row.Allocated_Qty;
    //   },
    //   header: "Available Quantity",
    //   enableEditing: false,
    //   Cell: ({ cell, row }: { cell: any; row: any }) => {
    //     const {} = row;
    //     return <Text>{cell.getValue()}</Text>;
    //   },
    // },
    {
      accessorKey: "Job",
      header: "Job",
      enableEditing: false,
    },
  ];

  return columns;
};
