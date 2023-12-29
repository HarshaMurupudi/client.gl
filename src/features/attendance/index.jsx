import { useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Box, Text, Button, Modal, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { fetchAttendance, saveNotes } from "./store/actions";
import { fetchEvents } from "../calendar/store/actions";
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import '../calendar/store/react-big-calendar.css';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function Attendance({
  saveNotes,
  attendance,
  fetchAttendance,
  attendanceLoading,
  fetchEvents,
  events
}) {
  const [editedUsers, setEditedUsers] = useState({});

  const [calendarOpened, { open: openCalendar, close: closeCalendar }] = useDisclosure(false);
  const [eventsLoading, setEventsLoading] = useState(true);

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
    setEventsLoading(true);
    await fetchEvents();
    setEventsLoading(false);
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
      <Modal
      withCloseButton={false}
      closeOnClickOutside={true}
      opened={calendarOpened}
      onClose={closeCalendar}
      // title="Employee Calendar"
      centered
      overlayProps={{
        blur: 2,
      }}
      size={"100%"}
      // fullScreen
      >
        <LoadingOverlay
          visible={eventsLoading}
          zIndex={1000}
          overlayprops={{ radius: "sm", blur: 2 }}
        />
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 800 }}
          />
      </Modal>
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
            sorting: [{ id: "Login", desc: false }],
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
            <Text fz="md" fw={400} mr={16} mt={6}>
              {today()}
            </Text>
            <Button onClick={openCalendar} variant="filled">
              Calendar
            </Button>
          </Box>
        </MantineDataTable>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  attendance: state.getIn(["attendance", "attendance"]),
  events: state.getIn(["event", "events"]),
  attendanceLoading: state.getIn(["attendance", "attendanceLoading"]),
});

export default connect(mapStateToProps, {
  fetchAttendance,
  saveNotes,
  fetchEvents
})(Attendance);
