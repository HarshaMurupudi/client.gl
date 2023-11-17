import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { Box, Skeleton, Text, Flex, Button } from "@mantine/core";

import { fetchMeetings, saveNotes, addNewRow } from "./store/actions";
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns, formatDate } from "./columns";

function Meetings({
  meeting,
  meetingsLoading,
  fetchMeetings,
  saveNotes,
  addNewRow,
  user,
}) {

  const [editedUsers, setEditedUsers] = useState({});

  const columns = useMemo(
    () => getColumns(editedUsers, setEditedUsers, meeting),
    [editedUsers, meeting],
  );

  const fetchData = async () => {
    await fetchMeetings();
  };

  const createNewRow = async () => {
    await addNewRow();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveUsers = async (e, table) => {
    await saveNotes(Object.values(editedUsers));
    setEditedUsers({});
  };

  const canEdit = () => {
    const { Employee } = user;
    const employeeList = ["51040"];
    return employeeList.includes(Employee) ? true : false;
  };

  return (
    <Box mt={16}>
      {/* <Skeleton visible={meetingsLoading} mt={16}> */}
      <Box>
        <MantineDataTable
          title={"Production Meeting"}
          tableKey={`production-meeting-data-table`}
          columns={columns}
          fetchData={fetchData}
          data={meeting || []}
          initialState={{
            sorting: [{ id: "Date", desc: true }],
          }}
          tableProps={{
            editDisplayMode: "table",
            enableEditing: true,
            getRowId: (row, index) => `${row.Meeting_Note_ID}_${index}`,
          }}
          loading={meetingsLoading}
          hasRefetch={true}
          hasActionColumn={false}
          enableGrouping={false}
          isEditable={canEdit()}
          isEdited={Object.keys(editedUsers).length === 0}
          handleSave={handleSaveUsers}
          hasCustomActionBtn={true}
        >
          <Button onClick={createNewRow} variant="filled">
            New Note
          </Button>
        </MantineDataTable>
      </Box>
      {/* </Skeleton> */}
    </Box>
  );
}

const mapStateToProps = (state) => ({
  meeting: state.getIn(["meeting", "meetings"]),
  meetingsLoading: state.getIn(["meetings", "meetingsLoading"]),
  user: state.getIn(["user","user"]),
});

export default connect(mapStateToProps, {
  fetchMeetings,
  saveNotes,
  addNewRow,
})(Meetings);
