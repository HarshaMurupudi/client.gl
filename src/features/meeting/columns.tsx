import { Box, Button, Text, Textarea } from "@mantine/core";

import { format, addMinutes } from "date-fns";
import { GLTextarea } from "../../components/ReactTableTextarea";

export const getColumns = (
  editedUsers: any,
  setEditedUsers: any,
  meeting: any,
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
      accessorKey: "Meeting_Note_ID",
      header: "ID",
      enableEditing: false,
      filterVariant: "autocomplete",
      size: 90,
    },
    {
      accessorKey: "Description",
      header: "Description",
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
      accessorFn: (row: any) => {
        const sDay = row.Date
          ? new Date(row.Date)
          : undefined;
        return sDay;
      },
      accessorKey: "Date",
      header: "Date",
      enableEditing: false,
      filterVariant: "date",
      sortingFn: "datetime",
      Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue()),
    },
    {
      accessorKey: "Meeting_Note",
      header: "Notes",
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
    
  ];

  return columns;
};
