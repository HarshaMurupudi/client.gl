import React, { useEffect, useState, useMemo } from "react";
import { format, addMinutes } from "date-fns";
import { Box, Button, Text, Textarea, Checkbox } from "@mantine/core";

import { GLTextarea } from "../../components/ReactTableTextarea";
import { formatDateWithoutTZ } from "../../utils";
import { CheckboxFilter } from "../../components/TableComponents";

export const getColumns = (
  value: any,
  editedUsers: any,
  setEditedUsers: any,
  getTableData: any
) => {
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

  const onSelect = (e: any, cell: any, column: any) => {
    const { row } = cell;

    if (editedUsers[row.id]) {
      setEditedUsers({
        ...editedUsers,
        [row.id]: { ...editedUsers[row.id], ...{ Job_Plan: e } },
      });
    } else {
      setEditedUsers({
        ...editedUsers,
        [row.id]: { ...row.original, ...{ Job_Plan: e } },
      });
    }
  };

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

  const names = [
    "Thy Suon",
    "Lyn Erie",
    "Dalton Breitzman",
    "Tracey Trudeau",
    "Sumit Mahajan",
    "Jon Erie",
  ];

  const columns = [
    {
      accessorKey: "First",
      header: "First Name",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Last",
      header: "Last Name",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "clockIn",
      header: "Clock In",
      enableEditing: false,
    },
    {
      accessorKey: "clockOut",
      header: "Clock Out",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "attendance_notes",
      header: "Notes",
      enableEditing: false,
      filterVariant: "multi-select",
    },
  ];
  return columns;
};
