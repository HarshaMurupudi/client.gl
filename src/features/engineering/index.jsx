import React, { useEffect, useState } from 'react';
import { Box, Grid, Skeleton } from '@mantine/core';
import { connect } from 'react-redux';
import { createStyles, rem, Select, TextInput } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { IconSearch } from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';

import { BasicUsageExample } from '../../components/data-table';
import { MantineDataTable } from '../../components/mantine-data-table';
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
  const [query, setQuery] = useState('');
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: 'Job',
    direction: 'asc',
  });

  const columns = [
    {
      accessor: 'Job',
      sortable: true,
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
      sortable: true,
    },
    {
      accessor: 'Sched_Start',
      sortable: true,
      render: ({ Sched_Start: value }) => (
        <p>{value ? format(new Date(value), 'MM/dd/yyyy') : '-'}</p>
      ),
    },
    {
      accessor: 'Make_Quantity',
      sortable: true,
    },
    {
      accessor: 'Note_Text',
      sortable: true,
    },
    {
      accessor: 'Sales_Code',
      sortable: true,
    },
    {
      accessor: 'Work_Center',
      sortable: true,
    },
    {
      accessor: 'Now At',
      sortable: true,
      render: (job) => {
        if (pathName === '/a-art') {
          if (value === 'Open') {
            return <p>{job['Now At']}</p>;
          } else {
            return <p>{'A-ART'}</p>;
          }
        } else {
          return <p>{job['Now At']}</p>;
        }
      },
    },
    {
      accessor: 'Status',
      sortable: true,
    },
    {
      accessor: 'Description',
      sortable: true,
    },
  ];

  useEffect(() => {
    setRecords(
      getTableData()
        .filter(({ Job }) => {
          if (
            query !== '' &&
            !`${Job}`.toLowerCase().includes(query.trim().toLowerCase())
          ) {
            return false;
          }

          return true;
        })
        .slice(0, PAGE_SIZE)
    );
  }, [query]);

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
  useEffect(() => {
    const data = sortBy(getTableData(), sortStatus.columnAccessor).slice(
      0,
      PAGE_SIZE
    );
    setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus]);
  // const columns = useMemo(() => getColumns(fetchPDF, editedUsers, setEditedUsers), [editedUsers]);


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
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
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
          rowExpansion={null}
          totalRecords={getTableData().length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
        />

        {/* <MantineDataTable 
          columns={columns} 
          data={jobs}
          tableProps={{
            editingMode: 'cell',
            enableEditing: true,
            getRowId: (row, index) => row.Job + index,
          }}
        /> */}
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
