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
  user
}) {
  const [editedUsers, setEditedUsers] = useState({});

  const [viewState, setViewState] = useState(false);

  let userName = `${user.First_Name} ${user.Last_Name}`;

  const assignees = {
    "Sumit Mahajan": {
      name: "Sumit Mahajan",
      email: "sumitm@general-label.com"
    },
    "Dalton Breitzman": {
      name: "Dalton Breitzman",
      email: "daltonb@general-label.com"
    },
    "Lyn Erie": {
      name: "Lyn Erie",
      email: "lyn@general-label.com"
    },
    "Tracey Trudeau": {
      name: "Tracey Trudeau",
      email: "tracey@general-label.com"
    },
    "Thy Suon": {
      name: "Thy Suon",
      email: "thy@general-label.com"
    },
    "Jason Mezzenga": {
      name: "Jason Mezzenga",
      email: "jason@gmail.com"
    }
  };
  
  const filteredRequests = useMemo(() => {
    return requests.filter(request =>
      (viewState || request.Status !== "Completed"))
  }, [requests, viewState]);

  const toggleViewState = () => {
    setViewState(!viewState);
  }

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
  user: state.getIn(["user","user"]),
  requests: state.getIn(["requests", "requests"]),
  requestsLoading: state.getIn(["requests", "requestsLoading"]),
});

export default connect(mapStateToProps, {
  fetchRequests,
  saveNotes,
})(EcoApproval);
