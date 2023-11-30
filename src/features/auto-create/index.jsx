import { useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Box, Text } from "@mantine/core";

import { fetchAutoCreateJobs } from "./store/actions";
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";

function Attendance({ autoCreateJobs, fetchAutoCreateJobs, autoCreateJobsLoading }) {
  const columns = useMemo(() => getColumns(), []);

  const fetchData = async () => {
    await fetchAutoCreateJobs();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <MantineDataTable
        title={"Jobs"}
        tableKey={`auto-create-folders-jobs-data-table`}
        fetchData={fetchData}
        columns={columns}
        data={autoCreateJobs || []}
        loading={autoCreateJobsLoading}
        hasRefetch={true}
        hasCustomActionBtn={false}
        hasActionColumn={true}
        isEditable={false}
        enableGrouping={false}
      ></MantineDataTable>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  autoCreateJobs: state.getIn(["autoCreateJobFolder", "autoCreateJobs"]),
  autoCreateJobsLoading: state.getIn([
    "autoCreateJobFolder",
    "autoCreateJobsLoading",
  ]),
});

export default connect(mapStateToProps, {
  fetchAutoCreateJobs,
})(Attendance);
