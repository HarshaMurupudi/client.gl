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

  const planCodes = [
    {
      label: '01',
      value: '01',
      description: 'Ready (Packlist Created)',
    },
    {
      label: '02',
      value: '02',
      description: 'Ready (Product Confirmed)',
    },
    {
      label: '03',
      value: '03',
      description: 'Ready (Ship from Job)',
    },
    {
      label: '04',
      value: '04',
      description: 'Ready (Ship from Stock)',
    },
    {
      label: '05',
      value: '05',
      description: 'Default Priority',
    },
    {
      label: '30',
      value: '30',
      description: 'Remake Required',
    },
    {
      label: '40',
      value: '40',
      description: 'Customer Called',
    },
    {
      label: '50',
      value: '50',
      description: 'Coming from another Job',
    },
    {
      label: '51',
      value: '51',
      description: 'Stock from another Job',
    },
    {
      label: '53',
      value: '53',
      description: 'Replenish from Ship',
    },
    {
      label: '54',
      value: '54',
      description: 'Replenish from Stock',
    },
    {
      label: '70',
      value: '70',
      description: 'Requires Purchasing Attention',
    },
    {
      label: '77',
      value: '77',
      description: 'Requires Engineering Attention',
    },
    {
      label: '96',
      value: '96',
      description: 'Requires Sales Attention',
    },
  ];

  const columns = [
    {
      accessorKey: 'Job_Plan',
      header: 'Job Plan',
      Edit: ({ cell, column, table }: {cell: any, column: any, table: any}) => {
        return (
          <GLSelect data={planCodes} 
            cell={cell}
            table={table}
            onSelect={ (e: any) => onSelect(e, cell, column)}
          />
        )
      } 
    },
    {
      accessorKey: 'Job',
      header: 'Job',
      enableEditing: false
    },
    {
      accessorKey: 'Part_Number',
      header: 'Part Number',
      enableEditing: false,
      mantineTableBodyCellProps: ({ cell }: { cell: any }) => ({
        onClick: () => {
          onFetchPDFClick(cell.getValue());
        },
      }),
      Cell: ({ cell, row }: { cell: any; row: any }) => (
        <p
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
            margin: 0,
          }}
        >
          {cell.getValue()}
        </p>
      ),
    },
    {
      id: 'shipBayDateDate',
      enableEditing: false,
      accessorFn: (row: any) => {
        const sDay = new Date(row.Ship_By_Date);
        return sDay;
      },
      header: 'Ship By Date',
      filterVariant: 'date-range',
      sortingFn: 'datetime',
      enableColumnFilterModes: false,
      Cell: ({ cell }: { cell: any }) => {
        const dayOfWeekTZOffset = addMinutes(cell.getValue(), cell.getValue().getTimezoneOffset());
        const dayOfWeek =  dayOfWeekTZOffset.getDay();
        // 6 = Saturday, 0 = Sunday
        const isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0);
        const currentDate =dayOfWeekTZOffset;
        if(isWeekend){
          if(dayOfWeek === 6){
            const nDate = new Date(currentDate);
            nDate.setDate(nDate.getDate() - 1)
            return <strong>{nDate.toLocaleDateString()}</strong>
          } else if(dayOfWeek  === 0){
            const nDate = new Date(currentDate);
            nDate.setDate(nDate.getDate() - 2)
            return <strong>{nDate.toLocaleDateString()}</strong>
          }
        } else {
          return formatDate(cell.getValue())
        }
      }
    },
    {
      accessorKey: 'Production_Notes',
      header: 'Production Notes',
      mantineEditTextInputProps: ({ cell, row }: {cell: any, row: any}) => ({
        type: 'test',
        onBlur: (event: any) => {
            if(editedUsers[row.id]){
              setEditedUsers({
                ...editedUsers,
                [row.id]: { ...editedUsers[row.id], ...{Production_Notes: event.currentTarget.value} },
              })
            } else {
              setEditedUsers({
                ...editedUsers,
                [row.id]: { ...row.original, ...{Production_Notes: event.currentTarget.value} },
              })
            }      
        }
      })
    },
    {
      accessorKey: 'Engineering_Notes',
      header: 'Engineering Notes',
      mantineEditTextInputProps: ({ cell, row }: {cell: any, row: any}) => ({
        type: 'email',
        onBlur: (event: any) =>         
        {
          if(editedUsers[row.id]){
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...editedUsers[row.id], ...{Engineering_Notes: event.currentTarget.value} },
            })
          } else {
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...row.original, ...{Engineering_Notes: event.currentTarget.value} },
            })
          }      
      }
      })
    },
    {
      accessorKey: 'Sales_Notes',
      header: 'Sales Notes',
      mantineEditTextInputProps: ({ cell, row }: {cell: any, row: any}) => ({
        type: 'email',
        onBlur: (event: any) => {
          if(editedUsers[row.id]){
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...editedUsers[row.id], ...{Sales_Notes: event.currentTarget.value} },
            })
          } else {
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...row.original, ...{Sales_Notes: event.currentTarget.value} },
            })
          }      
      }
      })
    },
    {
      accessorKey: 'On_Hand_Qty',
      // accessorKey: 'Distinct_On_Hand_Qty',
      header: 'On Hand Qty',
      enableEditing: false,
      mantineTableBodyCellProps: ({ cell, row }: { cell: any, row: any }) => ({
        onClick: () => {
          onQtyClick(row.original?.Job);
        },
      }),
      Cell: ({ cell, row }: { cell: any; row: any }) => (
        <p
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
            margin: 0,
          }}
        >
          {cell.getValue()}
        </p>
      ),
    },
    {
      accessorKey: 'Now At',
      header: 'Now At',
      enableEditing: false,
    },
    {
      accessorKey: 'Customer',
      header: 'Customer',
      enableEditing: false,
    },
    {
      accessorKey: 'Status',
      header: 'Status',
      enableEditing: false,
    },
    {
      accessorKey: 'Description',
      header: 'Description',
      enableEditing: false,
    },
    {
      accessorKey: 'Order_Quantity',
      header: 'Order Quantity',
      enableEditing: false,
    },
    {
      accessorKey: 'Completed_Quantity',
      header: 'Completed Quantity',
      enableEditing: false,
    },
    {
      accessorKey: 'Lead_Days',
      header: 'Lead Days',
      enableEditing: false,
    },
    {
      accessorFn: (row: any) => {
        const sDay = new Date(row.Promised_Date);
        return sDay;
      },
      enableEditing: false,
      id: 'promisedDate',
      header: 'Promised Date',
      filterVariant: 'date-range',
      sortingFn: 'datetime',
      enableColumnFilterModes: false,
      Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue())
    },
    {
      id: 'requestedDate',
      enableEditing: false,
      accessorFn: (row: any) => {
        const sDay = new Date(row.Requested_Date);
        return sDay;
      },
      header: 'Requested Date',
      filterVariant: 'date-range',
      sortingFn: 'datetime',
      enableColumnFilterModes: false,
      Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue()),
    },
  ];

  return columns;
};
