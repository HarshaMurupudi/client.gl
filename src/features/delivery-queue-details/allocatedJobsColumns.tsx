import { format, addMinutes } from "date-fns";
import { Box, Button, Text } from "@mantine/core";

import { GLTextarea } from "../../components/ReactTableTextarea";
import { CheckboxFilter } from "../../components/TableComponents";
import {
    formatDate,
    getDateColor,
    subBusDays,
    formatDateWithoutTZ,
    getShipByDateColumn,
  } from "../../utils";

export const getAllocatedJobsColumns = (
  fetchPDF: any,
  editedUsers: any,
  setEditedUsers: any,
  getTableData: any
) => {
  const columns = [
    {
      accessorKey: "Job",
      header: "Job",
      enableEditing: false,
    },
    {
      accessorKey: "Est_Qty",
      header: "Estimated Qty",
      enableEditing: false,
    },
    {
      accessorKey: "Deferred_Qty",
      header: "Open Qty",
      enableEditing: false,
    },
    {
      accessorKey: "Due_Date",
      id: "dueDate",
      accessorFn: (row: any) => {
        const oDay = row.Due_Date ? new Date(row.Due_Date) : undefined;
        return oDay;
      },
      header: "Required Date",
      enableEditing: false,
      Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue()),

    },
  ];

  return columns;
};
