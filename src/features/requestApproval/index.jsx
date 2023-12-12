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
  user
}) {
  const [editedUsers, setEditedUsers] = useState({});

  const userName = `${user.First_Name} ${user.Last_Name}`;

  const assignedApprovers = {
    "Sumit Mahajan": ["shop", "eco", "improvement", "maintenance"],
    "Jon Erie": ["shop"],
    "Jason Mezzenga": ["maintenance"],
    "Nate Baskfield": ["improvement"],
    "Bill Allen": ["eco"],
    "Mat Welch": ["eco"],
    "Scott Bohm": ["eco"],
  };
  

  const currentUserTypes = assignedApprovers[userName] || [];

  const filteredRequests = useMemo(() => {
    if (requests) {
      return requests.filter(request =>
        currentUserTypes.includes(request.Request_Type)
      );
    } else {
      return [];
    }
  }, [requests, currentUserTypes]);


  const fetchData = async () => {
    await fetchRequests();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = useMemo(
    () =>
      getColumns(
        editedUsers,
        setEditedUsers,
      ),
    [editedUsers]
  );

  const handleSave = async () => {
    await saveNotes(Object.values(editedUsers));
    setEditedUsers({});
  };

  return (
    <Box mt={32}>
      <MantineDataTable
        title={"Request Approval"}
        tableKey={`request-approval-data-table`}
        columns={columns}
        data={filteredRequests}
        tableProps={{
          editDisplayMode: "table",
          enableEditing: true,
          getRowId: (row, index) => `${row.Request_ID}_${index}`,
        }}
        initialState={{
          sorting: [
            { id: "Status", desc: true },
            { id: "Submission_Date", desc: true },
          ],
        }}
        handleSave={handleSave}
        loading={requestsLoading}
        hasRefetch={true}
        hasActionColumn={true}
        enableGrouping={false}
        hasCustomActionBtn={true}
        isEditable={true}
        isEdited={Object.keys(editedUsers).length === 0}
      >
      </MantineDataTable>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.getIn(["user","user"]),
  requests: state.getIn(["requests", "requests"]),
  requestsLoading: state.getIn(["requests", "requestsLoading"]),
});

export default connect(mapStateToProps, {
  fetchRequests,
  saveNotes,
})(RequestApproval);
