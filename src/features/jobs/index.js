import React, { useEffect, useState } from 'react';
import { BasicUsageExample } from '../../components/data-table';
import { connect } from 'react-redux';
import { IconSearch } from '@tabler/icons-react';
import { TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import { fetchJobs, fetchPDF } from './store/actions';

function Jobs({ jobs, fetchJobs, fetchPDF }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(jobs);
  }, [jobs]);

  const [query, setQuery] = useState('');

  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    setRecords(
      jobs.filter(({ Job }) => {
        if (
          debouncedQuery !== '' &&
          !`${Job}`.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false;
        }

        return true;
      })
    );
  }, [debouncedQuery]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchJobs();
    };

    fetchData();
  }, []);

  const columns = [
    {
      accessor: 'Job',
      filter: (
        <TextInput
          label='Employees'
          description='Show employees whose names include the specified text'
          placeholder='Search employees...'
          icon={<IconSearch size={16} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      ),
      filtering: query !== '',
    },
    { accessor: 'Part_Number' },
    { accessor: 'Customer' },
    { accessor: 'Status' },
    { accessor: 'Description' },
    { accessor: 'Order_Quantity' },
    { accessor: 'Completed_Quantity' },
    { accessor: 'Released_Date' },
  ];

  return (
    <div>
      <BasicUsageExample
        columns={columns}
        rows={records}
        onRowClick={(company, rowIndex, event) => {
          // alert(company.Part_Number);
          fetchPDF(company.Part_Number);
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  jobs: state.getIn(['job', 'jobs']),
});

export default connect(mapStateToProps, { fetchJobs, fetchPDF })(Jobs);
