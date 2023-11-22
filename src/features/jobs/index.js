import { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Box, Text, Select } from "@mantine/core";
import DatePicker from "react-datepicker";

import { MantineDataTable } from "../../components/mantine-data-table";
import {
  fetchJobs,
  fetchPDF,
  saveNotes,
  setJobsLoading,
  fetchJobsWithNowAt,
} from "./store/actions";
import { getColumns } from "./columns";
import { delay } from "../../utils";

function Jobs({
  jobs,
  jobsLoading,
  nowAtLoading,
  fetchJobs,
  fetchPDF,
  saveNotes,
  setJobsLoading,
  fetchJobsWithNowAt,
}) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [editedUsers, setEditedUsers] = useState({});
  const [category, setCategory] = useState("All");
  const [categoryWCs, setCategoryWCs] = useState(null);

  const CATEGORY_LIST = [
    "All",
    "Engineering",
    "ScreenPrint",
    "DigitalPrint",
    "Converting",
    "Circuit",
    "Finishing",
    "Shipping",
  ];
  const CATEGORY_WC = "Now At";
  const categoryWCMap = {
    All: [],
    Engineering: ["A-ADMIN", "A-ART", "A-CUSTOMER", "ECO", "HYTECH"],
    ScreenPrint: [
      "D-SCREENS",
      "E-INK",
      "F-MATERIAL",
      "H-CYLINDER",
      "H-ROLT",
      "H-SS SEMI",
      "H-SS-SEMIS",
      "K-DESPATCH",
      "ROCKWAY",
    ],
    DigitalPrint: [
      "H-JETRION",
      "I-CANON",
      "I-INDIGO",
    ],
    Converting: [
      "L-REWIND",
      "N-LAM",
      "N-LAM-AUTO",
      "O-ZUNDPLOT",
      "P-DIECUT",
      "P-DMOD01",
      "Q-WS400XY",
    ],
    Circuit: [
      "SPARTANICS",
      "V-PICKPLAC",
      "V-PICKPLC2",
      "W-MEMBRANE",
      "W-STAGE",
    ],
    Finishing: ["V-ASSEMBLE", "V-FINISH", "V-INSPECT"],
    Shipping: ["Z-SHIP"],
  };

  const onCategoryChange = async (value) => {
    setCategory(value);

    if (value === "All") {
      // clear
      setJobsLoading(true);
      await delay(10);
      setCategoryWCs(null);

      await delay(300);
      setJobsLoading(false);
    } else {
      setCategoryWCs([{ id: CATEGORY_WC, value: categoryWCMap[value] }]);
    }
  };

  useEffect(() => {
    const threeMonthsAgo = new Date();
    const oneWeekAhead = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    oneWeekAhead.setDate(oneWeekAhead.getDate() + 7);

    setDateRange([threeMonthsAgo, oneWeekAhead]);
  }, []);

  const fetchData = async () => {
    if (startDate && endDate) {
      await fetchJobs(startDate, endDate);
      fetchJobsWithNowAt(startDate, endDate);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const columns = useMemo(
    () => getColumns(fetchPDF, editedUsers, setEditedUsers, jobs, nowAtLoading),
    [editedUsers, jobs, nowAtLoading]
  );

  const handleSaveUsers = async (e, table) => {
    await saveNotes(Object.values(editedUsers));
    setEditedUsers({});
  };

  return (
    <Box>
      <MantineDataTable
        title={"Delivery Queue"}
        fetchData={fetchData}
        tableKey={`job-delivery-queue-data-table`}
        columns={columns}
        data={jobs}
        loading={jobsLoading}
        isEditable={true}
        isEdited={Object.keys(editedUsers).length === 0}
        handleSave={handleSaveUsers}
        hasCustomActionBtn={true}
        tableProps={{
          editDisplayMode: "table",
          enableEditing: true,
          getRowId: (row, index) => `${row.Job}_${index}`,
        }}
        hasRefetch={true}
        initialState={{
          sorting: [{ id: "shipBayDateDate", desc: false }],
        }}
        hasActionColumn={true}
        enableGrouping={false}
        columnFilters={categoryWCs}
      >
        <Box display={"flex"}>
          <Text fz="sm" fw={700} mr={16} pt={4}>
            Select Ship By Date
          </Text>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            isClearable={true}
          />
          <Select
            size="xs"
            ml={8}
            placeholder="Pick Category"
            value={category}
            onChange={onCategoryChange}
            data={CATEGORY_LIST}
          />
        </Box>
      </MantineDataTable>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  jobs: state.getIn(["job", "jobs"]),
  jobsLoading: state.getIn(["job", "jobsLoading"]),
  nowAtLoading: state.getIn(["job", "nowAtLoading"]),
});

export default connect(mapStateToProps, {
  fetchJobs,
  fetchPDF,
  saveNotes,
  setJobsLoading,
  fetchJobsWithNowAt,
})(Jobs);
