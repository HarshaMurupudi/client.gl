import { useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { Select, Textarea } from "react-hook-form-mantine";


import { fetchAttendance, saveNotes } from "./store/actions"
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";
import { Modal } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";

function DieCutSPC({
  user,
  saveNotes,
  attendance,
  fetchAttendance,
  attendanceLoading,
}) {
  const [dieFormOpened, { open: openDieForm, close: closeDieForm }] = useDisclosure(false);
  const { register, handleSubmit, watch, formState: { errors }, control } = useForm();

  const [editedUsers, setEditedUsers] = useState({});

  const columns = useMemo(
    () => getColumns(editedUsers, setEditedUsers),
    [editedUsers]
  );

  const handleSaveUsers = async () => {
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
  const userName = `${user.First_Name} ${user.Last_Name}`;

  const transformValues = (data) => {
    // "Die_Number": data.die_number,
    // "Date": data.date,
    // "Art_Number": data.art_number,
    // "Material": data.material,
    // "Lamination": data.lamination,
    // "Adhesive": data.adhesive,
    // "Platen": data.platen,
    // "Pad": data.pad,
    // "Bears": data.bears,
    // "Makeready": data.makeready,
    // "Signature": userName,
    // "Note": data.note
    console.log(data)
  }
  
  const isValid = (data) => {
    const requiredFields = [
      "Die_Number",
      "Date",
      "Art_Number",
      "Material",
      "Lamination",
      "Adhesive",
      "Platen",
      "Pad",
      "Bears",
      "Makeready",
    ];
    for (const field of requiredFields) {
      if (data[field] === null || data[field] === undefined || data[field] === "") {
        return false;
      }
    }
    return true;
  };

  const onSubmit = (data) => {
    data = transformValues(data);
    console.log(data);
    if (isValid(data)) {
      // handleSaveUsers(data);
      closeDieForm(); // Close the modal after submitting
    } else {
      notifications.show({
        title: "Error",
        message: "Invalid form data. Please fill in all required fields.",
        color: "red",
      });
    }
  };

  return (
    <Box>
      <Modal
        withCloseButton
        closeOnClickOutside={false}
        closeOnEscape={false}
        opened={dieFormOpened}
        onClose={closeDieForm}
        title="Die Cut Entry Form"
        centered
        overlayProps={{
          blur: 1,
        }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DatePickerInput
            withAsterisk
            mb={8}
            label="Date of Run"
            placeholder="Pick Date"
            isClearable={true}
            defaultLevel="decade"
            control={control}
          />
          <Select
            withAsterisk
            mb={8}
            label="Die Number"
            placeholder="Select or Enter Die Number..."
            data={["219", "45"]}
            control={control}
          />
          <Select
            withAsterisk
            mb={8}
            label="Art Number"
            placeholder="Search and Select Art Number..."
            data={["9845", "512"]}
            searchable
            control={control}
          />
          <Select
            withAsterisk
            mb={8}
            label="Material"
            placeholder="Search and Select Material..."
            data={["123123", "456456"]}
            searchable
            control={control}
          />          
          <Select
            withAsterisk
            mb={8}
            label="Lamination"
            placeholder="Select Lamination..."
            data={["Yes", "No"]}
            control={control}
          />
          <Select
            withAsterisk
            mb={8}
            label="Adhesive"
            placeholder="Select Adhesive..."
            data={["Yes", "No"]}
            control={control}
          />
          <Select
            withAsterisk
            mb={8}
            label="Cut Type"
            placeholder="Select Cut Type..."
            data={["TC", "KS"]}
            control={control}
          />
          <Select
            withAsterisk
            mb={8}
            label="Press"
            placeholder="Select Press..."
            data={["Thompson", "Standard", "Chandler"]}
            control={control}
          />
          <Textarea
            withAsterisk
            label="Platen Set"
            mb={8}
            placeholder="Enter Platen Set..."
            autosize
            control={control}
          />
          <Textarea
            label="Note"
            mb={8}
            placeholder="Notes..."
            autosize
            control={control}
          />
          <Button
            type="submit"
            onClick={onSubmit}
            mt={16}
            mb={8}>
            Submit
          </Button>
          <Text size={12} opacity={.5}>
            Submit as {userName}
          </Text>
        </form>
      </Modal>
      <MantineDataTable
        title={"Die Cutting SPC"}
        tableKey={`attendance-data-table`}
        fetchData={fetchData}
        columns={columns}
        data={attendance || []}
        tableProps={{
          editDisplayMode: "table",
          enableEditing: true,
          getRowId: (row, index) => `${row.Die_ID}_${index}`,
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
        getRowId={original => original.Die_ID}
        enableExpanding={true}
      >
        <Box display={"flex"}>
          <Button onClick={openDieForm} variant="filled">
              Enter Die Cut
            </Button>
        </Box>
      </MantineDataTable>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.getIn(["user", "user"]),
  attendance: state.getIn(["attendance", "attendance"]),
  attendanceLoading: state.getIn(["attendance", "attendanceLoading"]),
});

export default connect(mapStateToProps, {
  fetchAttendance,
  saveNotes,
})(DieCutSPC);
