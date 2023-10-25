import React, { useEffect, useState, useMemo } from "react";
import { format, addMinutes } from "date-fns";
import { Box, Button, Text, Textarea, Checkbox } from "@mantine/core";

import { GLTextarea } from "../../components/ReactTableTextarea";
import {
  getDateColor,
  subBusDays,
  formatDateWithoutTZ,
  getShipByDateColumn,
} from "../../utils";
import { CheckboxFilter } from "../../components/TableComponents";

export const getColumns = (
  fetchPDF: any,
  pathName: any,
  value: any,
  vendor: any,
  editedUsers: any,
  setEditedUsers: any,
  totalEstHours: any,
  getTableData: any
) => {
  const onFetchPDFClick = (partNumber: any) => {
    fetchPDF(partNumber);
  };

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
    // {
    //   header: "Job",
    //   columns: [
    {
      accessorKey: "Job",
      header: "Job",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Job = row.Job || "";
        return Job;
      },
    },
    {
      accessorKey: "Part_Number",
      header: "Part Number",
      filterVariant: "multi-select",
      enableEditing: false,
      accessorFn: (row: any) => {
        const Part_Number = row.Part_Number || "";
        return Part_Number;
      },
      mantineTableBodyCellProps: ({ cell }: { cell: any }) => ({
        onClick: () => {
          onFetchPDFClick(cell.getValue());
        },
      }),
      Cell: ({ cell, row }: { cell: any; row: any }) => (
        <p
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            margin: 0,
          }}
        >
          {cell.getValue()}
        </p>
      ),
    },
    {
      accessorKey: "Customer",
      header: "Customer",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Sequence",
      header: "Sequence",
      enableEditing: false,
      // filterVariant: 'multi-select',
    },
    {
      accessorKey: "Rev",
      header: "Rev",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Rev = row.Rev || "";
        return Rev;
      },
    },
    {
      accessorFn: (row: any) => {
        const sDay = new Date(row.Sched_Start);

        if (row.Sched_Start) return sDay;
      },
      id: "schedDate",
      header: "Sched Start",
      filterVariant: "date",
      sortingFn: "datetime",
      enableEditing: false,
      Cell: ({ cell }: { cell: any }) => {
        const dayOfWeekTZOffset = addMinutes(
          cell.getValue(),
          cell.getValue()?.getTimezoneOffset()
        );
        const currentDate = dayOfWeekTZOffset;
        const nDate = new Date(currentDate);

        return (
          <Text c={getDateColor(nDate)}>{formatDate(cell.getValue())}</Text>
        );
      },
    },
    {
      accessorFn: (row: any) => {
        const sDay = row.Promised_Date
          ? new Date(row.Promised_Date)
          : undefined;
        return sDay;
      },
      enableEditing: false,
      id: "promisedDate",
      header: "Promised Date",
      filterVariant: "date",
      sortingFn: "datetime",
      enableColumnFilterModes: false,
      Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue()),
    },
    getShipByDateColumn(),
    {
      accessorKey: "Make_Quantity",
      header: "Make Quantity",
      enableEditing: false,
    },
    {
      accessorKey: "Sales_Code",
      accessorFn: (row: any) => {
        return row.Sales_Code ? row.Sales_Code : "-";
      },
      header: "Sales Code",
      enableEditing: false,
      filterVariant: "multi-select",
      // mantineFilterMultiSelectProps
      Filter: ({ column, table }) => (
        <CheckboxFilter
          column={column}
          options={[
            ...new Set(
              getTableData.map((item) => item.Sales_Code).filter((item) => item)
            ),
          ]}
        />
      ),
      filterFn: (row, id, filterValue) => {
        if (filterValue.length > 0) {
          if (row.getValue(id)) {
            return filterValue.includes(row.getValue(id));
          } else {
            return false;
          }
        } else {
          return true;
        }
      },
    },
    {
      accessorKey: "WC_Vendor",
      header: "WC Vendor",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const WC_Vendor = row["WC_Vendor"] || "";
        return WC_Vendor;
      },
    },
    {
      accessorKey: "Now At",
      header: "Now At",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Job = row["Now At"] || "";
        return Job;
      },
      Cell: ({ cell, row }: { cell: any; row: any }) => {
        let nowAt = "-";
        if (value === "Open") {
          nowAt = row.original["Now At"];
        } else {
          nowAt = vendor;
        }

        return <p style={{ margin: 0 }}>{nowAt}</p>;
      },
    },
    {
      accessorKey: "Status",
      header: "Status",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Customer_PO",
      header: "Customer PO",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Customer_PO = row["Customer_PO"] || "";
        return Customer_PO;
      },
    },
    {
      accessorKey: "Description",
      header: "Description",
      enableEditing: false,
    },
    {
      accessorKey: "Est_Total_Hrs",
      header: "Est Total Hrs",
      enableEditing: false,
      Footer: () => <div>Total Hrs: {totalEstHours.toFixed(2)}</div>,
    },
    //   ],
    // },
    // {
    //   header: "Notes",
    //   columns: [
    {
      id: "Priority",
      accessorKey: "Priority",
      accessorFn: (row: any) => {
        if (row.Priority) {
          return row.Priority;
        } else {
          return "5";
        }
      },
      header: "Priority",
      enableEditing: true,
      Cell: ({ cell, row }: { cell: any; row: any }) => (
        <Text>{cell.getValue()}</Text>
      ),
      mantineEditTextInputProps: ({ cell, row }: { cell: any; row: any }) => ({
        type: "test",
        onBlur: (event: any) => {
          if (editedUsers[row.id]) {
            setEditedUsers({
              ...editedUsers,
              [row.id]: {
                ...editedUsers[row.id],
                ...{ Priority: event.currentTarget.value },
              },
            });
          } else {
            setEditedUsers({
              ...editedUsers,
              [row.id]: {
                ...row.original,
                ...{ Priority: event.currentTarget.value },
              },
            });
          }
        },
      }),
    },
    {
      accessorKey: "Plan_Notes",
      header: "Plan Notes",
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
    //   ],
    // },
  ];

  return columns;
};
