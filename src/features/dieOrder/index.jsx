import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchDie, saveNotes } from "./store/actions";
import { Box, Button } from "@mantine/core";
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";

function DieOrder({
  die,
  dieLoading,
  fetchDie,
  saveNotes,
  user
}) {
  const [editedUsers, setEditedUsers] = useState({});
  const [showApproved, setShowApproved] = useState(false);

  const userName = `${user.First_Name} ${user.Last_Name}`;

  const assignedApprovers = {
    "Sumit Mahajan": ["shop", "improvement", "maintenance", "safety"],
    "Jon Erie": ["shop", "improvement", "maintenance", "safety"],
    "Jason Mezzenga": ["maintenance", "safety"],
    "Nate Baskfield": ["improvement", "shop"],
    "Susan Baskfield" : ["safety"],
    "Lyn Erie" : ["safety"]
  };
  
  const currentUserTypes = assignedApprovers[userName] || [];

  const filteredRequests = useMemo(() => {
    if (die) {
      return die.filter(
        (app) =>
          currentUserTypes.includes(app.Request_Type) &&
          app.Status !== "Reject" &&
          (showApproved || app.Status !== "Completed")
      );
    } else {
      return [];
    }
  }, [die, currentUserTypes, showApproved]);


  const fetchData = async () => {
    await fetchDie();
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
        data={die || []}
        tableProps={{
          editDisplayMode: "table",
          enableEditing: true,
          getRowId: (row, index) => `${row.Request_ID}_${index}`,
        }}
        initialState={{
          sorting: [
            { id: "Tool_ID", desc: true },
          ],
        }}
        handleSave={handleSave}
        loading={dieLoading}
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
  die: state.getIn(["dieOrder", "die"]),
  dieLoading: state.getIn(["die", "dieLoading"]),
});

export default connect(mapStateToProps, {
  fetchDie,
  saveNotes,
})(DieOrder);
