import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mantine/core';
import { connect } from 'react-redux';
import { createStyles, rem, Select, TextInput } from '@mantine/core';

import { BasicUsageExample } from '../../components/data-table';
import { fetchOpenJobs, fetchReadyJobs } from './store/actions';
import { fetchPDF } from '../jobs/store/actions';

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
    accessor: 'Status',
  },
  {
    accessor: 'Description',
  },
];
const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
}));
const dropDownData = [
  { value: 'Open', label: 'Open' },
  { value: 'Ready', label: 'Ready' },
];

function Engineering({
  openJobs,
  readyJobs,
  fetchOpenJobs,
  fetchReadyJobs,
  fetchPDF,
}) {
  const { classes } = useStyles();

  const [value, setValue] = useState('Open');
  useEffect(() => {
    const fetchPageData = async () => {
      await fetchOpenJobs();
      await fetchReadyJobs('aaa');
    };
    fetchPageData();
  }, []);

  const getTableData = () => {
    return value === 'Open' ? openJobs : readyJobs;
  };

  return (
    <Box>
      <Grid>
        <Grid.Col span={2}>
          <Select
            my='md'
            size='xs'
            withinPortal
            data={dropDownData}
            placeholder='Pick one'
            label='Status'
            classNames={classes}
            value={value}
            onChange={setValue}
          />
        </Grid.Col>
      </Grid>

      <BasicUsageExample
        columns={columns}
        rows={getTableData()}
        sortStatus={null}
        onSortStatusChange={null}
        onCellClick={({ event, record, recordIndex, column, columnIndex }) => {
          if (column.accessor === 'Part_Number') {
            fetchPDF(record.Part_Number);
          }
        }}
        rowExpansion={null}
      />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  openJobs: state.getIn(['engineering', 'openJobs']),
  readyJobs: state.getIn(['engineering', 'readyJobs']),
});

export default connect(mapStateToProps, {
  fetchOpenJobs,
  fetchReadyJobs,
  fetchPDF,
})(Engineering);
