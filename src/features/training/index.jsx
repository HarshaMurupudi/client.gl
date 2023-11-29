import { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { Box, Select, MultiSelect, Button, Modal, Textarea, Text, Checkbox } from "@mantine/core";
import { MantineDataTable } from "../../components/mantine-data-table";
import { useForm } from "@mantine/form";
import { 
  fetchTraining, 
  saveNotes,
  addNewRow,
  fetchEmployees,
  fetchTrainingLog,
  saveLogNotes,
  addNewLogRow
  } from "./store/actions";
import { getTrainingColumns, getLogColumns } from "./columns";
import { delay } from "../../utils";
import { DatePickerInput } from "@mantine/dates";

function Training({
  trainingLogLoading,
  trainingLoading,
  fetchTrainingLog,
  fetchTraining,
  fetchEmployees,
  saveNotes,
  saveLogNotes,
  trainingLog,
  training,
  employees,
  user,
}) {
  const [editedUsers, setEditedUsers] = useState({});

  const [masterTrainingOpened, { open: openMasterTraining, close: closeMasterTraining }] = useDisclosure(false);

  const [employeeTrainingOpened, { open: openEmployeeTraining, close: closeEmployeeTraining }] = useDisclosure(false);

  const trainingColumns = useMemo(
    () => getTrainingColumns(editedUsers, setEditedUsers),
    [editedUsers, setEditedUsers],
  );

  const employeeColumns = useMemo(
    () => getLogColumns(editedUsers, setEditedUsers),
    [editedUsers, setEditedUsers],
  );

  const fetchPageData = async () => {
    await fetchTraining();
    await fetchTrainingLog();
    await fetchEmployees();
    };

  const createNewRow = async () => {
    await addNewRow();
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const handleSaveUsers = async () => {
    await saveNotes(Object.values(editedUsers));
    // await saveLogNotes(Object.values(editedUsers))
    setEditedUsers({});
  };

  const canEdit = () => {
    const { employee } = user;
    const employeeList = ["51040", "Spencer Erie"];
    return employeeList.includes(employee) ? true : false;
  };

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

  const handleFormSubmit = async (event, form, isLogForm) => {
    event.preventDefault()
    const newData = form.getTransformedValues();
  
    setEditedUsers((prevEditedUsers) => {
      return { ...prevEditedUsers, [newData.Training_ID]: newData };
    });
  
    if (isLogForm) {
      closeEmployeeTraining();
      const departments = employees.filter(
        (employee) => employee.department === newData.Employee_Name
      );
      newData.Needs_Repeat = newData.Needs_Repeat=== null ? "No" : "Yes";

      await saveLogNotes([newData]);
      setEditedUsers({});
    } else {
      closeMasterTraining();
      await saveNotes([newData]);
      setEditedUsers({});
    }
    // form.reset()
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
      {"Trainer": values.trainer, "Training_Description": values.trainingDesc, "Training_Title": values.trainingTitle, "Training_Type": values.trainingType}
    ),

    onSubmit: () => handleFormSubmit(masterForm, false)
  });

  const logForm = useForm({
    initialValues: {date: null, trainer: null, trainingTitle: null, trainingType: null, needsRepeat: null, repeatAfter: null, trainees: null, trainingNote: null},

    validate: {
      date: (value) => (value === null ? 'You must enter a training date' : null),
      trainer: (value) => (value === null ? "You must enter the trainer's name" : null),
      trainingTitle: (value) => (value === null ? 'You must select a training title' : null),
      trainees: (value) => (value === null ? 'You must select the trainees' : null),
    },

    transformValues: (values) => (
      {"Training_ID": null,"Date": values.date, "Trainer": values.trainer, "Training_Title": values.trainingTitle, "Needs_Repeat": values.needsRepeat, "Repeat_After": values.repeatAfter, "Employee_Name": values.trainees[0], "Note": values.trainingNote}
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
        <form >
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
              onClick={(event) => handleFormSubmit(event, masterForm, false)}
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
        <form>
          <DatePickerInput
            mb={16}
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
            mb={32}
            label="Training Description"
            placeholder="Description..."
            {...logForm.getInputProps('trainingDesc')}
          />
          <Checkbox
            mb={8}
            withAsterisk
            label="Will this need to be repeated?"
            {...logForm.getInputProps('needsRepeat')}
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
              onClick={(event) => handleFormSubmit(event, logForm, true)}
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
  employees: state.getIn(["employees", "employees"]),
  trainingLog: state.getIn(["trainingLog", "trainingLog"]),
  trainingLoading: state.getIn(["training", "trainingLoading"]),
  employeesLoading: state.getIn(["employees", "employeesLoading"]),
  trainingLogLoading: state.getIn(["trainingLog", "trainingLogLoading"]),
  user: state.getIn(["user","user"]),
});

export default connect(mapStateToProps, {
  fetchTrainingLog,
  fetchEmployees,
  fetchTraining,
  saveNotes,
  saveLogNotes
})(Training);