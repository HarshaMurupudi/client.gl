import React, { useEffect, useState, useMemo } from 'react';
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
import { getColumns } from './columns';

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
  engineeringLoading,
  fetchOpenJobs,
  fetchReadyJobs,
  fetchPDF,
}) {
  const { classes } = useStyles();
  const location = useLocation();
  const pathName = location.pathname;

  const [value, setValue] = useState('Open');
  useEffect(() => {
    const fetchPageData = async () => {
      await fetchOpenJobs();
      await fetchReadyJobs('aaa');
    };
    fetchPageData();
  }, []);

  const columns = useMemo(() => getColumns(fetchPDF, pathName, value), []);
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

      <Skeleton visible={engineeringLoading}>
        {/* <BasicUsageExample
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
        /> */}

        <MantineDataTable
          columns={columns}
          data={getTableData()}
          tableProps={{
            editingMode: 'cell',
            enableEditing: true,
            getRowId: (row, index) => row.Job + index,
          }}
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
