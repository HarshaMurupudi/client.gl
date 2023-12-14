import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchApproval, saveNotes } from "./store/actions";
import { Box } from "@mantine/core";
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
    if (approval) {
      return approval.filter(app =>
        currentUserTypes.includes(app.Request_Type) && app.Status !== "Reject"
      );
    } else {
      return [];
    }
  }, [approval, currentUserTypes]);


  const fetchData = async () => {
    await fetchApproval();
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
  approval: state.getIn(["approval", "approval"]),
  approvalLoading: state.getIn(["approval", "approvalLoading"]),
});

export default connect(mapStateToProps, {
  fetchApproval,
  saveNotes,
})(RequestApproval);
