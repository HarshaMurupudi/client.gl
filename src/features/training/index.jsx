import { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { Box, Select, MultiSelect, Button, Modal, Textarea, Text, Checkbox } from "@mantine/core";
import { MantineDataTable } from "../../components/mantine-data-table";
import { useForm } from "@mantine/form";
import { fetchTraining, fetchNames, saveNotes, fetchEmployees, fetchTrainingLog, saveLogNotes } from "./store/actions";
import { getTrainingColumns, getLogColumns } from "./columns";
import { DatePickerInput } from "@mantine/dates";

function Training({
  trainingLogLoading,
  trainingLoading,
  fetchTrainingLog,
  fetchTraining,
  fetchEmployees,
  fetchNames,
  saveNotes,
  saveLogNotes,
  trainingLog,
  training,
  employees,
  names,
  user,
}) {
  const [editedUsers, setEditedUsers] = useState({});

  const [masterTrainingOpened, { open: openMasterTraining, close: closeMasterTraining }] = useDisclosure(false);

  const [employeeTrainingOpened, { open: openEmployeeTraining, close: closeEmployeeTraining }] = useDisclosure(false);

  const trainingColumns = useMemo(() => getTrainingColumns(editedUsers, setEditedUsers), [editedUsers, setEditedUsers]);

  const employeeColumns = useMemo(() => getLogColumns(editedUsers, setEditedUsers), [editedUsers, setEditedUsers]);

  const fetchPageData = async () => {
    await fetchNames();
    await fetchTraining();
    await fetchTrainingLog();
    await fetchEmployees();
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const handleSaveUsers = async () => {
    await saveNotes(Object.values(editedUsers));
    setEditedUsers({});
  };

  const uniqueEntries = new Set();

  const trainees = [
    { value: "All Employees", label: "All Employees", group: 'Departments' },
    ...employees.map(employee => {
      const departmentEntry = { value: employee.Department, label: employee.Department, group: 'Departments' };

      if (!uniqueEntries.has(departmentEntry.value) && departmentEntry.value !== null) {
        uniqueEntries.add(departmentEntry.value);
        return departmentEntry;
      }

      return null;
    }),
    ...names.map(name => {
      const traineeEntry = { value: name, label: name, group: 'Employees' };

      if (!uniqueEntries.has(traineeEntry.value)) {
        uniqueEntries.add(traineeEntry.value);
        return traineeEntry;
      }

      return null;
    }),
  ].filter(Boolean);

  uniqueEntries.clear();

  const getUniqueEntries = (data, property, group) => {
    const uniqueEntries = new Set();

    return [
      ...data.map(entry => {
        const entryData = { value: entry[property], label: entry[property], group };

        if (!uniqueEntries.has(entryData.value)) {
          uniqueEntries.add(entryData.value);
          return entryData;
        }

        return null;
      }),
    ].filter(Boolean);
  };

  const trainers = getUniqueEntries(training, "Trainer", "Entered Trainers");
  const trainingTitles = getUniqueEntries(training, "Training_Title", "Entered Training");

  const handleFormSubmit = async (event, form, isLogForm) => {
    event.preventDefault();
    const newData = form.getTransformedValues();
  
    await fetchEmployees();
  
    const isDepartment = employees && employees.some(employee => employee.Department === newData.Employee_Name);
  
    const handleFormSubmission = async (entries, isLogForm) => {
      setEditedUsers((prevEditedUsers) => ({ ...prevEditedUsers, [newData.Training_ID]: newData }));
  
      if (isLogForm) {
        closeEmployeeTraining();
        entries.forEach(entry => {
          entry.Needs_Repeat = entry.Needs_Repeat === null ? "No" : "Yes";
        });
  
        await saveLogNotes(entries);
      } else {
        closeMasterTraining();
        await saveNotes(entries);
      }
  
      setEditedUsers({});
    };
  
    const processTrainees = async (traineeValues) => {
      const entriesForTrainees = traineeValues.map(trainee => ({
        ...newData,
        Employee_Name: trainee,
      }));
  
      await handleFormSubmission(entriesForTrainees, isLogForm);
      form.reset();
      fetchPageData();
    };
  
    if (Array.isArray(newData.Employee_Name)) {
      const departmentNames = [];
      const additionalEmployees = [];
  
      newData.Employee_Name.forEach(name => {
        const isDept = employees.some(employee => employee.Department === name);
        isDept ? departmentNames.push(name) : additionalEmployees.push(name);
      });
  
      const employeesFromDepartments = departmentNames.flatMap(deptName =>
        employees.filter(employee => employee.Department === deptName)
      );
  
      const allEmployeeValues = [
        ...employeesFromDepartments.map(employee => `${employee.First_Name} ${employee.Last_Name}`),
        ...additionalEmployees,
      ];
  
      await processTrainees(allEmployeeValues);
    } else if (newData.Employee_Name === "All Employees") {
      const allEmployeeValues = employees.map(employee => `${employee.First_Name} ${employee.Last_Name}`);
      await processTrainees(allEmployeeValues);
    } else if (isDepartment) {
      const employeesInDepartment = employees.filter(employee => employee.Department === newData.Employee_Name);
      const traineeValuesForDepartment = employeesInDepartment.map(employee => `${employee.First_Name} ${employee.Last_Name}`);
      await processTrainees(traineeValuesForDepartment);
    } else {
      await processTrainees([newData.Employee_Name]);
    }
  };
  
  
  
  
  
  const masterForm = useForm({
    initialValues: { date: null, trainer: null, trainingDesc: null, trainingTitle: null, trainingType: null, needsRepeat: null, repeatAfter: null, trainees: null },

    validate: {
      trainer: (value) => (value === null ? "You must enter the trainer's name" : null),
      trainingTitle: (value) => (value === null ? 'You must enter a training title' : null),
      trainingType: (value) => (value === null ? 'You must enter a training type' : null),
      trainingDesc: (value) => (value === null ? 'You must enter a training description' : null),
    },

    transformValues: (values) => ({
      "Training_ID": null,
      "Date": new Date(),
      "Trainer": values.trainer,
      "Training_Description": values.trainingDesc,
      "Training_Title": values.trainingTitle,
      "Training_Type": values.trainingType
    }),

    onSubmit: () => handleFormSubmit(masterForm, false),
  });

  const logForm = useForm({
    initialValues: { date: null, trainer: null, trainingTitle: null, trainingType: null, needsRepeat: null, repeatAfter: null, trainees: null, trainingNote: null },

    validate: {
      date: (value) => (value === null ? 'You must enter a training date' : null),
      trainer: (value) => (value === null ? "You must enter the trainer's name" : null),
      trainingTitle: (value) => (value === null ? 'You must select a training title' : null),
      trainees: (value) => (value === null ? 'You must select the trainees' : null),
    },

    transformValues: (values) => ({
      "Training_ID": null, "Date": values.date, "Trainer": values.trainer, "Training_Title": values.trainingTitle,
      "Needs_Repeat": values.needsRepeat, "Repeat_After": values.repeatAfter, "Employee_Name": values.trainees, "Note": values.trainingNote
    })
  });

  const userName = `${user.First_Name} ${user.Last_Name}`;

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
          <Textarea
            withAsterisk
            mb={16}
            label="Enter Training Type"
            placeholder="Training Type"
            autosize
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
            data={(trainers)}
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
            data={trainingTitles}
            {...logForm.getInputProps('trainingTitle')}
          />
          <Textarea
            mb={32}
            label="Training Description"
            placeholder="Description..."
            {...logForm.getInputProps('trainingNote')}
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
  names: state.getIn(["names", "names"]),
  namesLoading: state.getIn(["names", "namesLoading"]),
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
  fetchNames,
  saveNotes,
  saveLogNotes
})(Training);