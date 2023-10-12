import React, { useMemo, useState, useRef } from "react";
import { connect } from "react-redux";
import { Box } from "@mantine/core";

import { PoForm } from "../po/components";
import { ContractForm } from "../contracts/module";
import { fetchTracking, searchJobs } from "./store/actions";
import { fetchPDFByJob } from "../jobs/store/actions";
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";
import { searchCustomers } from "../contracts/store/actions";

function Tracking({
  tracking,
  trackingLoading,
  fetchTracking,
  searchJobs,
  fetchPDFByJob,
  searchCustomers,
}) {
  const columns = useMemo(() => getColumns(fetchPDFByJob), []);
  const [currentAutofillSelection, setCurrentAutofillSelection] = useState("");
  const timeoutRef = useRef(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);

  const handleChange = async (val, key) => {
    if (key) {
      setCurrentAutofillSelection(key);
      window.clearTimeout(timeoutRef.current);
      setValue(val);
      setData([]);
      let jobs = [];

      // if (val.trim().length === 0 || val.includes("@")) {
      //   setLoading(false);
      // } else {
      setLoading(true);

      if (key === "Customer") {
        jobs = await searchCustomers(val);
      } else if (key === "Job") {
        jobs = await searchJobs("Job", val);
      } else if (key === "Part_Number") {
        jobs = await searchJobs("Part_Number", val);
      } else if (key === "Customer_PO") {
        jobs = await searchJobs("Customer_PO", val);
      } else if (key === "range") {
        setDateRange(val);
      }

      setData(jobs);
      // }
    }
  };

  const handleSubmit = async (data) => {
    if (currentAutofillSelection) {
      await fetchTracking({ [currentAutofillSelection]: data.value });
      setCurrentAutofillSelection("");
      setValue("");
      setData([]);
    }
  };

  return (
    <Box mt={32}>
      <MantineDataTable
        title={"Tracking"}
        tableKey={`tracking-queue-data-table`}
        columns={columns}
        data={tracking || []}
        tableProps={{
          // editingMode: "cell",
          enableEditing: false,
          getRowId: (row, index) => `${row.Job}_${index}`,
        }}
        loading={trackingLoading}
        hasCustomActionBtn={true}
        hasActionColumn={true}
        enableGrouping={false}
      >
        {/* <PoForm
          handleSubmit={handleSubmit}
          loading={loading}
          value={value}
          data={data}
          handleChange={handleChange}
        /> */}

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
  tracking: state.getIn(["tracking", "tracking"]),
  trackingLoading: state.getIn(["tracking", "trackingLoading"]),
});

export default connect(mapStateToProps, {
  fetchTracking,
  fetchPDFByJob,
  searchJobs,
  searchCustomers,
})(Tracking);
