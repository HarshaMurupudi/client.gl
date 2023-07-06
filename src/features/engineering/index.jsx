import React, { useEffect, useState } from 'react';
import { Box, Grid, Skeleton } from '@mantine/core';
import { connect } from 'react-redux';
import { createStyles, rem, Select, TextInput } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';

import { BasicUsageExample } from '../../components/data-table';
import { fetchOpenJobs, fetchReadyJobs } from './store/actions';
import { fetchPDF } from '../jobs/store/actions';


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
const PAGE_SIZE = 15;

function Engineering({
  openJobs,
  readyJobs,
  engineeringLoading,
  fetchOpenJobs,
  fetchReadyJobs,
  fetchPDF,
}) {
  const [page, setPage] = useState(1);
  const { classes } = useStyles();
  const location = useLocation();
  const pathName = location.pathname;

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
      accessor: 'Sched_Start',
      render: ({ Sched_Start: value }) => (
        <p>{value ? format(new Date(value), 'MM/dd/yyyy') : '-'}</p>
      ),
    },
    {
      accessor: 'Make_Quantity',
    },
    {
      accessor: 'Note_Text',
    },
    {
      accessor: 'Sales_Code',
    },
    {
      accessor: 'Work_Center',
    },
    {
      accessor: 'Now At',
      render: (job) => {
        if(pathName === '/a-art'){
          if(value === 'Open'){
            return (
              <p>
                {job['Now At']}
              </p>
            )
          } else {
            return (
              <p>
                {'A-ART'}
              </p>
            )
          }
        } else {
          return (
            <p>{job['Now At']}</p>
          )
        }
      },
    },
    {
      accessor: 'Status',
    },
    {
      accessor: 'Description',
    },
  ];

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
  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(getTableData().slice(from, to));
  }, [page, getTableData()]);
  const [records, setRecords] = useState(getTableData().slice(0, PAGE_SIZE));

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

      <Skeleton visible={engineeringLoading}>
        <BasicUsageExample
          columns={columns}
          rows={records}
          sortStatus={null}
          onSortStatusChange={null}
          onCellClick={({ event, record, recordIndex, column, columnIndex }) => {
            if (column.accessor === 'Part_Number') {
              fetchPDF(record.Part_Number);
            }
          }}
          rowExpansion={null}
          totalRecords={getTableData().length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
      />
      </Skeleton>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  openJobs: state.getIn(['engineering', 'openJobs']),
  readyJobs: state.getIn(['engineering', 'readyJobs']),
  engineeringLoading: state.getIn(['engineering', 'engineeringLoading']),
});

export default connect(mapStateToProps, {
  fetchOpenJobs,
  fetchReadyJobs,
  fetchPDF,
})(Engineering);
