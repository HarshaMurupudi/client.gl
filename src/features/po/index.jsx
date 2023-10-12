import React, { useMemo, useState, useRef } from "react";
import { connect } from "react-redux";
import { format } from "date-fns";

import { getColumns } from "./columns";
import { PoForm } from "./components";
import { BasicUsageExample } from "../../components/data-table";
import { Box } from "@mantine/core";
import { fetchPos } from "./store/actions";
import { fetchPDF } from "../jobs/store/actions";
import { fetchPDFByJob } from "../jobs/store/actions";
import { MantineDataTable } from "../../components/mantine-data-table";
import { searchJobs } from "../tracking/store/actions";
import { ContractForm } from "../contracts/module";
import { searchCustomers } from "../contracts/store/actions";

function Po({
  pos,
  fetchPos,
  fetchPDF,
  searchJobs,
  posLoading,
  searchCustomers,
}) {
  const [currentAutofillSelection, setCurrentAutofillSelection] = useState("");
  const columns = useMemo(() => getColumns(fetchPDFByJob), []);
  const timeoutRef = useRef(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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

        if (key === "Customer") {
          jobs = await searchCustomers(val);
        } else if (key === "Job") {
          jobs = await searchJobs("Job", val);
        } else if (key === "Part_Number") {
          jobs = await searchJobs("Part_Number", val);
        } else if (key === "Customer_PO") {
          jobs = await searchJobs("Customer_PO", val);
        }

        setData(jobs);
      }
    }
  };

  const handleSubmit = async (data) => {
    // await fetchPos(data.value);

    if (currentAutofillSelection) {
      await fetchPos({ [currentAutofillSelection]: data.value });
      setCurrentAutofillSelection("");
      setValue("");
      setData([]);
    }
  };

  return (
    <Box mt={32}>
      <MantineDataTable
        title={"PO"}
        tableKey={`pos-queue-data-table`}
        columns={columns}
        data={pos || []}
        tableProps={{
          // editingMode: "cell",
          enableEditing: false,
          getRowId: (row, index) => `${row.Job}_${index}`,
        }}
        loading={posLoading}
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
  pos: state.getIn(["po", "pos"]),
  posLoading: state.getIn(["po", "posLoading"]),
});

export default connect(mapStateToProps, {
  fetchPos,
  fetchPDF,
  searchJobs,
  searchCustomers,
})(Po);
