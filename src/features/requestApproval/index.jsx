import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchRequests, saveNotes } from "./store/actions";
import { Box } from "@mantine/core";
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";

function RequestApproval({
  requests,
  requestsLoading,
  fetchRequests,
  saveNotes,
}) {
  const [editedUsers, setEditedUsers] = useState({});

  const fetchPageData = async () => {
    await fetchRequests();
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const columns = useMemo(
    () =>
      getColumns(
        editedUsers,
        setEditedUsers,
        requests,
      ),
    [editedUsers]
  );

  const handleSaveUsers = async () => {
    await saveNotes(Object.values(editedUsers));
    setEditedUsers({});
  };

  return (
    <Box mt={32}>
      <MantineDataTable
        title={"Request Approval"}
        tableKey={`request-approval-data-table`}
        columns={columns}
        data={requests || []}
        tableProps={{
          // editingMode: "cell",
          enableEditing: true,
          getRowId: (row, index) => `${row.Request_ID}_${index}`,
        }}
        handleSaveUsers={handleSaveUsers}
        loading={requestsLoading}
        hasCustomActionBtn={true}
        hasActionColumn={true}
        enableGrouping={false}
      >
      </MantineDataTable>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  requests: state.getIn(["request", "requests"]),
  requestsLoading: state.getIn(["requests", "requestsLoading"]),
});

export default connect(mapStateToProps, {
  fetchRequests,
  saveNotes,
})(RequestApproval);
