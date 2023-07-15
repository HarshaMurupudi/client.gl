import { format, addMinutes } from "date-fns";

import { GLSelect } from "../../components/select";

export const getColumns = (fetchPDF: any, editedUsers: any, setEditedUsers: any) => {
  console.log(editedUsers)
  const onQtyClick = (job: any) => {
    window.open(
      `/delivery-queue-details/${job}`,
      '_blank',
      'rel=noopener noreferrer'
    );
  };
  const onFetchPDFClick = (partNumber: any) => {
    fetchPDF(partNumber);
  };

  function formatDate(date: any) {
    return format(addMinutes(date, date.getTimezoneOffset()), 'MM/dd/yyyy');
  }

  const onSelect = (e: any, cell: any, column: any,) => {
    const{row} = cell;

    if(editedUsers[row.id]){
      setEditedUsers({
        ...editedUsers,
        [row.id]: { ...editedUsers[row.id], ...{Job_Plan: e} },
      })
    } else {
      setEditedUsers({
        ...editedUsers,
        [row.id]: { ...row.original, ...{Job_Plan: e} },
      })
    }      
  }

  const columns = [
    {
      accessorKey: 'Job',
      header: 'Job',
      enableEditing: false
    },
    {
      accessorKey: 'Part_Number',
      header: 'Part Number',
      enableEditing: false
    },
    {
      accessorKey: 'Customer',
      header: 'Customer',
      enableEditing: false
    },
    {
      accessorKey: 'Sched_Start',
      header: 'Sched Start',
      enableEditing: false
    },
    {
      accessorKey: 'Make_Quantity',
      header: 'Make Quantity',
      enableEditing: false
    },
    {
      accessorKey: 'Note_Text',
      header: 'Note Text',
      enableEditing: false
    },
    {
      accessorKey: 'Sales_Code',
      header: 'Sales_Code',
      enableEditing: false
    },
    {
      accessorKey: 'Work_Center',
      header: 'Work Center',
      enableEditing: false
    },
    {
      accessorKey: 'Now At',
      header: 'Now At',
      enableEditing: false,
      Cell: ({ cell, row }: { cell: any; row: any }) => {
        
        return (
        <p
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
            margin: 0,
          }}
        >
          {cell.getValue()}
        </p>
      )
        }
    },
    {
      accessorKey: 'Status',
      header: 'Status',
      enableEditing: false
    },
    {
      accessorKey: 'Description',
      header: 'Description',
      enableEditing: false
    },

  ];

  return columns;
};