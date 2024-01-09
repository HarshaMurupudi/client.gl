import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";

import { fetchVacation, saveNotes } from "./store/actions";
import { Box, Button } from "@mantine/core";
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";

function VacationApproval({
  vacations,
  vacationLoading,
  fetchVacation,
  saveNotes,
  user
}) {
  const [editedUsers, setEditedUsers] = useState({});

  const [viewState, setViewState] = useState(false);

  let userName = `${user.First_Name} ${user.Last_Name}`;
  
  const filteredRequests = useMemo(() => {
      return (vacations || []).filter(
        (vacation) =>
          (viewState || vacation.Status === "New" || vacation.Status === "Pending")
      );
  }, [vacations, viewState]);

  const toggleViewState = () => {
    setViewState(!viewState);
  }

  const fetchData = async () => {
    await fetchVacation();
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
        title={"Vacation Request Approval"}
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
        loading={vacationLoading}
        hasRefetch={true}
        fetchData={fetchData}
        hasActionColumn={false}
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
  vacations: state.getIn(["vacationApproval", "vacations"]),
  vacationLoading: state.getIn(["vacationApproval", "vacationLoading"]),
});

export default connect(mapStateToProps, {
  fetchVacation,
  saveNotes,
})(VacationApproval);
