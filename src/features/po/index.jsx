import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';

import { PoForm } from './components';
import { BasicUsageExample } from '../../components/data-table';
import { Box } from '@mantine/core';
import { fetchPos } from './store/actions';
import { fetchPDF } from '../jobs/store/actions';

function Po({ pos, fetchPos, fetchPDF }) {
  console.log(fetchPos);
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
      accessor: 'NRE_Charges',
    },
    {
      accessor: 'Customer_PO',
    },
    {
      accessor: 'Order_Quantity',
    },
    {
      accessor: 'Rev',
    },
    {
      accessor: 'Sched_End',
      render: ({ Requested_Date: value }) => (
        <p>{format(new Date(value), 'MM/dd/yyyy')}</p>
      ),
    },
    {
      accessor: 'Requested_Date',
      render: ({ Requested_Date: value }) => (
        <p>{format(new Date(value), 'MM/dd/yyyy')}</p>
      ),
    },
    {
      accessor: 'Promised_Date',
      render: ({ Promised_Date: value }) => (
        <p>{format(new Date(value), 'MM/dd/yyyy')}</p>
      ),
    },
    {
      accessor: 'Shipped_Quantity',
    },
    {
      accessor: 'Remaining_Quantity',
    },
    {
      accessor: 'Packlist',
    },
  ];
  const handleSubmit = async (data) => {
    // await fetchContracts();
    await fetchPos(data);
  };

  return (
    <div>
      <PoForm handleSubmit={handleSubmit} />
      <Box mt={32}>
        <BasicUsageExample
          columns={columns}
          rows={pos}
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
  pos: state.getIn(['po', 'pos']),
});

export default connect(mapStateToProps, { fetchPos, fetchPDF })(Po);
