import React from 'react';
import { ContractForm } from './module';
import { Box, TextInput } from '@mantine/core';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IconSearch } from '@tabler/icons-react';

import { BasicUsageExample } from '../../components/data-table';
import companies from '../../data/companies.json';
import { fetchContracts } from './store/actions';
import { fetchPDF } from '../jobs/store/actions';

function Contracts({ contracts, fetchContracts, fetchPDF }) {
  const navigate = useNavigate();
  const handleSubmit = async (data, form) => {
    let selectedParam = null;

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        selectedParam = { [key]: value };
      }
    });

    await fetchContracts(selectedParam);
    form.reset();
  };

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
      accessor: 'Customer_PO',
    },
    {
      accessor: 'Status',
    },
    {
      accessor: 'Description',
    },
  ];

  return (
    <Box>
      <ContractForm handleSubmit={handleSubmit} />

      <BasicUsageExample
        columns={columns}
        rows={contracts}
        sortStatus={null}
        onSortStatusChange={null}
        onCellClick={({ event, record, recordIndex, column, columnIndex }) => {
          if (column.accessor === 'Part_Number') {
            fetchPDF(record.Part_Number);
          }
        }}
        rowContextMenu={{
          items: (record) => [
            {
              key: 'operations',
              onClick: () =>
                navigate('/operations', { state: { jobID: record.Job } }),
            },
          ],
        }}
      />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  contracts: state.getIn(['contract', 'contracts']),
});

export default connect(mapStateToProps, { fetchContracts, fetchPDF })(
  Contracts
);
