import { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { Flex, Box, Select, Button, Modal, Textarea, Text, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { fetchRequests, saveNotes } from "./store/actions";

function RequestSite({
  user,
}) {
  const [editedUsers, setEditedUsers] = useState({});

  const [shopRequestOpened, { open: openShopRequest, close: closeShopRequest }] = useDisclosure(false);

  const [ecoRequestOpened, { open: openEcoRequest, close: closeEcoRequest }] = useDisclosure(false);

  const [maintenanceRequestOpened, { open: openMaintenanceRequest, close: closeMaintenanceRequest }] = useDisclosure(false);

  const [improvementRequestOpened, { open: openImprovementRequest, close: closeImprovementRequest }] = useDisclosure(false);


  const fetchPageData = async () => {
    await fetchRequests(); // Employee Names and Work Centers
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const handleSaveUsers = async () => {
    await saveNotes(Object.values(editedUsers));
    setEditedUsers({});
  };

  const handleFormSubmit = async (event, form) => {
    event.preventDefault();
    const newData = form.getTransformedValues();
    // if (isLogForm) {
    //   await saveLogNotes(entries);
    // } else {
    //   closeMasterTraining();
    //   await saveNotes(entries);
    // }
    };

  const employees = ["Spencer Erie", "Sumit Mahajan"];
  const workCenters = ["Circuits"];
  const priorities = ["Low", "Medium", "High"];
  const ecoTypes = ["Type 1", "Type 2", "Membrane Switch", "Overlay, Label, Decal"];
  
  const shopRequestForm = useForm({
    initialValues: { initiator: null, subject: null, part_number: null, job_number: null, work_center: null, priority: null, request: null },

    validate: {
      initiator: (value) => (value === null ? "Initiator Required" : null),
      subject: (value) => (value === null ? 'Subject Required' : null),
      part_number: (value) => (value === null ? 'Part Number Required' : null),
      job_number: (value) => (value === null ? 'Job Number Required' : null),
      work_center: (value) => (value === null ? 'Work Center Required' : null),
      priority: (value) => (value === null ? 'Priority Required' : null),
      request: (value) => (value === null ? 'Request Description Required' : null),
    },

    transformValues: (values) => ({
      "Initiator": values.initiator,
      "Subject": values.subject,
      "Part_Number": values.part_number,
      "Job_Number": values.job_number,
      "Work_Center": values.work_center,
      "Priority": values.priority,
      "Request_Description": values.request
    }),

    onSubmit: () => handleFormSubmit(shopRequestForm),
  });

  const ecoRequestForm = useForm({
    initialValues: { initiator: null, subject: null, part_number: null, job_number: null, work_center: null, eco_type: null, priority: null, request: null },

    validate: {
      initiator: (value) => (value === null ? "Initiator Required" : null),
      subject: (value) => (value === null ? 'Subject Required' : null),
      part_number: (value) => (value === null ? 'Part Number Required' : null),
      job_number: (value) => (value === null ? 'Job Number Required' : null),
      work_center: (value) => (value === null ? 'Work Center Required' : null),
      eco_type: (value) => (value === null ? 'ECO Type Required' : null),
      priority: (value) => (value === null ? 'Priority Required' : null),
      request: (value) => (value === null ? 'Request Description Required' : null),
    },

    transformValues: (values) => ({
      "Initiator": values.initiator,
      "Subject": values.subject,
      "Part_Number": values.part_number,
      "Job_Number": values.job_number,
      "Work_Center": values.work_center,
      "ECO_Type": values.eco_type,
      "Priority": values.priority,
      "Request_Description": values.request
    }),

    onSubmit: () => handleFormSubmit(ecoRequestForm),
  });

  const maintenanceRequestForm = useForm({
    initialValues: { initiator: null, subject: null, work_center: null, priority: null, request: null },

    validate: {
      initiator: (value) => (value === null ? "Initiator Required" : null),
      subject: (value) => (value === null ? 'Subject Required' : null),
      priority: (value) => (value === null ? 'Priority Required' : null),
      request: (value) => (value === null ? 'Request Description Required' : null),
    },

    transformValues: (values) => ({
      "Initiator": values.initiator,
      "Subject": values.subject,
      "Work_Center": values.work_center,
      "Priority": values.priority,
      "Request_Description": values.request
    }),

    onSubmit: () => handleFormSubmit(maintenanceRequestForm),
  });

  const improvementForm = useForm({
    initialValues: { initiator: null, subject: null, part_number: null, job_number: null, work_center: null, priority: null, suggestion: null },

    validate: {
      initiator: (value) => (value === null ? "Initiator Required" : null),
      subject: (value) => (value === null ? 'Subject Required' : null),
      work_center: (value) => (value === null ? 'Work Center Required' : null),
      priority: (value) => (value === null ? 'Priority Required' : null),
      suggestion: (value) => (value === null ? 'Suggestion Required' : null),
    },

    transformValues: (values) => ({
      "Initiator": values.initiator,
      "Subject": values.subject,
      "Part_Number": values.part_number,
      "Job_Number": values.job_number,
      "Work_Center": values.work_center,
      "Priority": values.priority,
      "Suggestion": values.suggestion
    }),

    onSubmit: () => handleFormSubmit(improvementForm),
  });

  const userName = `${user.First_Name} ${user.Last_Name}`;

  return (
    <Flex
      mih={100}
      miw={100}
      fluid={true}
      justify="center"
      align="center"
    >
      <Modal
        withCloseButton
        closeOnClickOutside={false}
        closeOnEscape={false}
        opened={shopRequestOpened} 
        onClose={closeShopRequest} 
        title="Shop Request Form"
        centered
        overlayProps={{
          blur: 1,
        }}>
        <form>
          <Select
            withAsterisk
            mb={16}
            label="Select Initiator"
            placeholder="Initiator"
            data={employees}
            autosize
            {...shopRequestForm.getInputProps('initiator')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Subject"
            placeholder="Subject..."
            autosize
            {...shopRequestForm.getInputProps('subject')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Part Number"
            placeholder="Part Number..."
            autosize
            {...shopRequestForm.getInputProps('part_number')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Job Number"
            placeholder="Job Number..."
            autosize
            {...shopRequestForm.getInputProps('job_number')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Work Center"
            placeholder="Work Center"
            data={workCenters}
            autosize
            {...shopRequestForm.getInputProps('work_center')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Priority"
            placeholder="Priority"
            data={priorities}
            autosize
            {...shopRequestForm.getInputProps('priority')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Enter the Request Description"
            placeholder="Request Description..."
            {...shopRequestForm.getInputProps('request')}
          />
            <Button 
              type="submit"
              disabled={!shopRequestForm.isValid()}
              onClick={(event) => handleFormSubmit(event, shopRequestForm)}
              color="red" 
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
        opened={ecoRequestOpened} 
        onClose={closeEcoRequest} 
        title="ECO Request Form"
        centered
        overlayProps={{
          blur: 1,
        }}>
        <form>
          <Select
            withAsterisk
            mb={16}
            label="Select Initiator"
            placeholder="Initiator"
            data={employees}
            autosize
            {...ecoRequestForm.getInputProps('initiator')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Subject"
            placeholder="Subject..."
            autosize
            {...ecoRequestForm.getInputProps('subject')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Part Number"
            placeholder="Part Number..."
            autosize
            {...ecoRequestForm.getInputProps('part_number')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Job Number"
            placeholder="Job Number..."
            autosize
            {...ecoRequestForm.getInputProps('job_number')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Work Center"
            placeholder="Work Center"
            data={workCenters}
            autosize
            {...ecoRequestForm.getInputProps('work_center')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select ECO Type"
            placeholder="ECO Type"
            data={ecoTypes}
            autosize
            {...ecoRequestForm.getInputProps('eco_type')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Priority"
            placeholder="Priority"
            data={priorities}
            autosize
            {...ecoRequestForm.getInputProps('priority')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Enter the Request Description"
            placeholder="Job Number..."
            {...ecoRequestForm.getInputProps('request')}
          />
            <Button 
              type="submit"
              disabled={!ecoRequestForm.isValid()}
              onClick={(event) => handleFormSubmit(event, ecoRequestForm)}
              color="red" 
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
        opened={maintenanceRequestOpened} 
        onClose={closeMaintenanceRequest} 
        title="Maintenance Request Form"
        centered
        overlayProps={{
          blur: 1,
        }}>
        <form>
          <Select
            withAsterisk
            mb={16}
            label="Select Initiator"
            placeholder="Initiator"
            data={employees}
            autosize
            {...maintenanceRequestForm.getInputProps('initiator')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Subject"
            placeholder="Subject..."
            autosize
            {...maintenanceRequestForm.getInputProps('subject')}
          />
          <Select
            mb={16}
            label="Select Work Center"
            placeholder="Work Center"
            data={workCenters}
            autosize
            {...maintenanceRequestForm.getInputProps('work_center')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Priority"
            placeholder="Priority"
            data={priorities}
            autosize
            {...maintenanceRequestForm.getInputProps('priority')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Enter the Maintenance Request"
            placeholder="Maintenance Request..."
            {...maintenanceRequestForm.getInputProps('request')}
          />
            <Button 
              type="submit"
              disabled={!maintenanceRequestForm.isValid()}
              onClick={(event) => handleFormSubmit(event, maintenanceRequestForm)}
              color="red" 
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
        opened={improvementRequestOpened} 
        onClose={closeImprovementRequest} 
        title="Continuous Improvement Form"
        centered
        overlayProps={{
          blur: 1,
        }}>
        <form>
          <Select
            withAsterisk
            mb={16}
            label="Select Initiator"
            placeholder="Initiator"
            data={employees}
            autosize
            {...improvementForm.getInputProps('initiator')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Subject"
            placeholder="Subject..."
            autosize
            {...improvementForm.getInputProps('subject')}
          />
          <Textarea
            mb={16}
            label="Part Number"
            placeholder="Part Number..."
            autosize
            {...improvementForm.getInputProps('part_number')}
          />
          <Textarea
            mb={16}
            label="Job Number"
            placeholder="Job Number..."
            autosize
            {...improvementForm.getInputProps('job_number')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Work Center"
            placeholder="Work Center"
            data={workCenters}
            autosize
            {...improvementForm.getInputProps('work_center')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Priority"
            placeholder="Priority"
            data={priorities}
            autosize
            {...improvementForm.getInputProps('priority')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Enter the Improvement Suggestion"
            placeholder="Job Number..."
            {...improvementForm.getInputProps('suggestion')}
          />
            <Button 
              type="submit"
              disabled={!improvementForm.isValid()}
              onClick={(event) => handleFormSubmit(event, improvementForm)}
              color="red" 
              mb={8} >
                Submit
            </Button>
          <Text size={12} opacity={.5}>
            Submit as {userName}
          </Text>
        </form>
      </Modal>
        <Stack 
          display="flex"
          spacing="xl"
          align="center"
          justify="center"
        >
          <Button onClick={openShopRequest} variant="filled">
            Shop Request Form
          </Button>
          <Button onClick={openEcoRequest} variant="filled">
            ECO Request Form
          </Button>
          <Button onClick={openMaintenanceRequest} variant="filled">
            Maintenance Request Form
          </Button>
          <Button onClick={openImprovementRequest} variant="filled">
            Improvement Suggestion Form
          </Button>
        </Stack>
    </Flex>
  );
}

const mapStateToProps = (state) => ({
  user: state.getIn(["user","user"]),
});

export default connect(mapStateToProps, {
})(RequestSite);