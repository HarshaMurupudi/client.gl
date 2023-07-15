import { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Box, Skeleton, Text, Flex, Button } from '@mantine/core';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import DatePicker from "react-datepicker";
import { format, addMinutes } from "date-fns";

import { GLSelect } from "../../components/select";
import { MantineDataTable } from '../../components/mantine-data-table';
import { fetchJobs, fetchPDF, saveNotes } from './store/actions';
import { getColumns } from './columns';

function Jobs({ jobs, jobsLoading, fetchJobs, fetchPDF, saveNotes }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [editedUsers, setEditedUsers] = useState({});

  console.log(editedUsers)

  useEffect(() => {
    const oneWeekAgo = new Date();
    const oneWeekAhead = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    oneWeekAhead.setDate(oneWeekAhead.getDate() + 7);
    setDateRange([oneWeekAgo, oneWeekAhead]);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      await fetchJobs(startDate, endDate);
    };
    fetchData();
  }, [startDate, endDate]);
  

  const columns = useMemo(() => getColumns(fetchPDF, editedUsers, setEditedUsers), [editedUsers]);

  const handleSaveUsers = async () => {
    await saveNotes(Object.values(editedUsers))
    setEditedUsers({});
  };

  return (
    <Box>
       <Box my={16}>
          <Text fz="md">Select Ship By date</Text>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            isClearable={true}
          />
        </Box>
      <Skeleton visible={jobsLoading}>
        <MantineDataTable 
          columns={columns} 
          data={jobs}
          tableProps={{
            editingMode: 'cell',
            enableEditing: true,
            getRowId: (row, index) => row.Job + index,
            renderTopToolbarCustomActions: () => (
              <Flex align="center" gap="md">
                <Button
                  color="blue"
                  onClick={handleSaveUsers}
                  disabled={
                    Object.keys(editedUsers).length === 0
                  }
                  // loading={isUpdatingUser}
                >
                  Save
                </Button>
                
              </Flex>
            ),
          }}
        />
      </Skeleton>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  jobs: state.getIn(['job', 'jobs']),
  jobsLoading: state.getIn(['job', 'jobsLoading']),
});

export default connect(mapStateToProps, { fetchJobs, fetchPDF, saveNotes })(Jobs);
