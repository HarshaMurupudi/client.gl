import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchRequests, saveNotes } from "./store/actions";
import { Box, Button } from "@mantine/core";
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";

function EcoApproval({
  requests,
  requestsLoading,
  fetchRequests,
  saveNotes,
  user,
}) {
  const [editedUsers, setEditedUsers] = useState({});

  const [viewState, setViewState] = useState(false);

  let userName = `${user.First_Name} ${user.Last_Name}`;

  const assignees = {
    "Sumit Mahajan": {
      name: "Sumit Mahajan",
      email: "sumitm@general-label.com",
    },
    "Spencer Erie": {
      name: "Spencer Erie",
      email: "spencererie01@gmail.com",
    },
    "Bill Allen": {
      name: "Bill Allen",
      email: "bill@general-label.com",
    },
    "Mat Welch": {
      name: "Mat Welch",
      email: "mat@general-label.com",
    },
    "Scott Bohm": {
      name: "Scott Bohm",
      email: "scottb@general-label.com",
    },
    "Spencer Erie": {
      name: "Spencer Erie",
      email: "spencererie01@gmail.com",
    },
  };

  const filteredRequests = useMemo(() => {
    if (user.First_Name === "Sumit") {
      return (requests || []).filter(
        (request) => viewState || request.Status !== "Completed"
      );
    } else {
      return (requests || []).filter(
        (request) =>
          assignees[userName].email.includes(request.Assigned_To) &&
          (viewState || request.Status !== "Completed")
      );
    }
  }, [requests, userName, assignees, viewState]);

  const toggleViewState = () => {
    setViewState(!viewState);
  };

  const fetchData = async () => {
    await fetchRequests();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = useMemo(
    () => getColumns(editedUsers, setEditedUsers),
    [editedUsers]
  );

  const handleSave = async () => {
    await saveNotes(Object.values(editedUsers));
    setEditedUsers({});
  };

  return (
    <Box>
      <MantineDataTable
        title={"ECO Request Approval"}
        tableKey={`request-approval-data-table`}
        columns={columns}
        data={filteredRequests || []}
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
        fetchData={fetchData}
        hasActionColumn={true}
        enableGrouping={false}
        hasCustomActionBtn={true}
        isEditable={true}
        isEdited={Object.keys(editedUsers).length === 0}
      >
        <Button onClick={toggleViewState}>
          {viewState ? "Open Requests" : "All Requests"}
        </Button>
      </MantineDataTable>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.getIn(["user", "user"]),
  requests: state.getIn(["ecoApproval", "requests"]),
  requestsLoading: state.getIn(["ecoApproval", "requestsLoading"]),
});

export default connect(mapStateToProps, {
  fetchRequests,
  saveNotes,
})(EcoApproval);
