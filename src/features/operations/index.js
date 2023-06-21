import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, TextInput } from '@mantine/core';
import { useLocation } from 'react-router-dom';

import { BasicUsageExample } from '../../components/data-table';
import { fetchOperations } from './store/actions';

function Operations({ operations, fetchOperations }) {
  const location = useLocation();
  const columns = [
    {
      accessor: 'Job',
    },
    {
      accessor: 'Work_Center',
    },
    {
      accessor: 'WC_Vendor',
    },
    {
      accessor: 'Work_Center',
    },
    {
      accessor: 'Sequence',
    },
    {
      accessor: 'Description',
    },
    {
      accessor: 'Status',
    },
  ];

  useEffect(() => {
    const fetchPageData = async () => {
      await fetchOperations(location.state.jobID);
    };

    fetchPageData();
  }, []);

  return (
    <Box>
      <BasicUsageExample
        columns={columns}
        rows={operations}
        sortStatus={null}
        onSortStatusChange={null}
        onCellClick={({ event, record, recordIndex, column, columnIndex }) => {
          if (column.accessor === 'Part_Number') {
            // fetchPDF(record.Part_Number);
          }
        }}
      />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  operations: state.getIn(['operation', 'operations']),
});

export default connect(mapStateToProps, { fetchOperations })(Operations);
