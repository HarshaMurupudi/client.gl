import { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { Box, Select, MultiSelect, Button, Modal, Textarea, Text, Checkbox } from "@mantine/core";
import { MantineDataTable } from "../../components/mantine-data-table";
import { useForm } from "@mantine/form";
import { 
  fetchTraining, 
  saveNotes,
  addNewRow
  } from "./store/actions";
import { 
  fetchTrainingLog, 
  saveLogNotes,
  addNewLogRow
  } from "./trainingLogStore/actions";
import { getTrainingColumns, getLogColumns } from "./columns";
import { delay } from "../../utils";
import { DatePickerInput } from "@mantine/dates";

function Training({
  trainingLogLoading,
  trainingLoading,
  fetchTrainingLog,
  fetchTraining,
  saveLogNotes,
  saveNotes,
  trainingLog,
  training,
  user,
}) {
  const [editedUsers, setEditedUsers] = useState({});

  const [masterTrainingOpened, { open: openMasterTraining, close: closeMasterTraining }] = useDisclosure(false);

  const [employeeTrainingOpened, { open: openEmployeeTraining, close: closeEmployeeTraining }] = useDisclosure(false);

  const trainingColumns = useMemo(
    () => getTrainingColumns(editedUsers, setEditedUsers, training, trainingLog, trainingLogLoading),
    [editedUsers, training, trainingLog, trainingLogLoading],
  );

  const employeeColumns = useMemo(
    () => getLogColumns(editedUsers, setEditedUsers, training, trainingLog, trainingLogLoading),
    [editedUsers, training, trainingLog, trainingLogLoading],
  );

  const fetchPageData = async () => {
    await fetchTraining();
    await fetchTrainingLog();
  };

  const createNewRow = async () => {
    await addNewRow();
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const handleSaveUsers = async (e, table) => {
    await saveNotes(Object.values(editedUsers));
    setEditedUsers({});
  };

  const canEdit = () => {
    const { employee } = user;
    const employeeList = ["51040", "Spencer Erie"];
    return employeeList.includes(employee) ? true : false;
  };

  const employees = ["Spencer Erie", "Sumit Mahajan"];

  const trainees = [
    { value: 'all', label: 'All Employees', group: 'Departments'},
    { value: 'circuits', label: 'Circuits', group: 'Departments'},
    { value: 'printing', label: 'Printing', group: 'Departments'},
    { value: 'screens', label: 'Screens', group: 'Departments'},
    { value: 'sales', label: 'Sales', group: 'Departments'},
    { value: 'shipping', label: 'Shipping', group: 'Departments'},
    ...employees.map(employee => ({ value: employee, label: employee, group: 'Employees' })),
  ];

  const trainers = ["Spencer Erie"]

  const types = ["Safety", "Press", "Misc."];

  const trainingTitles = ["Photoshop", "Laser", "Shipping Standards"];

  const handleFormSubmit = async (form) => {
    const data = [form.getTransformedValues()];
    if (form === masterForm) {
      await saveNotes(data);
    } else {
      await saveLogNotes(data);
    }
    form.reset();
    fetchPageData();
  };

  const masterForm = useForm({
    initialValues: {date: null, trainer: null, trainingDesc: null, trainingTitle: null, trainingType: null, needsRepeat: null, repeatAfter: null, trainees: null},

    validate: {
      trainer: (value) => (value === null ? "You must enter the trainer's name" : null),
      trainingTitle: (value) => (value === null ? 'You must enter a training title' : null),
      trainingType: (value) => (value === null ? 'You must enter a training type' : null),
      trainingDesc: (value) => (value === null ? 'You must enter a training description' : null),
    },

    transformValues: (values) => (
      {"Trainer": value.trainer, "Training_Description": values.trainingDesc, "Training_Title": values.trainingTitle, "Training_Type": values.trainingType}
    )
  });

  const logForm = useForm({
    initialValues: {date: null, trainer: null, trainingTitle: null, trainingDesc: null, trainingType: null, needsRepeat: null, repeatAfter: null, trainees: null},

    validate: {
      date: (value) => (value === null ? 'You must enter a training date' : null),
      trainer: (value) => (value === null ? "You must enter the trainer's name" : null),
      trainingTitle: (value) => (value === null ? 'You must select a training title' : null),
      trainees: (value) => (value === null ? 'You must select the trainees' : null),
    },

    transformValues: (values) => (
      {"Date": values.date, "Trainer": values.trainer, "Training_Description": values.trainingDesc, "Training_Title": values.trainingTitle, "Needs_Repeat": values.needsRepeat, "Repeat_After": values.repeatAfter, "Trainees": values.trainees}
    )
  });

  const userName = ( user.First_Name + " " + user.Last_Name );

  return (
    <Box>
      <Modal
        withCloseButton
        closeOnClickOutside={false}
        closeOnEscape={false}
        opened={masterTrainingOpened} 
        onClose={closeMasterTraining} 
        title="New Training Form"
        centered
        overlayProps={{
          blur: 1,
        }}>
        <form onSubmit={masterForm.onSubmit(handleFormSubmit(masterForm))}>
          <Textarea
            withAsterisk
            mb={16}
            label="Enter the Trainer's Name"
            placeholder="Trainer"
            autosize
            {...masterForm.getInputProps('trainer')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Enter the Training Title"
            placeholder="Training Title"
            autosize
            {...masterForm.getInputProps('trainingTitle')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Training Type"
            placeholder="Training Type"
            data={(types || []).map((type) => ({ value: type, label: type }))}
            {...masterForm.getInputProps('trainingType')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Training Description"
            placeholder="Description..."
            {...masterForm.getInputProps('trainingDesc')}
          />
            <Button 
              type="submit"
              disabled={!masterForm.isValid()}
              onClick={close}
              color="red" 
              mb={8} >
                Submit
            </Button>
          <Text size={12} opacity={.5}>
            Submit as {userName}
          </Text>
        </form>
      </Modal>
      <Box
        mb={16}
      >
        <MantineDataTable
          title={"Master Training"}
          tableKey={`employee-training-data-table`}
          fetchData={fetchPageData}
          columns={trainingColumns}
          data={training || []}
          tableProps={{
            editDisplayMode: "table",
            enableEditing: true,
            getRowId: (row, index) => `${row.Training_ID}_${index}`,
          }}
          loading={trainingLoading}
          hasRefetch={true}
          hasActionColumn={false}
          enableGrouping={false}
          isEditable={true}
          isEdited={Object.keys(editedUsers).length === 0}
          handleSave={handleSaveUsers}
          hasCustomActionBtn={true}
        >
          <Box display={"flex"}>
            <Button onClick={openMasterTraining} variant="filled">
              New Training
            </Button>
          </Box>
        </MantineDataTable>
      </Box>
      <Modal
        withCloseButton
        closeOnClickOutside={false}
        closeOnEscape={false}
        opened={employeeTrainingOpened} 
        onClose={closeEmployeeTraining} 
        title="Training Entry Form"
        centered
        overlayProps={{
          blur: 1,
        }}>
        <form onSubmit={logForm.onSubmit(handleFormSubmit(logForm))}>
          <DatePickerInput
            label="Date of Completion"
            placeholder="Pick Date"
            isClearable={true}
            {...logForm.getInputProps('date')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select the Trainer"
            placeholder="Training Name"
            data={(trainers || []).map((type) => ({ value: type, label: type }))}
            {...logForm.getInputProps('trainer')}
          />          
          <MultiSelect
            withAsterisk
            mb={16}
            label="Select the trained employee(s)"
            placeholder="Employee(s)"
            data={trainees}
            {...logForm.getInputProps('trainees')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select the Training"
            placeholder="Training Title"
            data={(trainingTitles || []).map((type) => ({ value: type, label: type }))}
            {...logForm.getInputProps('trainingTitle')}
          />
          <Textarea
            withAsterisk
            mb={32}
            label="Training Description"
            placeholder="Description..."
            {...logForm.getInputProps('trainingDesc')}
          />
          <Checkbox
            mb={8}
            withAsterisk
            label="Will this need to be repeated?"
            {...masterForm.getInputProps('needsRepeat')}
          />
          <Textarea
            autosize
            label="If so, Enter When"
            placeholder="Repeat Duration..."
            {...logForm.getInputProps('repeatAfter')}
          />
            <Button 
              type="submit"
              disabled={!logForm.isValid()}
              onClick={close}
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
      <Box>
        <MantineDataTable
          title={"Employee Training"}
          tableKey={`employee-training-data-table`}
          fetchData={fetchPageData}
          columns={employeeColumns}
          data={trainingLog || []}
          tableProps={{
            editDisplayMode: "table",
            enableEditing: true,
            getRowId: (row, index) => `${row.Training_ID}_${index}`,
          }}
          loading={trainingLogLoading}
          hasRefetch={true}
          hasActionColumn={false}
          enableGrouping={false}
          isEditable={true}
          isEdited={Object.keys(editedUsers).length === 0}
          handleSave={handleSaveUsers}
          hasCustomActionBtn={true}
        >
          <Box display={"flex"}>
            <Button onClick={openEmployeeTraining} variant="filled">
              Enter Training
            </Button>
          </Box>
        </MantineDataTable>
      </Box>
    </Box>

    
  );
}

const mapStateToProps = (state) => ({
  training: state.getIn(["training", "training"]),
  trainingLog: state.getIn(["trainingLog", "trainingLog"]),
  trainingLoading: state.getIn(["training", "trainingLoading"]),
  trainingLogLoading: state.getIn(["trainingLog", "trainingLogLoading"]),
  user: state.getIn(["user","user"]),
});

export default connect(mapStateToProps, {
  fetchTrainingLog,
  fetchTraining,
  saveNotes,
})(Training);