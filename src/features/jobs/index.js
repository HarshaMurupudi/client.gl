import React, { useEffect, useState } from 'react';
import { BasicUsageExample } from '../../components/data-table';
import { connect } from 'react-redux';
import { IconSearch } from '@tabler/icons-react';
import { TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import sortBy from 'lodash/sortBy';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import { fetchJobs, fetchPDF } from './store/actions';
const PAGE_SIZE = 15;

function Jobs({ jobs, fetchJobs, fetchPDF }) {
  let navigate = useNavigate();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(jobs.slice(from, to));
  }, [page, jobs]);

  const [sortStatus, setSortStatus] = useState({
    columnAccessor: 'Job',
    direction: 'asc',
  });
  // const [records, setRecords] = useState(sortBy(jobs, 'Job'));
  const [records, setRecords] = useState(jobs.slice(0, PAGE_SIZE));

  // useEffect(() => {
  //   setRecords(jobs);
  // }, [jobs]);

  const [query, setQuery] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [customer, setCustomer] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [orderQuantity, setOrderQuantity] = useState('');
  const [completedQuantity, setCompletedQuantity] = useState('');
  const [releasedDate, setReleasedDate] = useState('');

  useEffect(() => {
    setRecords(
      jobs
        .filter(
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
              query !== '' &&
              !`${Job}`.toLowerCase().includes(query.trim().toLowerCase())
            ) {
              return false;
            }

            if (
              partNumber !== '' &&
              !`${Part_Number}`
                .toLowerCase()
                .includes(partNumber.trim().toLowerCase())
            ) {
              return false;
            }

            if (
              customer !== '' &&
              !`${Customer}`
                .toLowerCase()
                .includes(customer.trim().toLowerCase())
            ) {
              return false;
            }

            if (
              status !== '' &&
              !`${Status}`.toLowerCase().includes(status.trim().toLowerCase())
            ) {
              return false;
            }

            if (
              description !== '' &&
              !`${Description}`
                .toLowerCase()
                .includes(description.trim().toLowerCase())
            ) {
              return false;
            }

            if (
              orderQuantity !== '' &&
              !`${Order_Quantity}`
                .toLowerCase()
                .includes(orderQuantity.trim().toLowerCase())
            ) {
              return false;
            }

            if (
              completedQuantity !== '' &&
              !`${Completed_Quantity}`
                .toLowerCase()
                .includes(completedQuantity.trim().toLowerCase())
            ) {
              return false;
            }

            if (
              releasedDate !== '' &&
              !`${Released_Date}`
                .toLowerCase()
                .includes(releasedDate.trim().toLowerCase())
            ) {
              return false;
            }

            return true;
          }
        )
        .slice(0, PAGE_SIZE)
    );
  }, [
    // jobs,
    query,
    partNumber,
    customer,
    status,
    description,
    orderQuantity,
    completedQuantity,
    releasedDate,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchJobs();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const data = sortBy(jobs, sortStatus.columnAccessor).slice(0, PAGE_SIZE);
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
      accessor: 'Work_Center',
      title: 'Now At',
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
      render: ({ Promised_Date: value }) => (
        <p>{value ? format(new Date(value), 'MM/dd/yyyy') : '-'}</p>
      ),
    },
    {
      accessor: 'Requested_Date',
      sortable: true,
      render: ({ Requested_Date: value }) => (
        <p>{value ? format(new Date(value), 'MM/dd/yyyy') : '-'}</p>
      ),
    },
    {
      accessor: 'Ship_By_Date',
      sortable: true,
      render: ({ Ship_By_Date: value }) => (
        <p>{value ? format(new Date(value), 'MM/dd/yyyy') : '-'}</p>
      ),
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
        totalRecords={jobs.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  jobs: state.getIn(['job', 'jobs']),
});

export default connect(mapStateToProps, { fetchJobs, fetchPDF })(Jobs);
