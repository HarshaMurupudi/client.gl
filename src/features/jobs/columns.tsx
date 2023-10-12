import { format, addMinutes } from "date-fns";
import { Box, Button, Text, Textarea } from "@mantine/core";

import { GLSelect } from "../../components/select";
import { GLTextarea } from "../../components/ReactTableTextarea";
import { CheckboxFilter } from "../../components/TableComponents";
import {
  getDateColor,
  subBusDays,
  formatDateWithoutTZ,
  formatDate,
  getShipByDateColumn,
} from "../../utils";

export const getColumns = (
  fetchPDF: any,
  editedUsers: any,
  setEditedUsers: any,
  getTableData: any
) => {
  const onQtyClick = (job: any) => {
    window.open(
      `/delivery-queue-details/${job}`,
      "_blank",
      "rel=noopener noreferrer"
    );
  };
  const onFetchPDFClick = (partNumber: any) => {
    fetchPDF(partNumber);
  };

  // function isValidDate(d) {
  //   // @ts-ignore
  //   return d instanceof Date && !isNaN(d);
  // }

  // function formatDate(date: any) {
  //   return date
  //     ? isValidDate(date)
  //       ? format(addMinutes(date, date.getTimezoneOffset()), "MM/dd/yyyy")
  //       : "-"
  //     : "-";
  // }

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

  const planCodes = [
    {
      label: "1",
      value: "1",
      description: "Ready (Packlist Created)",
    },
    {
      label: "2",
      value: "2",
      description: "Ready (Product Confirmed)",
    },
    {
      label: "3",
      value: "3",
      description: "Ready (Ship from Job)",
    },
    {
      label: "4",
      value: "4",
      description: "Ready (Ship from Stock)",
    },
    {
      label: "5",
      value: "5",
      description: "Default Priority",
    },
    {
      label: "30",
      value: "30",
      description: "Remake Required",
    },
    {
      label: "40",
      value: "40",
      description: "Customer Called",
    },
    {
      label: "50",
      value: "50",
      description: "Coming from another Job",
    },
    {
      label: "51",
      value: "51",
      description: "Stock from another Job",
    },
    {
      label: "53",
      value: "53",
      description: "Replenish from Ship",
    },
    {
      label: "54",
      value: "54",
      description: "Replenish from Stock",
    },
    {
      label: "70",
      value: "70",
      description: "Requires Purchasing Attention",
    },
    {
      label: "77",
      value: "77",
      description: "Requires Engineering Attention",
    },
    {
      label: "96",
      value: "96",
      description: "Requires Sales Attention",
    },
  ];

  const columns = [
    {
      id: "Job_Plan",
      accessorFn: (row: any) => {
        if (row.Text5 === "S") {
          return "4";
        } else {
          if (row.Job_Plan) {
            return String(row.Job_Plan);
          } else {
            return "5";
          }
        }
      },
      accessorKey: "Job_Plan",
      header: "Job Plan",
      filterVariant: "multi-select",
      // editVariant: "multi-select",
      mantineFilterSelectProps: {
        data: planCodes as any,
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
        const jobPlan = cell.getValue("Job_Plan");
        const textColor = jobPlan === "4" ? "orange" : null;

        return (
          <GLSelect
            data={planCodes}
            cell={cell}
            table={table}
            onSelect={(e: any) => onSelect(e, cell, column)}
            textColor={textColor}
          />
        );
      },
    },
    {
      accessorFn: (row: any) => {
        return row.Text5 ? row.Text5 : "-";
      },
      accessorKey: "Text5",
      header: "Job Type",
      enableEditing: false,
      filterVariant: "multi-select",
      Filter: ({ column, table }) => (
        <CheckboxFilter
          column={column}
          options={[
            ...new Set(
              getTableData.map((item) => item.Text5).filter((item) => item)
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
      Cell: ({ cell, row }: { cell: any; row: any }) => {
        console.log()
        const textColor = cell.getValue("Text5") === "AO" ? "lightblue" : null;

        if (textColor) {
          return <Text bg={textColor}>{cell.getValue()}</Text>;
        } else {
          return <Text>{cell.getValue()}</Text>;
        }
      },
    },
    {
      accessorKey: "Job",
      header: "Job",
      enableEditing: false,
      filterVariant: "autocomplete",
      accessorFn: (row: any) => {
        const Job = row.Job || "";
        return Job;
      },
      Cell: ({ cell, row }) => {
        const prodNote = cell.row.getValue("Production_Notes");
        let color: string | null = null;

        if (prodNote === "0") {
          color = "red";
        } else if (prodNote === "1") {
          color = "green";
        }

        if (color) {
          return <Text bg={color}>{cell.getValue()}</Text>;
        } else {
          return <Text>{cell.getValue()}</Text>;
        }
      },
    },
    {
      accessorKey: "Customer",
      header: "Customer",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    // {
    //   accessorKey: "DeliveryKey",
    //   header: "DeliveryKey",
    //   enableEditing: false,
    // },
    {
      id: "Part_Number",
      accessorKey: "Part_Number",
      header: "Part Number",
      enableEditing: false,
      filterVariant: "autocomplete",
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
    getShipByDateColumn(),
    {
      accessorKey: "Now At",
      header: "Now At",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Job = row["Now At"] || "";
        return Job;
      },
      // filterVariant: 'autocomplete',
    },
    {
      accessorKey: "Promised_Quantity",
      header: "Promised Quantity",
      enableEditing: false,
    },
    {
      accessorKey: "Order_Quantity",
      header: "Order Quantity",
      enableEditing: false,
    },
    {
      accessorKey: "Shipped_Quantity",
      header: "Shipped Quantity",
      enableEditing: false,
    },
    {
      accessorKey: "Ship_Via",
      header: "Ship Via",
      enableEditing: false,
    },
    {
      accessorKey: "Revenue",
      header: "Revenue",
      enableEditing: false,
      accessorFn: (row: any) => {
        const revenue = row["Order_Quantity"] * row["Unit_Price"];
        return revenue;
      },
      Cell: ({ cell, row }: { cell: any; row: any }) => (
        <p
          style={{
            margin: 0,
          }}
        >
          ${cell.getValue()}
        </p>
      ),
    },
    // {
    //   accessorKey: "On_Hand_Qty",
    //   header: "On Hand Qty",
    //   filterVariant: "autocomplete",
    //   enableEditing: false,
    //   mantineTableBodyCellProps: ({ cell, row }: { cell: any; row: any }) => ({
    //     onClick: () => {
    //       onQtyClick(row.original?.Job);
    //     },
    //   }),
    //   Cell: ({ cell, row }: { cell: any; row: any }) => (
    //     <Button variant="light" size="xs" compact>
    //       Qty
    //     </Button>
    //   ),
    // },
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
      accessorKey: "Production_Notes",
      header: "Production",
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
      accessorKey: "Engineering_Notes",
      header: "Engineering",
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
      accessorKey: "Sales_Notes",
      header: "Sales",
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
      accessorKey: "Status",
      header: "Status",
      enableEditing: false,
      filterVariant: "multi-select",
      accessorFn: (row: any) => {
        const Status = row["Status"] || "";
        return Status;
      },
    },
    {
      accessorKey: "Description",
      header: "Description",
      enableEditing: false,
    },
    {
      accessorKey: "Completed_Quantity",
      header: "Completed Quantity",
      enableEditing: false,
    },
    {
      accessorKey: "Lead_Days",
      header: "Lead Days",
      enableEditing: false,
    },
    {
      accessorFn: (row: any) => {
        const sDay = new Date(row.Promised_Date);
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
    {
      id: "requestedDate",
      enableEditing: false,
      accessorFn: (row: any) => {
        const sDay = new Date(row.Requested_Date);
        return sDay;
      },
      header: "Requested Date",
      filterVariant: "date",
      sortingFn: "datetime",
      enableColumnFilterModes: false,
      Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue()),
    },
  ];

  return columns;
};
