import React, { useRef, useState, useMemo } from "react";
import { ContractForm } from "./module";
import { Box } from "@mantine/core";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchContracts, searchCustomers, fetchContractsWithOnHand } from "./store/actions";
import { searchJobs } from "../tracking/store/actions";
import { fetchPDF, fetchPDFByJob } from "../jobs/store/actions";
import { getColumns } from "./columns";
import { MantineDataTable } from "../../components/mantine-data-table";

function Contracts({
  contracts,
  fetchContracts,
  fetchPDF,
  searchCustomers,
  searchJobs,
  contractsLoading,
  contractsWithOnHandLaoding,
  fetchPDFByJob,
  fetchContractsWithOnHand
}) {
  const navigate = useNavigate();
  const columns = useMemo(() => getColumns(fetchPDF, contractsWithOnHandLaoding), []);
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

  const handleSubmit = async (data, form) => {
    // console.log(data, currentAutofillSelection);
    if (currentAutofillSelection) {
      await fetchContracts({ [currentAutofillSelection]: data.value });
      //  fetchContractsWithOnHand({[currentAutofillSelection]: data.value});
      setCurrentAutofillSelection("");
      setValue("");
      setData([]);
    }
  };

  return (
    <Box>
      <MantineDataTable
        title={"Job Review"}
        tableKey={`contracts-queue-data-table`}
        columns={columns}
        data={contracts || []}
        tableProps={{
          // editingMode: "cell",
          enableEditing: false,
          getRowId: (row, index) => `${row.Job}_${index}`,
        }}
        loading={contractsLoading}
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
  contracts: state.getIn(["contract", "contracts"]),
  contractsLoading: state.getIn(["contract", "contractsLoading"]),
  contractsWithOnHandLaoding: state.getIn(["contract", "contractsWithOnHandLaoding"]),
});

export default connect(mapStateToProps, {
  fetchContracts,
  fetchPDF,
  searchCustomers,
  searchJobs,
  fetchPDFByJob,
  fetchContractsWithOnHand,
})(Contracts);
