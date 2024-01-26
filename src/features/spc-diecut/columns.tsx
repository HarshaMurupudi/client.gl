import { Text } from "@mantine/core";

import { GLTextarea } from "../../components/ReactTableTextarea";

import { useMemo } from "react";
import { MRT_ColumnDef } from "../../components/mantine-custom/types";

export type SPC = {
  Die_Number: string;
  Impressions: string;
  Date: string;
  Art_Number: string;
  Part_Number: string;
  Material: string;
  Lamination: string;
  Adhesive: string;
  Cut_Type: string;
  Press: string;
  Platen_Set: string;
  Signature: string;
  Die_Note: string;
  subRows?: SPC[];
};

export const getColumns = (
  editedUsers: any,
  setEditedUsers: any,
) => {

  const formatTime = (date) => {
    if (date){
      var hours = date.getUTCHours();
      var minutes = date.getUTCMinutes();
      var period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      var strTime = hours + ':' + minutes + ' ' + period;
      return strTime;
    } 
    return "-";
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

  const cutColumns = [
    {
      accessorKey: "Die_Number",
      idAccessor: "Die_Number",
      header: "Die Number",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Impressions",
      header: "Impressions",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Date",
      header: "Date",
      enableEditing: false,
      filterVariant: "multi-select",
      // Cell: ({ cell }: { cell: any }) => formatTime(cell.getValue())
    },
    {
      accessorKey: "Art_Number",
      header: "Art Number",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Part_Number",
      header: "Part Number",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Material",
      header: "Material",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Lamination",
      header: "Lamination",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Adhesive",
      header: "Adhesive",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Cut_Type",
      header: "Cut Type",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Press",
      header: "Press",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Makeready",
      header: "Press",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Platen",
      header: "Platen",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Signature",
      header: "Signature",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Note",
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

  const embossColumns = [
    {
      accessorKey: "Die_Number",
      idAccessor: "Die_ID",
      header: "Die Number",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Impressions",
      header: "Impressions",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Date",
      header: "Date",
      enableEditing: false,
      filterVariant: "multi-select",
      // Cell: ({ cell }: { cell: any }) => formatTime(cell.getValue())
    },
    {
      accessorKey: "Art_Number",
      header: "Art Number",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Part_Number",
      header: "Part Number",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Material",
      header: "Material",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Ink_Layers",
      header: "Ink Layers",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Platen",
      header: "Platen",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Heat",
      header: "Heat",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Dwell",
      header: "Dwell",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Emboss_Height",
      header: "Emb. Height",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Signature",
      header: "Signature",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Die_Note",
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

  const columns = [{"Cut": cutColumns}, {"Emboss": embossColumns}];
  return columns;
};
