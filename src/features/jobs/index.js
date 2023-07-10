import { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Skeleton } from '@mantine/core';

import { MantineDataTable } from '../../components/mantine-data-table';
import { fetchJobs, fetchPDF } from './store/actions';
import { getColumns } from './columns';

function Jobs({ jobs, jobsLoading, fetchJobs, fetchPDF }) {
  useEffect(() => {
    const fetchData = async () => {
      await fetchJobs();
    };
    fetchData();
  }, []);

  const columns = useMemo(() => getColumns(fetchPDF), []);

  return (
    <Skeleton visible={jobsLoading}>
      <MantineDataTable columns={columns} data={jobs} />
    </Skeleton>
  );
}

const mapStateToProps = (state) => ({
  jobs: state.getIn(['job', 'jobs']),
  jobsLoading: state.getIn(['job', 'jobsLoading']),
});

export default connect(mapStateToProps, { fetchJobs, fetchPDF })(Jobs);
