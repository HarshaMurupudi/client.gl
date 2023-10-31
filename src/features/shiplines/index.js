import { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Box, Text, Select } from "@mantine/core";
import { useParams } from "react-router-dom";

import { MantineDataTable } from "../../components/mantine-data-table";
import { fetchPDF, saveNotes } from "../jobs/store/actions";
import { fetchJobs, setJobsLoading } from "./store/actions";
import { getColumns } from "./columns";

function Jobs({
  jobs,
  jobsLoading,
  fetchJobs,
  fetchPDF,
  saveNotes,
  setJobsLoading,
}) {
  const params = useParams();
  const jobID = params.jobID;
  const [editedUsers, setEditedUsers] = useState({});

  const fetchData = async () => {
    await fetchJobs(jobID);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = useMemo(
    () => getColumns(fetchPDF, editedUsers, setEditedUsers, jobs),
    [editedUsers, jobs]
  );

  const handleSaveUsers = async (e, table) => {
    await saveNotes(Object.values(editedUsers));
    setEditedUsers({});
  };

  return (
    <Box>
      <MantineDataTable
        title={"Delivery Queue"}
        fetchData={fetchData}
        tableKey={`shiplines-delivery-queue-data-table`}
        columns={columns}
        data={jobs}
        loading={jobsLoading}
        isEditable={true}
        isEdited={Object.keys(editedUsers).length === 0}
        handleSave={handleSaveUsers}
        hasCustomActionBtn={false}
        tableProps={{
          editDisplayMode: "table",
          enableEditing: true,
          getRowId: (row, index) => `${row.Job}_${index}`,
        }}
        hasRefetch={true}
        initialState={{
          sorting: [{ id: "shipBayDateDate", desc: false }],
        }}
        hasActionColumn={true}
        enableGrouping={false}
      ></MantineDataTable>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  jobs: state.getIn(["shiplines", "jobs"]),
  jobsLoading: state.getIn(["shiplines", "jobsLoading"]),
});

export default connect(mapStateToProps, {
  fetchJobs,
  fetchPDF,
  saveNotes,
  setJobsLoading,
})(Jobs);
