import React from 'react';
import { connect } from 'react-redux';

import { PoForm } from '../po/components';
import { BasicUsageExample } from '../../components/data-table';
import { Box } from '@mantine/core';
import { fetchTracking } from './store/actions';
import { fetchPDFByJob } from '../jobs/store/actions';

function Tracking({ tracking, fetchTracking, fetchPDFByJob }) {
  const columns = [
    {
      accessor: 'Job',
      render: ({ Job }) => (
        <p
          style={{
            textDecoration: 'underline',
          }}
        >
          {Job}
        </p>
      ),
    },
    {
      accessor: 'Packlist',
    },
    {
      accessor: 'Tracking_Nbr',
    },
  ];
  const handleSubmit = async (data) => {
    // await fetchContracts();
    await fetchTracking(data);
  };

  return (
    <div>
      <PoForm handleSubmit={handleSubmit} />
      <Box mt={32}>
        <BasicUsageExample
          columns={columns}
          rows={tracking}
          sortStatus={null}
          onSortStatusChange={null}
          onCellClick={({
            event,
            record,
            recordIndex,
            column,
            columnIndex,
          }) => {
            if (column.accessor === 'Job') {
              fetchPDFByJob(record.Job);
            }
          }}
        />
      </Box>
    </div>
  );
}

const mapStateToProps = (state) => ({
  tracking: state.getIn(['tracking', 'tracking']),
});

export default connect(mapStateToProps, { fetchTracking, fetchPDFByJob })(
  Tracking
);
