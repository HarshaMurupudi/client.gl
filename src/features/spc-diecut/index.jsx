import { useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Box, Button, Text, Select, MultiSelect, Textarea, Checkbox, Autocomplete } from "@mantine/core";

import { fetchAttendance, saveNotes } from "./store/actions"
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";
import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
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
  const userName = `${user.First_Name} ${user.Last_Name}`;

  const dieForm = useForm({
    initialValues: { die_number: null, date: null, art_number: null, material: null, lamination: null, adhesive: null, platen: null, signature: null, note: null },

    validate: {
      Die_Number: (value) => (value === null ? 'You must enter the Die Number' : null),
      date: (value) => (value === null ? 'You must enter the Date of the run' : null),
      Art_Number: (value) => (value === null ? "You must enter the Art Number" : null),
      Material: (value) => (value === null ? 'You must select the Material' : null),
    },

    transformValues: (values) => ({
      "Die_Number": values.die_number, 
      "Date": values.date, 
      "Art_Number": values.art_number, 
      "Material": values.material, 
      "Lamination": values.lamination, 
      "Adhesive": values.adhesive, 
      "Platen": values.platen, 
      "Signature": values.signature, 
      "Note": values.note
    })
  });

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
        <form>
          <DatePickerInput
            mb={16}
            label="Date of Run"
            placeholder="Pick Date"
            isClearable={true}
            defaultLevel="decade"
            {...dieForm.getInputProps('date')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Die Number"
            placeholder="Select or Enter Die Number..."
            data={["test"]}
            {...dieForm.getInputProps('die_number')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Art Number"
            placeholder="Search and Select Art Number..."
            data={["test"]}
            searchable
            {...dieForm.getInputProps('art_number')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Material"
            placeholder="Search and Select Material..."
            data={["test"]}
            searchable
            {...dieForm.getInputProps('material')}
          />          
          <Select
            withAsterisk
            mb={16}
            label="Lamination"
            placeholder="Select Lamination..."
            data={["test"]}
            {...dieForm.getInputProps('lamination')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Adhesive"
            placeholder="Select Adhesive..."
            data={["test"]}
            {...dieForm.getInputProps('adhesive')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Cut Type"
            placeholder="Select Cut Type..."
            data={["test"]}
            {...dieForm.getInputProps('cut_type')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Press"
            placeholder="Select Press..."
            data={["test"]}
            {...dieForm.getInputProps('press')}
          />
          <Textarea
            label="Platen Set"
            placeholder="Enter Platen Set..."
            autosize
            {...dieForm.getInputProps('platen')}
          />
          <Textarea
            label="Note"
            placeholder="Notes..."
            autosize
            {...dieForm.getInputProps('note')}
          />
            <Button 
              type="submit"
              disabled={!dieForm.isValid()}
              // onClick={(event) => handleFormSubmit(event, dieForm, true)}
              color="red" 
              mt={32}
              mb={8} >
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
