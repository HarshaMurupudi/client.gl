import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Box, Group, createStyles, px, Text } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { IconChevronRight } from '@tabler/icons-react';

import { BasicUsageExample } from '../../components/data-table';
import { fetchOperations } from './store/actions';
import { fetchPDFByJob } from '../jobs/store/actions';

const useStyles = createStyles((theme) => ({
  expandIcon: {
    transition: 'transform 0.2s ease',
  },
  expandIconRotated: {
    transform: 'rotate(90deg)',
  },
  employeeName: {
    marginLeft: px(theme.spacing.xl) * 2,
  },
}));

function Operations({ operations, fetchOperations, fetchPDFByJob }) {
  const location = useLocation();
  const [expandedCompanyIds, setExpandedCompanyIds] = useState([]);
  const { cx, classes } = useStyles();

  const columns = [
    {
      accessor: 'id',
      render: ({ id }) => (
        <Group spacing='xs'>
          <IconChevronRight
            size='0.9em'
            className={cx(classes.expandIcon, {
              [classes.expandIconRotated]: expandedCompanyIds.includes(id),
            })}
          />
          <Text>{id}</Text>
        </Group>
      ),
    },
  ];

  const columnsNested = [
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

  console.log(expandedCompanyIds);
  return (
    <Box>
      <BasicUsageExample
        columns={columns}
        rows={
          operations
            ? Object.keys(operations).map((item) => {
                return {
                  id: item,
                };
              })
            : []
        }
        sortStatus={null}
        onSortStatusChange={null}
        rowExpansion={{
          // allowMultiple: true,
          expanded: {
            recordIds: expandedCompanyIds,
            onRecordIdsChange: setExpandedCompanyIds,
          },
          content: (department) => (
            <BasicUsageExample
              columns={columnsNested}
              rows={operations ? operations[expandedCompanyIds[0]] : []}
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
              rowExpansion={null}
            />
          ),
        }}
      />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  operations: state.getIn(['operation', 'operations']),
});

export default connect(mapStateToProps, { fetchOperations, fetchPDFByJob })(
  Operations
);
