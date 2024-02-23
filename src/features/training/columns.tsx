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

export const getTrainingColumns = (
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

  const columns = [
    {
      accessorKey: "Training_ID",
      header: "ID",
      enableEditing: false,
      size: 75,
      filterVariant: "autocomplete",
    },
    {
      accessorKey: "Date",
      header: "Date Added",
      size: 100,
      enableEditing: false,
      sortingFn: "datetime",
      filterVariant: "multi-select",
      Cell: ({ cell, row }: { cell: any; row: any }) => (
        <Text>{formatDate(cell.getValue())}</Text>
      ),
    },
    {
      accessorKey: "Trainer",
      header: "Trainer",
      size: 150,
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Training_Title",
      header: "Training Title",
      enableEditing: true,
      filterVariant: "multi-select",
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
      accessorKey: "Training_Type",
      header: "Training Type",
      enableEditing: true,
      size: 100,
      filterVariant: "multi-select",
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
      accessorKey: "Training_Description",
      header: "Description",
      enableEditing: true,
      size: 250,
      filterVariant: "multi-select",
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
    }
  ];

  return columns;
};

export const getLogColumns = (
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

  const columns = [
    {
      accessorKey: "Training_ID",
      header: "ID",
      enableEditing: false,
      size: 85,
      filterVariant: "autocomplete",
    },
    {
      accessorKey: "Date",
      header: "Date Completed",
      enableEditing: false,
      filterVariant: "multi-select",
      sortingFn: "datetime",
      size: 175,
      Cell: ({ cell, row }: { cell: any; row: any }) => (
        <Text>{formatDate(cell.getValue())}</Text>
      ),
    },
    {
      accessorKey: "Trainer",
      header: "Trainer",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Employee_Name",
      header: "Employee",
      enableEditing: false,
      filterVariant: "multi-select",
      Cell: ({ cell }: { cell: any; }) => (
        <Text>{cell.getValue()}</Text>
      ),
    },
    // {
    //   accessorKey: "Department",
    //   header: "Department",
    //   enableEditing: false,
    //   filterVariant: "multi-select",
    //   Cell: ({ cell }: { cell: any; }) => (
    //     <Text>{cell.getValue()}</Text>
    //   ),
    // },
    {
      accessorKey: "Training_Title",
      header: "Training Title",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Needs_Repeat",
      header: "Needs Repeat",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Repeat_After",
      header: "Repeat After",
      enableEditing: true,
      filterVariant: "multi-select",
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
      accessorKey: "Note",
      header: "Note",
      enableEditing: true,
      filterVariant: "multi-select",
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
  ];

  return columns;
};