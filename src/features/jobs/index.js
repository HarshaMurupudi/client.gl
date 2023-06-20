import React, { useEffect, useState } from 'react';
import { BasicUsageExample } from '../../components/data-table';
import { connect } from 'react-redux';
import { IconSearch } from '@tabler/icons-react';
import { TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import sortBy from 'lodash/sortBy';
import { useNavigate } from 'react-router-dom';

import { fetchJobs, fetchPDF } from './store/actions';

function Jobs({ jobs, fetchJobs, fetchPDF }) {
  let navigate = useNavigate();

  const [sortStatus, setSortStatus] = useState({
    columnAccessor: 'Job',
    direction: 'asc',
  });
  const [records, setRecords] = useState(sortBy(jobs, 'Job'));

  useEffect(() => {
    setRecords(jobs);
  }, [jobs]);

  const [query, setQuery] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [customer, setCustomer] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [orderQuantity, setOrderQuantity] = useState('');
  const [completedQuantity, setCompletedQuantity] = useState('');
  const [releasedDate, setReleasedDate] = useState('');

  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [debouncedPartQuery] = useDebouncedValue(partNumber, 200);
  const [debouncedCustomerQuery] = useDebouncedValue(customer, 200);
  const [debouncedStatusQuery] = useDebouncedValue(status, 200);
  const [debouncedDescriptionQuery] = useDebouncedValue(description, 200);
  const [debouncedOrderQuantityQuery] = useDebouncedValue(orderQuantity, 200);
  const [debouncedCompletedQuantityQuery] = useDebouncedValue(
    completedQuantity,
    200
  );
  const [debouncedReleasedDateQuery] = useDebouncedValue(releasedDate, 200);

  useEffect(() => {
    setRecords(
      jobs.filter(
        ({
          Job,
          Part_Number,
          Customer,
          Status,
          Description,
          Order_Quantity,
          Completed_Quantity,
          Released_Date,
        }) => {
          if (
            debouncedQuery !== '' &&
            !`${Job}`
              .toLowerCase()
              .includes(debouncedQuery.trim().toLowerCase())
          ) {
            return false;
          }

          if (
            debouncedPartQuery !== '' &&
            !`${Part_Number}`
              .toLowerCase()
              .includes(debouncedPartQuery.trim().toLowerCase())
          ) {
            return false;
          }

          if (
            debouncedCustomerQuery !== '' &&
            !`${Customer}`
              .toLowerCase()
              .includes(debouncedCustomerQuery.trim().toLowerCase())
          ) {
            return false;
          }

          if (
            debouncedStatusQuery !== '' &&
            !`${Status}`
              .toLowerCase()
              .includes(debouncedStatusQuery.trim().toLowerCase())
          ) {
            return false;
          }

          if (
            debouncedDescriptionQuery !== '' &&
            !`${Description}`
              .toLowerCase()
              .includes(debouncedDescriptionQuery.trim().toLowerCase())
          ) {
            return false;
          }

          if (
            debouncedOrderQuantityQuery !== '' &&
            !`${Order_Quantity}`
              .toLowerCase()
              .includes(debouncedOrderQuantityQuery.trim().toLowerCase())
          ) {
            return false;
          }

          if (
            debouncedCompletedQuantityQuery !== '' &&
            !`${Completed_Quantity}`
              .toLowerCase()
              .includes(debouncedCompletedQuantityQuery.trim().toLowerCase())
          ) {
            return false;
          }

          if (
            debouncedReleasedDateQuery !== '' &&
            !`${Released_Date}`
              .toLowerCase()
              .includes(debouncedReleasedDateQuery.trim().toLowerCase())
          ) {
            return false;
          }

          return true;
        }
      )
    );
  }, [
    // jobs,
    debouncedQuery,
    debouncedPartQuery,
    debouncedCustomerQuery,
    debouncedStatusQuery,
    debouncedDescriptionQuery,
    debouncedOrderQuantityQuery,
    debouncedCompletedQuantityQuery,
    debouncedReleasedDateQuery,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchJobs();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const data = sortBy(jobs, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus]);

  const columns = [
    {
      accessor: 'Job',
      filter: (
        <TextInput
          label='Job'
          description='Show Job whose names include the specified text'
          placeholder='Search Jobs...'
          icon={<IconSearch size={16} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      ),
      filtering: query !== '',
      sortable: true,
    },
    {
      accessor: 'Notes',
      sortable: true,
    },
    {
      accessor: 'Part_Number',
      filter: (
        <TextInput
          label='Part Number'
          description='Show part numbers whose names include the specified text'
          placeholder='Search part numbers...'
          icon={<IconSearch size={16} />}
          value={partNumber}
          onChange={(e) => setPartNumber(e.currentTarget.value)}
        />
      ),
      filtering: partNumber !== '',
      sortable: true,
      render: ({ Part_Number }) => (
        <p
          style={{
            textDecoration: 'underline',
          }}
        >
          {Part_Number}
        </p>
      ),
    },
    {
      accessor: 'On_Hand_Qty',
      sortable: true,
    },
    {
      accessor: 'Location_ID',
      sortable: true,
    },
    {
      accessor: 'Customer',
      filter: (
        <TextInput
          label='Customer'
          description='Show customer whose names include the specified text'
          placeholder='Search customers...'
          icon={<IconSearch size={16} />}
          value={customer}
          onChange={(e) => setCustomer(e.currentTarget.value)}
        />
      ),
      filtering: customer !== '',
      sortable: true,
    },
    {
      accessor: 'Status',
      filter: (
        <TextInput
          label='Status'
          description='Show status whose names include the specified text'
          placeholder='Search status...'
          icon={<IconSearch size={16} />}
          value={status}
          onChange={(e) => setStatus(e.currentTarget.value)}
        />
      ),
      filtering: status !== '',
      sortable: true,
    },
    {
      accessor: 'Description',
      filter: (
        <TextInput
          label='Description'
          description='Show description whose names include the specified text'
          placeholder='Search description...'
          icon={<IconSearch size={16} />}
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      ),
      filtering: description !== '',
      sortable: true,
    },
    {
      accessor: 'Order_Quantity',
      filter: (
        <TextInput
          label='Order Quantity'
          description='Show order quantity whose names include the specified text'
          placeholder='Search order quantity...'
          icon={<IconSearch size={16} />}
          value={orderQuantity}
          onChange={(e) => setOrderQuantity(e.currentTarget.value)}
        />
      ),
      filtering: orderQuantity !== '',
      sortable: true,
    },
    {
      accessor: 'Completed_Quantity',
      filter: (
        <TextInput
          label='Completed Quantity'
          description='Show completed quantity whose names include the specified text'
          placeholder='Search completed quantity...'
          icon={<IconSearch size={16} />}
          value={completedQuantity}
          onChange={(e) => setCompletedQuantity(e.currentTarget.value)}
        />
      ),
      filtering: completedQuantity !== '',
      sortable: true,
    },
    {
      accessor: 'Promised_Date',
      filter: (
        <TextInput
          label='Released Date'
          description='Show released Date whose names include the specified text'
          placeholder='Search released date...'
          icon={<IconSearch size={16} />}
          value={releasedDate}
          onChange={(e) => setReleasedDate(e.currentTarget.value)}
        />
      ),
      filtering: releasedDate !== '',
      sortable: true,
    },
    {
      accessor: 'Requested_Date',
      sortable: true,
    },
    {
      accessor: 'Ship_By_Date',
      sortable: true,
    },
  ];

  return (
    <div>
      <BasicUsageExample
        columns={columns}
        rows={records}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        onCellClick={({ event, record, recordIndex, column, columnIndex }) => {
          if (column.accessor === 'Part_Number') {
            fetchPDF(record.Part_Number);
          }
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  jobs: state.getIn(['job', 'jobs']),
});

export default connect(mapStateToProps, { fetchJobs, fetchPDF })(Jobs);
