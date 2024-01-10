import React, { useRef, useState, useMemo } from "react";
import { ContractForm } from "./module";
import { Box } from "@mantine/core";
import { connect } from "react-redux";

import {
  fetchGuides,
} from "./store/actions";
import { searchJobs } from "../tracking/store/actions";
import { fetchPDF, fetchPDFByJob } from "../jobs/store/actions";
import { getColumns } from "./columns";
import { MantineDataTable } from "../../components/mantine-data-table";

function Guides({
  jobs,
  fetchGuides,
  fetchPDF,
  searchJobs,
  guidesLoading,
}) {
  const columns = useMemo(
    () => getColumns(fetchPDF, jobs),
    []
  );
  const timeoutRef = useRef(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentAutofillSelection, setCurrentAutofillSelection] = useState("");

  const handleChange = async (val, key) => {
    if (key) {
      setCurrentAutofillSelection(key);
      window.clearTimeout(timeoutRef.current);
      setValue(val);
      setData([]);
      let jobs = [];

      if (val.trim().length === 0 || val.includes("@")) {
        setLoading(false);
      } else {
        setLoading(true);
        if (key === "Part_Number") {
          jobs = await searchJobs("Part_Number", val);
        } 
        setData(jobs);
      }
    }
  };

  const handleSubmit = async (data, form) => {
    if (currentAutofillSelection) {
      await fetchGuides({ [currentAutofillSelection]: data.value });
      setCurrentAutofillSelection("");
      setValue("");
      setData([]);
    }
  };

  return (
    <Box>
      <MantineDataTable
        title={"Part Price Guide"}
        tableKey={`guides-data-table`}
        columns={columns}
        data={jobs || []}
        tableProps={{
          // editingMode: "cell",
          enableEditing: false,
          getRowId: (row, index) => `${row.Job}_${index}`,
        }}
        initialState={{
          sorting: [{ id: "orderDate", desc: true }],
        }}
        loading={guidesLoading}
        hasCustomActionBtn={true}
        hasRefetch={false}
        hasActionColumn={true}
        enableGrouping={false}
      >
        <ContractForm
          handleSubmit={handleSubmit}
          value={value}
          data={data}
          handleChange={handleChange}
          currentAutofillSelection={currentAutofillSelection}
          // onSubmit={}
        />
      </MantineDataTable>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  jobs: state.getIn(["guides", "jobs"]),
  guidesLoading: state.getIn(["jobs", "guidesLoading"])
});

export default connect(mapStateToProps, {
  fetchGuides,
  fetchPDF,
  searchJobs,
  fetchPDFByJob,
})(Guides);
