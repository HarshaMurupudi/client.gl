import { useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Box, Text, Button, Modal, LoadingOverlay } from "@mantine/core";

import { fetchAttendance, saveNotes } from "./store/actions";
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";

function Attendance({
  saveNotes,
  attendance,
  fetchAttendance,
  attendanceLoading,
}) {
  const [editedUsers, setEditedUsers] = useState({});

  const columns = useMemo(
    () => getColumns(editedUsers, setEditedUsers),
    [editedUsers]
    );

  const handleSaveUsers = async (e, table) => {
    await saveNotes(Object.values(editedUsers));
    setEditedUsers({});
  };

  const fetchData = async () => {
    await fetchAttendance();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const today = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = mm + '/' + dd + '/' + yyyy;
    return formattedToday;
  }

  return (
    <Box>
      <Box>
        <MantineDataTable
          title={"Attendance"}
          tableKey={`attendance-data-table`}
          fetchData={fetchData}
          columns={columns}
          data={attendance || []}
          tableProps={{
            editDisplayMode: "table",
            enableEditing: true,
            getRowId: (row, index) => `${row.Attendance_Note_ID}_${index}`,
          }}
          initialState={{
            sorting: [{ id: "First_Name", desc: false }],
          }}
          handleSave={handleSaveUsers}
          loading={attendanceLoading}
          hasRefetch={true}
          hasCustomActionBtn={true}
          hasActionColumn={false}
          isEditable={true}
          isEdited={Object.keys(editedUsers).length === 0}
          editedUsers={editedUsers}
          enableGrouping={true}
        >
          <Box display={"flex"}>
            <Text fz="md" fw={400} mr={16}>
              {today()}
            </Text>
          </Box>
        </MantineDataTable>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  attendance: state.getIn(["attendance", "attendance"]),
  attendanceLoading: state.getIn(["attendance", "attendanceLoading"]),
});

export default connect(mapStateToProps, {
  fetchAttendance,
  saveNotes,
})(Attendance);
