import { formatDate } from "../../utils";

export const getColumns = () => {
  const columns = [
    {
      accessorKey: "Job",
      header: "Job",
      enableEditing: false,
      // filterVariant: 'autocomplete',
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
