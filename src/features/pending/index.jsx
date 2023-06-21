import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box } from '@mantine/core';

import { fetchPendingJobs } from './store/actions';
import { fetchPDF } from '../jobs/store/actions';
import { BasicUsageExample } from '../../components/data-table';

function PendingJobs({ pendingJob, fetchPendingJobs, fetchPDF }) {
  const columns = [
    {
      accessor: 'Job',
    },
    {
      accessor: 'Part_Number',
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
      accessor: 'Customer',
    },
    {
      accessor: 'Rev',
    },
    {
      accessor: 'Status',
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      await fetchPendingJobs();
    };

    fetchData();
  }, []);

  return (
    <div>
      <Box mt={32}>
        <BasicUsageExample
          columns={columns}
          rows={pendingJob}
          sortStatus={null}
          onSortStatusChange={null}
          onCellClick={({
            event,
            record,
            recordIndex,
            column,
            columnIndex,
          }) => {
            if (column.accessor === 'Part_Number') {
              fetchPDF(record.Part_Number);
            }
          }}
        />
      </Box>
    </div>
  );
}

const mapStateToProps = (state) => ({
  pendingJob: state.getIn(['pendingJob', 'pendingJobs']),
});

export default connect(mapStateToProps, { fetchPendingJobs, fetchPDF })(
  PendingJobs
);
