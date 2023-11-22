import React, { useEffect, useState, useMemo } from "react";
import { format, addMinutes } from "date-fns";
import { Box, Button, Text, Textarea, Checkbox } from "@mantine/core";

import { GLTextarea } from "../../components/ReactTableTextarea";
import { GLSelect } from "../../components/select";
import {
  getDateColor,
  subBusDays,
  formatDate,
  formatDateWithoutTZ,
  getShipByDateColumn,
} from "../../utils";
import { CheckboxFilter } from "../../components/TableComponents";

export const getColumns = (
  editedUsers: any,
  setEditedUsers: any,
) => {

  function isValidDate(d) {
    // @ts-ignore
    return d instanceof Date && !isNaN(d);
  }
  function formatDate(datetime: any) {
    const newDate = new Date(datetime).toLocaleDateString();
    return newDate;
  }

  const onSelect = (e: any, cell: any, column: any) => {
    const { row } = cell;

    if (editedUsers[row.id]) {
      setEditedUsers({
        ...editedUsers,
        [row.id]: { ...editedUsers[row.id], ...{ Reviewed_By: e || null} },
      });
    } else {
      setEditedUsers({
        ...editedUsers,
        [row.id]: { ...row.original, ...{ Reviewed_By: e || null} },
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

  const admins = [
    {
      label: "Susan",
      value: "Susan",
      description: ""
    },
    {
      label: "Sumit",
      value: "Sumit",
      description: ""
    },
    {
      label: "Nate",
      value: "Nate",
      description: ""
    },
    {
      label: "Needs Review",
      value: "",
      description: ""
    }
  ];

  const columns = [
    {
      accessorKey: "Date",
      header: "Date",
      enableEditing: false,
      filterVariant: "multi-select",
      size: 85,
      Cell: ({ cell }: { cell: any; }) => (
        <Text>{formatDate(cell.getValue())}</Text>
      ),
    },
    {
      accessorKey: "Employee",
      header: "Employee",
      enableEditing: false,
      filterVariant: "multi-select",
      size: 125,
    },
    {
      accessorKey: "Report_Type",
      header: "Type",
      enableEditing: false,
      filterVariant: "multi-select",
      size: 100,
    },
    {
      accessorKey: "Report_Note",
      header: "Report",
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
    {
      accessorKey: "Review_Note",
      header: "Review Notes",
      enableEditing: true,
      size: 200,
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
    {
      accessorKey: "Reviewed_By",
      header: "Reviewed By",
      filterVariant: "text",
      enableEditing: true,
      // editVariant: "multi-select",
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
          <GLSelect
            data={admins}
            cell={cell}
            table={table}
            onSelect={(e: any) => onSelect(e, cell, column)}
            textColor={"white"}
          />
        );
      },
    },
  ];

  return columns;
};
