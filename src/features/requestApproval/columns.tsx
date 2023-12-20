import React, { useEffect, useState, useMemo } from "react";
import { format, addMinutes } from "date-fns";
import { Box, Button, Text, Textarea, Checkbox } from "@mantine/core";

import { GLTextarea } from "../../components/ReactTableTextarea";
import { GLSelect } from "../../components/select";

export const getColumns = (
  editedUsers: any,
  setEditedUsers: any,
  user: any,
) => {

  const states = [
    {
      label: "Open",
      value: "New",
      description: ""
    },
    {
      label: "Approved",
      value: "Completed",
      description: ""
    },
    {
      label: "Pending",
      value: "Pending",
      description: ""
    },
    {
      label: "Reject",
      value: "Reject",
      description: ""
    }
  ];

  function isValidDate(d) {
    // @ts-ignore
    return d instanceof Date && !isNaN(d);
  }
  function formatDate(date: any) {
    const newDate = new Date(date);
    if (newDate) {
      if (isValidDate(newDate)) {
        return format(addMinutes(newDate, newDate.getTimezoneOffset()), "MM/dd/yyyy");
      } else {
        return "-";
      }
    } else {
      return "-";
    }
  }

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const onSelect = (e: any, cell: any, column: any) => {
    const { row } = cell;
  
    let updatedRowData;
  
    if (e === "Completed") {
      updatedRowData = {
        ...row.original,
        Status: e,
        Approver: user,
      };
    } else {
      updatedRowData = {
        ...row.original,
        Status: e,
      };
    }
  
    if (editedUsers[row.id]) {
      setEditedUsers({
        ...editedUsers,
        [row.id]: updatedRowData,
      });
    } else {
      setEditedUsers({
        ...editedUsers,
        [row.id]: updatedRowData,
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
      id: "Request_ID",
      accessorKey: "Request_ID",
      header: "ID",
      size: 125,
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Request_Type",
      header: "Type",
      size: 135,
      enableEditing: false,
      filterVariant: "multi-select",
      Cell: ({ cell, row }: { cell: any; row: any }) => (
        <Text>{capitalize(cell.getValue())}</Text>
      ),
    },
    {
      id: "Submission_Date",
      accessorKey: "Submission_Date",
      header: "Date",
      size: 135,
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
      Cell: ({
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
            onTextChange={null}
          />
        );
      },
    },
    {
      accessorKey: "Part_Number",
      header: "Part Number",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Part_Number = row.Part_Number || "-";
        return Part_Number;
      },
    },
    {
      accessorKey: "Job_Number",
      header: "Job Number",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Job_Number = row.Job_Number || "-";
        return Job_Number;
      },
    },
    {
      accessorKey: "Work_Center",
      header: "Work Center",
      filterVariant: "multi-select",
      enableEditing: false,
      accessorFn: (row: any) => {
        const Work_Center = row.Work_Center || "-";
        return Work_Center;
      },
    },
    {
      accessorKey: "Priority",
      header: "Priority",
      size: 150,
      enableEditing: false,
      filterVariant: 'multi-select',
    },
    {
      accessorKey: "Request",
      header: "Request",
      size: 300,
      enableEditing: false,
      filterVariant: "multi-select",
      Cell: ({
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
      accessorFn: (row: any) => {
        const Approver = row.Approver || "";
        return Approver;
      },
    },
    {
      id: "Status",
      accessorKey: "Status",
      accessorFn: (row: any) => {
        if (row.Status) {
          return String(row.Status);
        }
      },
      header: "Status",
      size: 145,
      // filterVariant: "multi-select",
      mantineFilterSelectProps: {
        data: states as any,
      },
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
            data={states}
            cell={cell}
            table={table}
            onSelect={(e: any) => onSelect(e, cell, column)}
            textColor={"transparent"}
          />
        );
      },
    },
    {
      accessorKey: "Approval_Date",
      header: "Approval Date",
      enableEditing: false,
      sortingFn: "datetime",
      filterVariant: "multi-select",
      Cell: ({ cell, row }: { cell: any; row: any }) => (
        <Text>{formatDate(cell.getValue())}</Text>
      ),
      accessorFn: (row: any) => {
        const Approval_Date = row.Approval_Date || "-";
        return Approval_Date;
      },
    },
    {
      accessorKey: "Approval_Comment",
      header: "Comments",
      enableEditing: true,
      size: 300,
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
