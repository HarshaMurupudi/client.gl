import { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { Flex, Divider, Select, Button, Modal, Textarea, Text, Stack, LoadingOverlay, SimpleGrid } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { fetchRequests, saveNotes } from "./store/actions";

function RequestSite({
  requestsLoading,
  fetchRequests,
  requests,
  saveNotes,
  user,
}) {
  const [shopRequestOpened, { open: openShopRequest, close: closeShopRequest }] = useDisclosure(false);

  const [safetyReportOpened, { open: openSafetyReport, close: closeSafetyReport }] = useDisclosure(false);

  const [ecoRequestOpened, { open: openEcoRequest, close: closeEcoRequest }] = useDisclosure(false);

  const [maintenanceRequestOpened, { open: openMaintenanceRequest, close: closeMaintenanceRequest }] = useDisclosure(false);

  const [improvementRequestOpened, { open: openImprovementRequest, close: closeImprovementRequest }] = useDisclosure(false);

  const [timeOffRequestOpened, { open: openTimeOffRequest, close: closeTimeOffRequest }] = useDisclosure(false);

  const [dieOrderOpened, { open: openDieOrder, close: closeDieOrder }] = useDisclosure(false);

  const fetchPageData = async () => {
    await fetchRequests(); // Employee Names and Work Centers
  };

  useEffect(() => {
    fetchPageData();  
  }, []);

  let closeForms = {
    shop: closeShopRequest,
    eco: closeEcoRequest,
    safety: closeSafetyReport,
    die: closeDieOrder,
    maintenance: closeMaintenanceRequest,
    improvement: closeImprovementRequest,
    timeOff: closeTimeOffRequest,
  };

  const handleFormSubmit = async (event, form, formName) => {
    event.preventDefault();
    closeForms = closeForms[formName];
    const newData = form.getTransformedValues();
    // closeForms();
    await saveNotes(newData, formName);
    // form.reset()
  };

  const priorities = ["Low", "Medium", "High"];

  const ecoTypes = [
    "Converting",
    "Membrane Switch", 
    "Overlay", 
    "Label", 
    "Decal", 
    "Printed Electronics"
  ];

  const toolTypes = [
    "Flexibe Rotary",
    "Flexible Flat",
    "Steel Rule",
    "Solid Die",
    "Emboss",
    "Thermal",
    "Deboss",
    "Thin Plate"
  ]

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
      "Request_ID": null,
      "Request_Type": "shop",
      "Submission_Date": new Date(),
      "Status": "New",
      "Initiator": values.initiator,
      "Subject": values.subject,
      "Part_Number": values.part_number,
      "Job_Number": values.job_number,
      "Work_Center": values.work_center,
      "Priority": values.priority,
      "Request": values.request,
      "Approver": "Sumit Mahajan",
      "Approval_Comment": null,
      "Approval_Date": null,
    }),

    onSubmit: () => handleFormSubmit(shopRequestForm, "shop"), 
  });

  const dieOrderForm = useForm({
    initialValues: { 
      po: null, 
      tool_type: null, 
      tool_id: null, 
      tool_shape: null, 
      tool_description: null, 
      cavity_width: null, 
      cavity_height: null,
      radius: null,
      across: null,
      down: null,
      total: null,
      space_across: null,
      vendor: null,
      comment: null,
    },

    validate: {
      tool_type: (value) => (value === null ? 'Tool Type Required' : null),
    },

    transformValues: (values) => ({
      "Die_ID": null,
      "Request_Type": "die",
      "Submission_Date": new Date(),
      "Status": "Active",
      "PO Number": values.po,
      "Tool_Type": values.tool_type,
      "Tool_ID": null,
      "Tool_Shape": values.tool_shape,
      "Tool_Description": values.tool_description,
      "Cavity_Width": values.cavity_width,
      "Cavity_Height": values.cavity_height,
      "Radius": values.radius,
      "Cavities_Across": values.across,
      "Cavities_Down": values.down,
      "Cavities_Total": values.total,
      "Space_Across": values.space_across,
      "Vendor": values.vendor,
      "Comment": values.comment,
      "Inspection_Status": null,
      "Approver": null,
      "Approval_Comment": null,
      "Approval_Date": null,
    }),

    onSubmit: () => handleFormSubmit(dieOrderForm, "die"), 
  });

  const safetyReportForm = useForm({
    initialValues: { initiator: null, subject: null, part_number: null, job_number: null, work_center: null, priority: null, request: null },

    validate: {
      initiator: (value) => (value === null ? "Initiator Required" : null),
      subject: (value) => (value === null ? 'Subject Required' : null),
      workCenter: (value) => (value === null ? 'Work Center Required' : null),
      priority: (value) => (value === null ? 'Priority Required' : null),
      request: (value) => (value === null ? 'Report Description Required' : null),
    },

    transformValues: (values) => ({
      "Request_ID": null,
      "Request_Type": "safety",
      "Submission_Date": new Date(),
      "Status": "New",
      "Initiator": values.initiator,
      "Subject": values.subject,
      "Work_Center": values.work_center,
      "Priority": values.priority,
      "Request": values.request,
      "Approver": null,
      "Approval_Comment": null,
      "Approval_Date": null,
    }),

    onSubmit: () => handleFormSubmit(safetyReportForm, "safety"), 
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
      "Request_ID": null,
      "Request_Type": "eco",
      "Submission_Date": new Date(),
      "Status": "New",
      "Initiator": values.initiator,
      "Subject": values.subject,
      "Part_Number": values.part_number,
      "Job_Number": values.job_number,
      "Work_Center": values.work_center,
      "Eco_Type": values.eco_type,
      "Priority": values.priority,
      "Request": values.request,
      "Approver": null,
      "Approval_Comment": null,
      "Approval_Date": null,
    }),

    onSubmit: () => handleFormSubmit(ecoRequestForm, "eco"),
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
      "Request_ID": null,
      "Request_Type": "maintenance",
      "Submission_Date": new Date(),
      "Status": "New",
      "Initiator": values.initiator,
      "Subject": values.subject,
      "Work_Center": values.work_center,
      "Priority": values.priority,
      "Request": values.request,
      "Approver": null,
      "Approval_Comment": null,
      "Approval_Date": null,
    }),

    onSubmit: () => handleFormSubmit(maintenanceRequestForm, "maintenance"),
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
      "Request_ID": null,
      "Request_Type": "improvement",
      "Submission_Date": new Date(),
      "Status": "New",
      "Initiator": values.initiator,
      "Subject": values.subject,
      "Part_Number": values.part_number,
      "Job_Number": values.job_number,
      "Work_Center": values.work_center,
      "Priority": values.priority,
      "Request": values.suggestion,
      "Approver": null,
      "Approval_Comment": null,
      "Approval_Date": null,
    }),

    onSubmit: () => handleFormSubmit(improvementForm, "improvement"),
  });
  
  const timeOffRequestForm = useForm({
    initialValues: { initiator: null, start_date: null, end_date: null, request: null },

    validate: {
      initiator: (value) => (value === null ? "Initiator Required" : null),
      start_date: (value) => (value === null ? 'Start Date Required' : null),
      end_date: (value) => (value === null ? 'End Date Required' : null),
    },

    transformValues: (values) => ({
      "Request_ID": null,
      "Request_Type": "time-off",
      "Submission_Date": new Date(),
      "Status": "New",
      "Initiator": values.initiator,
      "Start_Date": values.start_date,
      "End_Date": values.end_date,
      "Request": values.request,
      "Approver": null,
      "Approval_Comment": null,
      "Approval_Date": null,
    }),

    onSubmit: () => handleFormSubmit(timeOffRequestForm, "time-off"), 
  });
  const userName = `${user.First_Name} ${user.Last_Name}`;
  
  return (
    <Flex
      h={"85vh"}
      w={"76vw"}
      fluid="true"
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
            data={requests.names}
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
            data={requests.workCenters}
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
              onClick={(event) => handleFormSubmit(event, shopRequestForm, "shop")}
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
        opened={dieOrderOpened} 
        // onClose={closeDieOrder} 
        title="Die Order Form"
        centered
        size={750}
        overlayProps={{
          blur: 1,
        }}>
        <form>
          <SimpleGrid cols={2}>
            <Textarea
              withAsterisk
              mb={16}
              label="PO Number"
              placeholder="PO..."
              autosize
              {...dieOrderForm.getInputProps('po')}
            />
            <Textarea
              withAsterisk
              mb={16}
              label="Vendor"
              placeholder="Vendor..."
              autosize
              {...dieOrderForm.getInputProps('vendor')}
            />
            <Select
              withAsterisk
              mb={16}
              label="Select Tool Type"
              placeholder="Tool Type"
              data={toolTypes}
              autosize
              {...dieOrderForm.getInputProps('tool_type')}
            />
            <Textarea
              withAsterisk
              mb={16}
              label="Tool Shape"
              placeholder="Tool Shape..."
              autosize
              {...dieOrderForm.getInputProps('tool_shape')}
            />
            <Textarea
              withAsterisk
              mb={16}
              label="Tool Description"
              placeholder="Tool Description..."
              autosize
              {...dieOrderForm.getInputProps('tool_description')}
            />
            <Textarea
              withAsterisk
              mb={16}
              label="Radius"
              placeholder="Radius..."
              autosize
              {...dieOrderForm.getInputProps('radius')}
            />
            <Textarea
              withAsterisk
              mb={16}
              label="Cavity Width"
              placeholder="Cavity Width..."
              autosize
              {...dieOrderForm.getInputProps('cavity_width')}
            />
            <Textarea
              withAsterisk
              mb={16}
              label="Cavity Height"
              placeholder="Cavity Height..."
              autosize
              {...dieOrderForm.getInputProps('cavity_height')}
            />
            <Textarea
              withAsterisk
              mb={16}
              label="Cavities Across"
              placeholder="Number Across..."
              autosize
              {...dieOrderForm.getInputProps('across')}
            />
            <Textarea
              withAsterisk
              mb={16}
              label="Cavities Down"
              placeholder="Number Down..."
              autosize
              {...dieOrderForm.getInputProps('down')}
            />
            <Textarea
              withAsterisk
              mb={16}
              label="Space Across"
              placeholder="Space Across..."
              autosize
              {...dieOrderForm.getInputProps('space_across')}
            />
            <Textarea
              withAsterisk
              mb={16}
              label="Space Down"
              placeholder="Space Down..."
              autosize
              {...dieOrderForm.getInputProps('space_down')}
            />
            <Textarea
              withAsterisk
              mb={16}
              label="Total Cavities"
              placeholder="Total..."
              autosize
              {...dieOrderForm.getInputProps('total')}
            />
            <Textarea
              withAsterisk
              mb={16}
              label="Comment"
              placeholder="Comment..."
              autosize
              {...dieOrderForm.getInputProps('comment')}
            />
          </SimpleGrid>
            <Button 
              type="submit"
              disabled={!dieOrderForm.isValid()}
              onClick={(event) => handleFormSubmit(event, dieOrderForm, "die")}
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
            data={requests.names}
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
            data={requests.workCenters}
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
              onClick={(event) => handleFormSubmit(event, ecoRequestForm, "eco")}
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
        opened={safetyReportOpened} 
        onClose={closeSafetyReport} 
        title="Safety Request Form"
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
            data={requests.names}
            autosize
            {...safetyReportForm.getInputProps('initiator')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Subject"
            placeholder="Subject..."
            autosize
            {...safetyReportForm.getInputProps('subject')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Work Center"
            placeholder="Work Center"
            data={requests.workCenters}
            autosize
            {...safetyReportForm.getInputProps('work_center')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Priority"
            placeholder="Priority"
            data={priorities}
            autosize
            {...safetyReportForm.getInputProps('priority')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Enter the Request Description"
            placeholder="Request Description..."
            {...safetyReportForm.getInputProps('request')}
          />
            <Button 
              type="submit"
              disabled={!safetyReportForm.isValid()}
              onClick={(event) => handleFormSubmit(event, safetyReportForm, "safety")}
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
            data={requests.names}
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
            data={requests.workCenters}
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
              onClick={(event) => handleFormSubmit(event, maintenanceRequestForm, "maintenance")}
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
            data={requests.names}
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
            data={requests.workCenters}
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
              onClick={(event) => handleFormSubmit(event, improvementForm, "improvement")}
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
        opened={timeOffRequestOpened} 
        onClose={closeTimeOffRequest} 
        title="Vacation Request Form"
        centered
        overlayProps={{
          blur: 1,
        }}>
        <form>
          <Select
            withAsterisk
            mb={16}
            label="Select Your Name"
            placeholder="Initiator"
            data={requests.names}
            autosize
            {...timeOffRequestForm.getInputProps('initiator')}
          />
          <DatePickerInput
            mb={16}
            withAsterisk
            label="Start Date"
            placeholder="Pick Date"
            isClearable={true}
            {...timeOffRequestForm.getInputProps('start_date')}
          />
          <DatePickerInput
            mb={16}
            withAsterisk
            label="End Date"
            placeholder="Pick Date"
            isClearable={true}
            {...timeOffRequestForm.getInputProps('end_date')}
          />
          <Textarea
            mb={16}
            label="Reason For Request, If Needed"
            placeholder="Description"
            {...timeOffRequestForm.getInputProps('request')}
          />
          <Text size={14} mb={16}>
            Before submitting, please verify that the dates you have entered are correct.
          </Text>
            <Button 
              type="submit"
              disabled={!timeOffRequestForm.isValid()}
              onClick={(event) => handleFormSubmit(event, timeOffRequestForm, "timeOff")}
              color="red" 
              mb={8} >
                Submit
            </Button>
          <Text size={12} opacity={.5}>
            Submit as {userName}
          </Text>
        </form>
      </Modal>
        <LoadingOverlay
          visible={requestsLoading}
          zIndex={1000}
          overlayprops={{ radius: "sm", blur: 2 }}
        />
          <Stack
            display="flex"
            spacing="xl"
            align="center"
            justify="center"
          >
            <Divider 
              size="md" 
              style={{ width:'80%' }}
              label="HR Requests"
              labelPosition="center"
            />
            <Button onClick={openTimeOffRequest} variant="filled" size="xl">
              Vacation Request Form
            </Button>
            <Divider 
              size="md"
              style={{ width:'80%' }}
              label="Shop Issues / Requests"
              labelPosition="center"
            />
            <Button onClick={openShopRequest} variant="filled" size="xl">
              Shop Request Form
            </Button>
            <Button onClick={openEcoRequest} variant="filled" size="xl">
              ECO Request Form
            </Button>
            <Button onClick={openDieOrder} variant="filled" size="xl">
              Die Order Form
            </Button>
            <Button onClick={openSafetyReport} variant="filled" size="xl">
              Safety Report Form
            </Button>
            <Button onClick={openMaintenanceRequest} variant="filled" size="xl">
              Maintenance Request Form
            </Button>
            <Button onClick={openImprovementRequest} variant="filled" size="xl">
              Continuous Improvement Form
            </Button>
          </Stack>
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  requests: state.getIn(["requests", "requests"]),
  requestsLoading: state.getIn(["requests", "requestsLoading"]),
  user: state.getIn(["user", "user"]),
});

export default connect(mapStateToProps, {
  fetchRequests,
  saveNotes,
})(RequestSite);