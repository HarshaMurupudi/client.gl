import { useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Box, Button, Text, Select, Textarea, Checkbox, Autocomplete, SimpleGrid, SegmentedControl, TextInput } from "@mantine/core";

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
  const [embossFormOpened, { open: openEmbossForm, close: closeEmbossForm }] = useDisclosure(false);

  const [editedUsers, setEditedUsers] = useState({});

  const [value, setValue] = useState("Cut");

  const columns = useMemo(
    () => getColumns(editedUsers, setEditedUsers),
    [editedUsers]
    );

  const cols = useMemo( () => {
    return value === "Cut" ? columns[0].Cut : columns[1].Emboss
  })

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

  const userName = `${user.First_Name} ${user.Last_Name}`;

  const dieForm = useForm({
    initialValues: { 
      die_number: "", 
      date: null, 
      art_number: null, 
      part_number: null,
      material: null, 
      lamination: null,
      impressions: null,
      cut_type: null,
      press: null,
      makeready: null,
      pad: "Yes",
      adhesive: null, 
      platen: null, 
      signature: null, 
      note: null },

    validate: {
      die_Number: (value) => (value === null ? 'You must enter the Die Number' : null),
      date: (value) => (value === null ? 'You must enter the Date of the run' : null),
      art_Number: (value) => (value === null ? "You must enter the Art Number" : null),
      part_number: (value) => (value === null ? "You must enter the Part Number" : null),
      material: (value) => (value === null ? 'You must select the Material' : null),
      lamination: (value) => (value === null ? 'You must select a Lamination Value' : null),
      impressions: (value) => (value === null ? 'You must enter the number of impressions' : null),
      press: (value) => (value === null ? 'You must select a Press' : null),
      makeready: (value) => (value === null ? 'You must select a Makeready value' : null),
      platen: (value) => (value === null ? 'You must enter a Platen value' : null),
      press: (value) => (value === null ? 'You must select a Press' : null),
      adhesive: (value) => (value === null ? 'You must select an Adhesive value' : null),
    },

    transformValues: (values) => ({
      "Die_Number": values.die_number, 
      "Date": values.date, 
      "Art_Number": values.art_number,
      "Part_Number": values.part_number,
      "Material": values.material, 
      "Lamination": values.lamination,
      "Impressions": values.impressions,
      "Adhesive": values.adhesive, 
      "Cut_Type": values.cut_type,
      "Press": values.press,
      "Makeready": values.makeready,
      "Pad": values.pad,
      "Platen": values.platen, 
      "Signature": values.signature, 
      "Note": values.note
    })
  });

  const embossForm = useForm({
    initialValues: { 
      die_number: "", 
      date: null, 
      art_number: null, 
      part_number: null,
      material: null, 
      ink_layers: null,
      impressions: null,
      dwell: null,
      heat: null,
      makeready: null,
      pad: "Yes",
      emboss_height: null, 
      platen: null, 
      signature: null, 
      note: null },

    validate: {
      die_Number: (value) => (value === null ? 'You must enter the Die Number' : null),
      date: (value) => (value === null ? 'You must enter the Date of the run' : null),
      art_Number: (value) => (value === null ? "You must enter the Art Number" : null),
      part_number: (value) => (value === null ? "You must enter the Part Number" : null),
      material: (value) => (value === null ? 'You must select the Material' : null),
      ink_layers: (value) => (value === null ? 'You must enter the number of Ink Layers' : null),
      impressions: (value) => (value === null ? 'You must enter the number of impressions' : null),
      dwell: (value) => (value === null ? 'You must enter a Dwell value' : null),
      makeready: (value) => (value === null ? 'You must select a Makeready value' : null),
      platen: (value) => (value === null ? 'You must enter a Platen value' : null),
      emboss_height: (value) => (value === null ? 'You must enter an Emboss Height' : null),
      heat: (value) => (value === null ? 'You must select a Heat value' : null),
    },

    transformValues: (values) => ({
      "Die_Number": values.die_number, 
      "Date": values.date, 
      "Art_Number": values.art_number,
      "Part_Number": values.part_number,
      "Material": values.material, 
      "Ink_Layers": values.ink_layers,
      "Impressions": values.impressions,
      "Dwell": values.dwell, 
      "Emboss_Height": values.emboss_height,
      "Heat": values.heat,
      "Makeready": values.makeready,
      "Pad": values.pad,
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
        size={800}
        overlayProps={{
          blur: 1,
        }}>
        <form>
          <SimpleGrid cols={2}>
            <DatePickerInput
              mb={8}
              withAsterisk
              label="Date of Run"
              placeholder="Pick Date"
              isClearable={true}
              defaultLevel="decade"
              {...dieForm.getInputProps('date')}
            />
            <Autocomplete
              withAsterisk
              mb={8}
              label="Die Number"
              placeholder="Select or Enter Die Number..."
              data={['219', '45']}
              defaultValue=""
              {...dieForm.getInputProps('die_number')}
            />
            <Select
              withAsterisk
              mb={8}
              label="Part Number"
              placeholder="Search and Select Part Number..."
              data={["test"]}
              searchable
              {...dieForm.getInputProps('part_number')}
            />
            <Select
              withAsterisk
              mb={8}
              label="Art Number"
              placeholder="Search and Select Art Number..."
              data={["test"]}
              searchable
              {...dieForm.getInputProps('art_number')}
            />
            <Select
              withAsterisk
              mb={8}
              label="Material"
              placeholder="Search and Select Material..."
              data={["test"]}
              searchable
              {...dieForm.getInputProps('material')}
            />          
            <Select
              withAsterisk
              mb={8}
              label="Lamination"
              placeholder="Select Lamination..."
              data={["Matte", "Clear"]}
              {...dieForm.getInputProps('lamination')}
            />
            <Select
              withAsterisk
              mb={8}
              label="Adhesive"
              placeholder="Select Adhesive..."
              data={["1mm","2mm"]}
              {...dieForm.getInputProps('adhesive')}
            />
            <Select
              withAsterisk
              mb={8}
              label="Cut Type"
              placeholder="Select Cut Type..."
              data={["TC","KS"]}
              {...dieForm.getInputProps('cut_type')}
            />
            <Select
              withAsterisk
              mb={8}
              label="Press"
              placeholder="Select Press..."
              data={["Thompson", "Standard", "Chandler"]}
              {...dieForm.getInputProps('press')}
            />
            <Select
              withAsterisk
              mb={8}
              label="Makeready"
              placeholder="Select Makeready..."
              data={[".05",".08"]}
              {...dieForm.getInputProps('makeready')}
            />
            <Select
              withAsterisk
              mb={8}
              label="Used Pad"
              placeholder="Select Value..."
              defaultValue={"Yes"}
              data={["Yes", "No"]}
              {...dieForm.getInputProps('pad')}
            />
            <Textarea
              mb={8}
              withAsterisk
              label="Impressions"
              placeholder="Enter Impressions..."
              autosize
              {...dieForm.getInputProps('impressions')}
            />
            <Textarea
              mb={8}
              withAsterisk
              label="Platen Set"
              placeholder="Enter Platen Set..."
              autosize
              {...dieForm.getInputProps('platen')}
            />
            <Textarea
              mb={8}
              label="Note"
              placeholder="Notes..."
              autosize
              {...dieForm.getInputProps('note')}
            />
          </SimpleGrid>
            <Button 
              type="submit"
              disabled={!dieForm.isValid()}
              // onClick={(event) => handleFormSubmit(event, dieForm, true)}
              color="red" 
              mt={16}
              mb={8} >
                Submit
            </Button>
          <Text size={12} opacity={.5}>
            Submit as {userName}
          </Text>
        </form>
      </Modal>
      <Modal
        withCloseButton
        closeOnClickOutside={false}
        closeOnEscape={false}
        opened={embossFormOpened} 
        onClose={closeEmbossForm}
        title="Emboss Entry Form"
        centered
        size={800}
        overlayProps={{
          blur: 1,
        }}>
        <form>
          <SimpleGrid cols={2}>
            <DatePickerInput
              mb={8}
              withAsterisk
              label="Date of Run"
              placeholder="Pick Date"
              isClearable={true}
              defaultLevel="decade"
              {...embossForm.getInputProps('date')}
            />
            <Autocomplete
              withAsterisk
              mb={8}
              label="Die Number"
              placeholder="Select or Enter Die Number..."
              data={['219', '45']}
              defaultValue=""
              {...embossForm.getInputProps('die_number')}
            />
            <Select
              withAsterisk
              mb={8}
              label="Part Number"
              placeholder="Search and Select Part Number..."
              data={["test"]}
              searchable
              {...embossForm.getInputProps('part_number')}
            />
            <Select
              withAsterisk
              mb={8}
              label="Art Number"
              placeholder="Search and Select Art Number..."
              data={["test"]}
              searchable
              {...embossForm.getInputProps('art_number')}
            />
            <Select
              withAsterisk
              mb={8}
              label="Material"
              placeholder="Search and Select Material..."
              data={["test"]}
              searchable
              {...embossForm.getInputProps('material')}
            />
            <Select
              withAsterisk
              mb={8}
              label="Heat"
              placeholder="Select Heat..."
              defaultValue={"No"}
              data={["Yes","No"]}
              {...embossForm.getInputProps('heat')}
            />
            <Select
              withAsterisk
              mb={8}
              label="Makeready"
              placeholder="Select Makeready..."
              data={[".05",".08"]}
              {...embossForm.getInputProps('makeready')}
            />
            <Select
              withAsterisk
              mb={8}
              label="Used Pad"
              placeholder="Select Value..."
              defaultValue={"Yes"}
              data={["Yes", "No"]}
              {...embossForm.getInputProps('pad')}
            />
            <Textarea
              withAsterisk
              mb={8}
              label="Ink Layers"
              placeholder="Enter Number of Layers..."
              autosize
              {...embossForm.getInputProps('ink_layers')}
            />
            <Textarea
              withAsterisk
              mb={8}
              label="Dwell"
              placeholder="Enter Dwell Value..."
              autosize
              {...embossForm.getInputProps('dwell')}
            />
            <Textarea
              withAsterisk
              mb={8}
              label="Emboss Height"
              placeholder="Enter Emboss Height..."
              autosize
              {...embossForm.getInputProps('emboss_height')}
            />
            <Textarea
              mb={8}
              withAsterisk
              label="Impressions"
              placeholder="Enter Impressions..."
              autosize
              {...embossForm.getInputProps('impressions')}
            />
            <Textarea
              mb={8}
              withAsterisk
              label="Platen Set"
              placeholder="Enter Platen Set..."
              autosize
              {...embossForm.getInputProps('platen')}
            />
            <Textarea
              mb={8}
              label="Note"
              placeholder="Notes..."
              autosize
              {...embossForm.getInputProps('note')}
            />
          </SimpleGrid>
            <Button 
              type="submit"
              disabled={!embossForm.isValid()}
              // onClick={(event) => handleFormSubmit(event, embossForm, true)}
              color="red" 
              mt={16}
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
        columns={cols}
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
          <SegmentedControl mr={16}
            data = {[
              {
                value: "Cut",
                label: "Cut"
              },
              {
                value: "Emboss",
                label: "Emboss"
              }
            ]}
            value={value}
            onChange={setValue}
          />
          <Button radius={0} mr={-1} onClick={openDieForm} variant="outline" mt={1.5}>
              Enter Die Cut
          </Button>
          <Button radius={0} onClick={openEmbossForm} variant="outline" mt={1.5}>
            Enter Emboss
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