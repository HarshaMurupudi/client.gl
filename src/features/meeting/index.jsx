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
    // const newRow = {
    //   Meeting_Note_ID: null,
    //   Description: null,
    //   Date: Date.now(),
    //   Meeting_Note: null,
    // };

    // setEditedUsers((prevEditedUsers) => {
    //   return {
    //     ...prevEditedUsers,
    //     [`new_${Date.now()}`]: newRow,
    //   };
    // });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveUsers = async (e, table) => {
    await saveNotes(Object.values(editedUsers));
    setEditedUsers({});
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
          hasActionColumn={true}
          enableGrouping={false}
          isEditable={true}
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
});

export default connect(mapStateToProps, {
  fetchMeetings,
  saveNotes,
  addNewRow,
})(Meetings);
