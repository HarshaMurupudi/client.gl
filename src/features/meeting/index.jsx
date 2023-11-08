import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { Box, Skeleton, Text, Flex, Button } from "@mantine/core";

import { fetchMeetings, saveNotes } from "./store/actions";
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns, formatDate } from "./columns";

function Meetings({
  meeting,
  meetingsLoading,
  fetchMeetings,
  saveNotes,
}) {

  const [editedUsers, setEditedUsers] = useState({});

  const columns = useMemo(
    () => getColumns(editedUsers, setEditedUsers, meeting),
    [editedUsers, meeting]
  );
  const fetchData = async () => {
    await fetchMeetings();
  };

  // const createNewRow = (meeting) => {
  //   const newID = meeting[meeting.length - 1];
  //   const newRow = {
  //     Meeting_Note_ID: newID,
  //     Description: null,
  //     Date: Date.now(),
  //     Meeting_Note: null,
  //   };

  //   setEditedUsers((prevEditedUsers) => {
  //     return {
  //       ...prevEditedUsers,
  //       [`new_${Date.now()}`]: newRow,
  //     };
  //   });
  //   console.log(newRow);
  // };

  useEffect(() => {
    fetchData();
  }, []);

  // let meetingTest =
  //   {
  //   "Meeting_Note_ID": null,
  //   "Description": null,
  //   "Date": null,
  //   "Meeting_Note": null
  //   };

  // const newRow = async (meeting) => {
  //   await meeting.push(meetingTest);
  // }

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
          data={meeting || []}
          tableProps={{
            editDisplayMode: "table",
            enableEditing: true,
            getRowId: (row, index) => `${row.Job}_${index}`,
          }}
          loading={meetingsLoading}
          hasRefetch={true}
          fetchData={fetchData}
          hasActionColumn={true}
          enableGrouping={false}
          isEditable={true}
          isEdited={Object.keys(editedUsers).length === 0}
          handleSave={handleSaveUsers}
          hasCustomActionBtn={true}
        >
          <Button variant="filled">
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
})(Meetings);
