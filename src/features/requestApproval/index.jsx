import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchApproval, saveNotes } from "./store/actions";
import { Box, Button } from "@mantine/core";
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";

function RequestApproval({
  approval,
  approvalLoading,
  fetchApproval,
  saveNotes,
  user
}) {
  const [editedUsers, setEditedUsers] = useState({});
  const [showApproved, setShowApproved] = useState(false);

  const userName = `${user.First_Name} ${user.Last_Name}`;

  const assignedApprovers = {
    "Sumit Mahajan": ["shop", "eco", "improvement", "maintenance", "safety"],
    "Jon Erie": ["shop"],
    "Jason Mezzenga": ["maintenance", "safety"],
    "Nate Baskfield": ["improvement", "safety"],
    "Susan Baskfield" : ["safety"],
    "Bill Allen": ["eco"],
    "Mat Welch": ["eco"],
    "Scott Bohm": ["eco"],
  };
  
  const currentUserTypes = assignedApprovers[userName] || [];

  const filteredRequests = useMemo(() => {
    if (approval) {
      return approval.filter(
        (app) =>
          currentUserTypes.includes(app.Request_Type) &&
          app.Status !== "Reject" &&
          (showApproved || app.Status !== "Completed")
      );
    } else {
      return [];
    }
  }, [approval, currentUserTypes, showApproved]);


  const fetchData = async () => {
    await fetchApproval();
  };

  useEffect(() => {
    fetchData();
  }, [showApproved]);

  const columns = useMemo(
    () =>
      getColumns(
        editedUsers,
        setEditedUsers,
        userName,
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
        loading={approvalLoading}
        hasRefetch={true}
        fetchData={fetchData}
        hasActionColumn={true}
        enableGrouping={false}
        hasCustomActionBtn={true}
        isEditable={true}
        isEdited={Object.keys(editedUsers).length === 0}
      >
        <Button onClick={() => setShowApproved(!showApproved)}>
          {showApproved ? "Open Requests" : "All Requests"}
        </Button>
      </MantineDataTable>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.getIn(["user","user"]),
  approval: state.getIn(["approval", "approval"]),
  approvalLoading: state.getIn(["approval", "approvalLoading"]),
});

export default connect(mapStateToProps, {
  fetchApproval,
  saveNotes,
})(RequestApproval);
