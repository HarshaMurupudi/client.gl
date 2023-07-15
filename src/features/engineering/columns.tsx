import { format, addMinutes } from 'date-fns';

import { GLSelect } from '../../components/select';

export const getColumns = (fetchPDF: any, pathName: any, value: any) => {
  const onFetchPDFClick = (partNumber: any) => {
    fetchPDF(partNumber);
  };
  function formatDate(date: any) {
    if (date) {
      return format(addMinutes(date, date.getTimezoneOffset()), 'MM/dd/yyyy');
    } else {
      return '-';
    }
  }

  const columns = [
    {
      accessorKey: 'Job',
      header: 'Job',
      enableEditing: false,
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
      accessorKey: 'Customer',
      header: 'Customer',
      enableEditing: false,
    },
    {
      accessorFn: (row: any) => {
        const sDay = new Date(row.Sched_Start);
        console.log(sDay);

        if (row.Sched_Start) return sDay;
      },
      id: 'schedDate',
      header: 'Sched Start',
      filterVariant: 'date-range',
      sortingFn: 'datetime',
      enableEditing: false,
      Cell: ({ cell }: { cell: any }) => formatDate(cell.getValue()),
    },
    {
      accessorKey: 'Make_Quantity',
      header: 'Make Quantity',
      enableEditing: false,
    },
    {
      accessorKey: 'Note_Text',
      header: 'Note Text',
      enableEditing: false,
    },
    {
      accessorKey: 'Sales_Code',
      header: 'Sales_Code',
      enableEditing: false,
    },
    {
      accessorKey: 'Work_Center',
      header: 'Work Center',
      enableEditing: false,
    },
    {
      accessorKey: 'Now At',
      header: 'Now At',
      enableEditing: false,
      Cell: ({ cell, row }: { cell: any; row: any }) => {
        if (pathName === '/a-art') {
          if (value === 'Open') {
            return <p>{row['Now At']}</p>;
          } else {
            return <p>{'A-ART'}</p>;
          }
        } else {
          return <p>{row['Now At']}</p>;
        }
      },
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
  ];

  return columns;
};

//  const columns = [
//    {
//      accessor: 'Job',
//      sortable: true,
//      filter: (
//        <TextInput
//          label='Job'
//          description='Show Job whose names include the specified text'
//          placeholder='Search Jobs...'
//          icon={<IconSearch size={16} />}
//          value={query}
//          onChange={(e) => setQuery(e.currentTarget.value)}
//        />
//      ),
//      filtering: query !== '',
//    },
//    {
//      accessor: 'Part_Number',
//      sortable: true,
//      render: ({ Part_Number }) => (
//        <p
//          style={{
//            textDecoration: 'underline',
//          }}
//        >
//          {Part_Number}
//        </p>
//      ),
//    },
//    {
//      accessor: 'Customer',
//      sortable: true,
//    },
//    {
//      accessor: 'Sched_Start',
//      sortable: true,
//      render: ({ Sched_Start: value }) => (
//        <p>{value ? format(new Date(value), 'MM/dd/yyyy') : '-'}</p>
//      ),
//    },
//    {
//      accessor: 'Make_Quantity',
//      sortable: true,
//    },
//    {
//      accessor: 'Note_Text',
//      sortable: true,
//    },
//    {
//      accessor: 'Sales_Code',
//      sortable: true,
//    },
//    {
//      accessor: 'Work_Center',
//      sortable: true,
//    },
//    {
//      accessor: 'Now At',
//      sortable: true,
//      render: (job) => {
//        if (pathName === '/a-art') {
//          if (value === 'Open') {
//            return <p>{job['Now At']}</p>;
//          } else {
//            return <p>{'A-ART'}</p>;
//          }
//        } else {
//          return <p>{job['Now At']}</p>;
//        }
//      },
//    },
//    {
//      accessor: 'Status',
//      sortable: true,
//    },
//    {
//      accessor: 'Description',
//      sortable: true,
//    },
//  ];
