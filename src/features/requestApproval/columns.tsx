import React, { useEffect, useState, useMemo } from "react";
import { format, addMinutes } from "date-fns";
import { Box, Button, Text, Textarea, Checkbox } from "@mantine/core";

import { GLTextarea } from "../../components/ReactTableTextarea";
import { GLSelect } from "../../components/select";
import { CheckboxFilter } from "../../components/TableComponents";

export const getColumns = (
  editedUsers: any,
  setEditedUsers: any,
) => {
  function formatDate(datetime: any) {
    const newDate = new Date(datetime).toLocaleDateString();
    return newDate;
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
      accessorKey: "Request_ID",
      header: "ID",
      size: 125,
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Request_Type",
      header: "Type",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Submission_Date",
      header: "Date",
      enableEditing: false,
      sortingFn: "datetime",
      filterVariant: "multi-select",
      Cell: ({ cell, row }: { cell: any; row: any }) => (
        <Text>{formatDate(cell.getValue())}</Text>
      ),
    },
    {
      accessorKey: "Initiator",
      header: "Initiator",
      filterVariant: "multi-select",
      enableEditing: false,
    },
    {
      accessorKey: "Subject",
      header: "Subject",
      filterVariant: "multi-select",
      enableEditing: false,
    },
    {
      accessorKey: "Part_Number",
      header: "Part Number",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Part_Number = row.Part_Number || "";
        return Part_Number;
      },
    },
    {
      accessorKey: "Job_Number",
      header: "Job Number",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Job_Number = row.Job_Number || "";
        return Job_Number;
      },
    },
    {
      accessorKey: "Work_Center",
      header: "Work Center",
      filterVariant: "multi-select",
      enableEditing: false,
    },
    {
      accessorKey: "Priority",
      header: "Priority",
      enableEditing: false,
      filterVariant: 'multi-select',
    },
    {
      accessorKey: "Request",
      header: "Request",
      enableEditing: false,
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
      accessorKey: "Approver",
      header: "Approver",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Status",
      header: "Status",
      enableEditing: false,
      filterVariant: "multi-select",
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
            data={["New", "Approve", "Pending", "Reject"]}
            cell={cell}
            table={table}
            onSelect={(e: any) => onSelect(e, cell, column)}
            textColor={"black"}
          />
        );
      }
    },
    {
      accessorKey: "Approval_Comment",
      header: "Comments",
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
  ];

  return columns;
};
