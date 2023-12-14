import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { Box, Skeleton, Text, Flex, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import {
  fetchPendingJobs,
  saveNotes,
  fetchPendingJobsWithQuantity,
} from "./store/actions";
import { fetchPDF } from "../jobs/store/actions";
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";

function PendingJobs({
  pendingJob,
  pendingJobsLoading,
  jobQuantityLoading,
  fetchPendingJobs,
  fetchPDF,
  saveNotes,
  fetchPendingJobsWithQuantity,
}) {
  const [editedUsers, setEditedUsers] = useState({});
  const [selectedJob, setSelectedJob] = useState("");
  let navigate = useNavigate();

  const columns = useMemo(
    () => getColumns(fetchPDF, editedUsers, setEditedUsers, pendingJob, jobQuantityLoading),
    [editedUsers, pendingJob, jobQuantityLoading]
  );
  const fetchData = async () => {
    await fetchPendingJobs();
    fetchPendingJobsWithQuantity();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveUsers = async (e, table) => {
    await saveNotes(Object.values(editedUsers));
    setEditedUsers({});
  };

  const customOnRowSelection = (value, currentRow) => {
    if (!currentRow.getIsSelected()) {
      setSelectedJob(currentRow.getValue("Job"));
    } else {
      setSelectedJob("");
    }
  };
  const routeChange = () => {
    let path = `/po-details/${selectedJob}`;
    navigate(path);
  };

  return (
    <Box mt={16}>
      {/* <Skeleton visible={pendingJobsLoading} mt={16}> */}
      <Box>
        <MantineDataTable
          title={"Pending Jobs"}
          tableKey={`pending-jobs-queue-data-table`}
          columns={columns}
          data={pendingJob}
          tableProps={{
            editDisplayMode: "table",
            enableEditing: true,
            getRowId: (row, index) => `${row.Job}_${index}`,
          }}
          loading={pendingJobsLoading}
          hasRefetch={true}
          fetchData={fetchData}
          hasActionColumn={true}
          enableGrouping={false}
          isEditable={true}
          isEdited={Object.keys(editedUsers).length === 0}
          handleSave={handleSaveUsers}
          hasCustomActionBtn={true}
          customOnRowSelection={customOnRowSelection}
        >
          <Button onClick={routeChange} variant="filled">
            Review
          </Button>
        </MantineDataTable>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  pendingJob: state.getIn(["pendingJob", "pendingJobs"]),
  pendingJobsLoading: state.getIn(["pendingJob", "pendingJobsLoading"]),
  jobQuantityLoading: state.getIn(["pendingJob", "jobQuantityLoading"]),
});

export default connect(mapStateToProps, {
  fetchPendingJobs,
  fetchPDF,
  saveNotes,
  fetchPendingJobsWithQuantity,
})(PendingJobs);
