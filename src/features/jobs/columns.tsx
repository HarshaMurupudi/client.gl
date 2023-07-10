export const getColumns = (fetchPDF: any) => {
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

  const columns = [
    {
      accessorKey: 'Job',
      header: 'Job',
    },
    {
      accessorKey: 'Notes',
      header: 'Notes',
    },
    {
      accessorKey: 'Part_Number',
      header: 'Part Number',
      // mantineTableBodyCellProps: ({ cell }: { cell: any }) => ({
      //   onClick: () => {
      //     onFetchPDFClick(cell.getValue());
      //   },
      // }),
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
      accessorKey: 'Distinct_On_Hand_Qty',
      header: 'On Hand Qty',
      mantineTableBodyCellProps: ({ cell }: { cell: any }) => ({
        onClick: () => {
          onQtyClick(cell.getValue());
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
    },
    {
      accessorKey: 'Customer',
      header: 'Customer',
    },
    {
      accessorKey: 'Status',
      header: 'Status',
    },
    {
      accessorKey: 'Description',
      header: 'Description',
    },
    {
      accessorKey: 'Order_Quantity',
      header: 'Order Quantity',
    },
    {
      accessorKey: 'Completed_Quantity',
      header: 'Completed Quantity',
    },
    {
      accessorFn: (row: any) => {
        const sDay = new Date(row.Promised_Date);
        sDay.setHours(0, 0, 0, 0); // remove time from date (useful if filter by equals exact date)
        return sDay;
      },
      id: 'promisedDate',
      header: 'Promised Date',
      filterVariant: 'date-range',
      sortingFn: 'datetime',
      enableColumnFilterModes: false,
      Cell: ({ cell }: { cell: any }) => cell.getValue()?.toLocaleDateString(),
    },
    {
      id: 'requestedDate',
      accessorFn: (row: any) => {
        const sDay = new Date(row.Requested_Date);
        sDay.setHours(0, 0, 0, 0); // remove time from date (useful if filter by equals exact date)
        return sDay;
      },
      header: 'Requested Date',
      filterVariant: 'date-range',
      sortingFn: 'datetime',
      enableColumnFilterModes: false,
      Cell: ({ cell }: { cell: any }) => cell.getValue()?.toLocaleDateString(),
    },
    {
      id: 'shipBayDateDate',
      accessorFn: (row: any) => {
        const sDay = new Date(row.Ship_By_Date);
        sDay.setHours(0, 0, 0, 0); // remove time from date (useful if filter by equals exact date)
        return sDay;
      },
      header: 'Ship By Date',
      filterVariant: 'date-range',
      sortingFn: 'datetime',
      enableColumnFilterModes: false,
      Cell: ({ cell }: { cell: any }) => cell.getValue()?.toLocaleDateString(),
    },
  ];

  return columns;
};

// const columns = [
//   {
//     accessor: 'Job',
//     filter: (
//       <TextInput
//         label='Job'
//         description='Show Job whose names include the specified text'
//         placeholder='Search Jobs...'
//         icon={<IconSearch size={16} />}
//         value={query}
//         onChange={(e) => setQuery(e.currentTarget.value)}
//       />
//     ),
//     filtering: query !== '',
//     sortable: true,
//   },
//   {
//     accessor: 'Notes',
//     sortable: true,
//   },
//   {
//     accessor: 'Part_Number',
//     filter: (
//       <TextInput
//         label='Part Number'
//         description='Show part numbers whose names include the specified text'
//         placeholder='Search part numbers...'
//         icon={<IconSearch size={16} />}
//         value={partNumber}
//         onChange={(e) => setPartNumber(e.currentTarget.value)}
//       />
//     ),
//     filtering: partNumber !== '',
//     sortable: true,
//     render: ({ Part_Number }) => (
//       <p
//         style={{
//           textDecoration: 'underline',
//         }}
//       >
//         {Part_Number}
//       </p>
//     ),
//   },
//   {
//     accessor: 'Distinct_On_Hand_Qty',
//     title: 'On Hand Qty',
//     sortable: true,
//     render: ({ Distinct_On_Hand_Qty }) => (
//       <p
//         style={{
//           textDecoration: 'underline',
//         }}
//       >
//         {Distinct_On_Hand_Qty}
//       </p>
//     ),
//   },
//   {
//     accessor: 'Now At',
//     title: 'Now At',
//     sortable: true,
//   },
//   {
//     accessor: 'Customer',
//     filter: (
//       <TextInput
//         label='Customer'
//         description='Show customer whose names include the specified text'
//         placeholder='Search customers...'
//         icon={<IconSearch size={16} />}
//         value={customer}
//         onChange={(e) => setCustomer(e.currentTarget.value)}
//       />
//     ),
//     filtering: customer !== '',
//     sortable: true,
//   },
//   {
//     accessor: 'Status',
//     filter: (
//       <TextInput
//         label='Status'
//         description='Show status whose names include the specified text'
//         placeholder='Search status...'
//         icon={<IconSearch size={16} />}
//         value={status}
//         onChange={(e) => setStatus(e.currentTarget.value)}
//       />
//     ),
//     filtering: status !== '',
//     sortable: true,
//   },
//   {
//     accessor: 'Description',
//     filter: (
//       <TextInput
//         label='Description'
//         description='Show description whose names include the specified text'
//         placeholder='Search description...'
//         icon={<IconSearch size={16} />}
//         value={description}
//         onChange={(e) => setDescription(e.currentTarget.value)}
//       />
//     ),
//     filtering: description !== '',
//     sortable: true,
//   },
//   {
//     accessor: 'Order_Quantity',
//     filter: (
//       <TextInput
//         label='Order Quantity'
//         description='Show order quantity whose names include the specified text'
//         placeholder='Search order quantity...'
//         icon={<IconSearch size={16} />}
//         value={orderQuantity}
//         onChange={(e) => setOrderQuantity(e.currentTarget.value)}
//       />
//     ),
//     filtering: orderQuantity !== '',
//     sortable: true,
//   },
//   {
//     accessor: 'Completed_Quantity',
//     filter: (
//       <TextInput
//         label='Completed Quantity'
//         description='Show completed quantity whose names include the specified text'
//         placeholder='Search completed quantity...'
//         icon={<IconSearch size={16} />}
//         value={completedQuantity}
//         onChange={(e) => setCompletedQuantity(e.currentTarget.value)}
//       />
//     ),
//     filtering: completedQuantity !== '',
//     sortable: true,
//   },
//   {
//     accessor: 'Promised_Date',
//     filter: (
//       <TextInput
//         label='Released Date'
//         description='Show released Date whose names include the specified text'
//         placeholder='Search released date...'
//         icon={<IconSearch size={16} />}
//         value={releasedDate}
//         onChange={(e) => setReleasedDate(e.currentTarget.value)}
//       />
//     ),
//     filtering: releasedDate !== '',
//     sortable: true,
//     render: ({ Promised_Date: value }) => (
//       <p>{value ? format(new Date(value), 'MM/dd/yyyy') : '-'}</p>
//     ),
//   },
//   {
//     accessor: 'Requested_Date',
//     sortable: true,
//     render: ({ Requested_Date: value }) => (
//       <p>{value ? format(new Date(value), 'MM/dd/yyyy') : '-'}</p>
//     ),
//   },
//   {
//     accessor: 'Ship_By_Date',
//     sortable: true,
//     render: ({ Ship_By_Date: value }) => (
//       <p>{value ? format(new Date(value), 'MM/dd/yyyy') : '-'}</p>
//     ),
//   },
// ];
