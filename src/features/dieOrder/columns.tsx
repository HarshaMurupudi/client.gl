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
      label: "Active",
      value: "Active",
      description: ""
    },
    {
      label: "Obsolete",
      value: "Obsolete",
      description: ""
    }
  ];
  
  const inspection_states = [
    {
      label: "Approved",
      value: "Approved",
      description: ""
    },
    {
      label: "Rejected",
      value: "Rejected",
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
  
    if (e === "Approved" || e === "Rejected") {
      updatedRowData = {
        ...row.original,
        Inspection_Status: e,
        Approver: user,
      };
    } else {
      updatedRowData = {
        ...row.original,
        Inspection_Status: e,
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

  const columns = [
    {
      id: "Tool_ID",
      accessorKey: "Tool_ID",
      header: "Tool ID",
      size: 150,
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Tool_Type",
      header: "Tool Type",
      enableEditing: false,
      filterVariant: "multi-select",
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
      id: "Inspection_Status",
      accessorKey: "Inspection_Status",
      accessorFn: (row: any) => {
        if (row.Inspection_Status) {
          return String(row.Inspection_Status);
        }
      },
      header: "Inspection Status",
      size: 145,
      // filterVariant: "multi-select",
      mantineFilterSelectProps: {
        data: inspection_states as any,
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
            data={inspection_states}
            cell={cell}
            table={table}
            onSelect={(e: any) => onSelect(e, cell, column)}
            textColor={"transparent"}
          />
        );
      },
    },
    {
      accessorKey: "PO_Number",
      header: "PO Number",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const PO_Number = row.PO_Number || "-";
        return PO_Number;
      },
    },
    {
      accessorKey: "Tool_Shape",
      header: "Tool Shape",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Tool_Shape = row.Tool_Shape || "-";
        return Tool_Shape;
      },
    },
    {
      accessorKey: "Tool_Description",
      header: "Description",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Tool_Description = row.Tool_Description || "-";
        return Tool_Description;
      },
    },
    {
      accessorKey: "Cavity_Width",
      header: "Cavity Width",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Cavity_Width = row.Cavity_Width || "-";
        return Cavity_Width;
      },
    },
    {
      accessorKey: "Cavity_Height",
      header: "Cavity Height",
      enableEditing: false,
      size: 200,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Cavity_Height = row.Cavity_Height || "-";
        return Cavity_Height;
      },
    },
    {
      accessorKey: "Cavities_Across",
      header: "Cavities Across",
      enableEditing: false,
      size: 200,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Cavities_Across = row.Cavities_Across || "-";
        return Cavities_Across;
      },
    },
    {
      accessorKey: "Cavities_Down",
      header: "Cavities Down",
      enableEditing: false,
      size: 200,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Cavities_Down = row.Cavities_Down || "-";
        return Cavities_Down;
      },
    },
    {
      accessorKey: "Cavities_Total",
      header: "Cavities Total",
      enableEditing: false,
      size: 200,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Cavities_Total = row.Cavities_Total || "-";
        return Cavities_Total;
      },
    },
    {
      accessorKey: "Space_Across",
      header: "Space Across",
      enableEditing: false,
      size: 200,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Space_Across = row.Space_Across || "-";
        return Space_Across;
      },
    },
    {
      accessorKey: "Space_Down",
      header: "Space Down",
      enableEditing: false,
      size: 200,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Space_Down = row.Space_Down || "-";
        return Space_Down;
      },
    },
    {
      accessorKey: "Radius",
      header: "Radius",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Radius = row.Radius || "-";
        return Radius;
      },
    },

    {
      accessorKey: "Vendor",
      header: "Vendor",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Vendor = row.Vendor || "-";
        return Vendor;
      },
    },
    {
      accessorKey: "Comment",
      header: "Comment",
      size: 250,
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
      header: "Approval Comments",
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
