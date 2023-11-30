import { formatDate } from "../../utils";

export const getColumns = () => {
  const columns = [
    {
      accessorKey: "Part_Number",
      header: "Part Number",
      enableEditing: false,
      // filterVariant: 'autocomplete',
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
      accessorKey: "Order_Date",
      accessorFn: (row: any) => {
        const sDay = new Date(row.Order_Date);
        return sDay;
      },
      header: "Order Date",
      enableEditing: false,
      Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue()),
    },
  ];

  return columns;
};
