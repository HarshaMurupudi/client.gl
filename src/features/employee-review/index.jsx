import { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { Box, Select, Button, Modal, Textarea, Text, Checkbox, Tooltip } from "@mantine/core";
import { MantineDataTable } from "../../components/mantine-data-table";
import { useForm } from "@mantine/form";
import { 
  fetchNeedsReview, 
  fetchReports, 
  setReportsLoading, 
  saveNotes,
  addNewRow
  } from "./store/actions";
import { getColumns } from "./columns";
import { delay } from "../../utils";

// |--- NOTES ---|
//  - Only department heads can submit reports for employess
//  - Those department heads can only see the reports that they submitted
//  - Due to this, I need another data field for the department or department head's name
//  - Admins can see all reports, and have editing power for the reviews


function EmployeeReview({
  needsReviewLoading,
  fetchNeedsReview,
  setReportsLoading,
  reportsLoading,
  fetchReports,
  saveNotes,
  reports,
  user,
}) {
  const [editedUsers, setEditedUsers] = useState({});
  const [needsReview, setNeedsReview] = useState("All");

  const [opened, { open, close }] = useDisclosure(false);

  const columns = useMemo(
    () => getColumns(editedUsers, setEditedUsers, reports, needsReviewLoading),
    [editedUsers, reports, needsReviewLoading],
  );

  const fetchPageData = async () => {
    await fetchReports();
    fetchNeedsReview(needsReview);
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

  const categoryList = ["All", "Needs Review", "Reviewed"]

  const onCategoryChange = async (value) => {
    setReportsLoading(true);
    await delay(10);
    setNeedsReview(value);

    await delay(300);
    setReportsLoading(false);
  };

  const canEdit = () => {
    const { employee } = user;
    const employeeList = ["51040", "Spencer Erie"];
    return employeeList.includes(employee) ? true : false;
  };

  const employees = ["Spencer Erie", "Sumit Mahajan"];
  const types = ["Good Performance", "Needs Improvement / Training", "Bad Performance"];

  const handleFormSubmit = async () => {
    const data = [form.getTransformedValues()];
    await saveNotes(data);
    form.reset();
    fetchPageData();
  };

  const form = useForm({
    initialValues: {employee: null, reportType: null, reportDetails: null, disclaimer: false},

    validate: {
      employee: (value) => (value === null ? 'You must select an employee' : null),
      reportType: (value) => (value === null ? 'You must select a report type' : null),
      reportDetails: (value) => (value === null ? 'You must submit report details' : null),
      disclaimer: (value) => (value === false ? 'You must accept the report disclaimer' : null)
    },

    transformValues: (values) => (
      {"Review_ID": null, "Date": new Date(), "Employee": values.employee, "Report_Type": values.reportType, "Report_Note": values.reportDetails, "Review_Note": null, "Reviewed_By": null}
    )
  });
  
  const userName = ( user.First_Name + " " + user.Last_Name );

  return (
    <Box>
      <Modal
        withCloseButton
        closeOnClickOutside={false}
        closeOnEscape={false}
        opened={opened} 
        onClose={close} 
        title="Employee Report Form"
        centered
        overlayProps={{
          backgroundOpacity: 0.75,
          blur: 1,
        }}>
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <Select
            withAsterisk
            mb={16}
            label="Select an Employee"
            placeholder="Employee"
            data={employees.map((employee) => ({ value: employee, label: employee }))}
            {...form.getInputProps('employee')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Report Type"
            placeholder="Report Type"
            data={types.map((type) => ({ value: type, label: type }))}
            {...form.getInputProps('reportType')}
          />
          <Textarea
            withAsterisk
            mb={16}
            minRows={10}
            label="Report Details"
            placeholder="Report Details..."
            {...form.getInputProps('reportDetails')}
          />
          <Checkbox
            mb={32}
            label="Report Disclaimer"
            description="By submitting this employee report, you understand that your 
            name is included in the report, and a manager will review it.
            Falsified or serious accusations against employees will be followed up,
            and further action may be taken. If serious misconduct has taken place,
            please contact HR. This form is for work performance issues or commendations only."
            data={types.map((type) => ({ value: type, label: type }))}
            {...form.getInputProps('disclaimer')}
          />
            <Button 
              type="submit"
              disabled={!form.isValid()}
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
      <Box>
        <MantineDataTable
          title={"Employee Review"}
          tableKey={`employee-review-data-table`}
          fetchData={fetchPageData}
          columns={columns}
          data={reports || []}
          tableProps={{
            editDisplayMode: "table",
            enableEditing: true,
            getRowId: (row, index) => `${row.Review_ID}_${index}`,
          }}
          loading={reportsLoading}
          hasRefetch={true}
          hasActionColumn={false}
          enableGrouping={false}
          isEditable={true}
          isEdited={Object.keys(editedUsers).length === 0}
          handleSave={handleSaveUsers}
          hasCustomActionBtn={true}
        >
          <Box display={"flex"}>
            <Select
              size="xs"
              mr={8}
              mt={4}
              placeholder="Pick Category"
              value={needsReview}
              onChange={onCategoryChange}
              data={categoryList}
            />
            <Button onClick={open} variant="filled">
              New Report
            </Button>
          </Box>
        </MantineDataTable>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  reports: state.getIn(["reports", "reports"]),
  reportsLoading: state.getIn(["report", "reportsLoading"]),
  needsReviewLoading: state.getIn(["report", "needsReviewLoading"]),
  user: state.getIn(["user","user"]),
});

export default connect(mapStateToProps, {
  // setModalVisibility,
  setReportsLoading,
  fetchNeedsReview,
  fetchReports,
  saveNotes,
})(EmployeeReview);