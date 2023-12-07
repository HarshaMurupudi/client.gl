import React, { useState, useMemo, useEffect } from "react";
import { Box } from "@mantine/core";
import { connect } from "react-redux";

import { fetchContracts, saveNotes } from "./store/actions";
import { fetchPDF, fetchPDFByJob } from "../jobs/store/actions";
import { getColumns } from "./columns";
import { MantineDataTable } from "../../components/mantine-data-table";

function OnHold({
  contracts,
  fetchContracts,
  fetchPDF,
  contractsLoading,
  saveNotes
}) {
  const [editedUsers, setEditedUsers] = useState({});

  const columns = useMemo(
    () => getColumns(fetchPDF, editedUsers, setEditedUsers, contracts, contractsLoading),
    [editedUsers, contracts, contractsLoading]
  );

  const handleSaveUsers = async (e, table) => {
    await saveNotes(Object.values(editedUsers));
    setEditedUsers({});
  };

  const fetchData = async () => {
    await fetchContracts();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <MantineDataTable
        title={"On-Hold"}
        tableKey={`on-hold-queue-data-table`}
        columns={columns}
        data={contracts || []}
        tableProps={{
          editDisplayMode: "table",
          enableEditing: true,
          getRowId: (row, index) => `${row.Job}_${index}`,
        }}
        loading={contractsLoading}
        hasRefetch={true}
        fetchData={fetchData}
        hasActionColumn={true}
        enableGrouping={false}
        isEditable={true}
        isEdited={Object.keys(editedUsers).length === 0}
        handleSave={handleSaveUsers}
        hasCustomActionBtn={true}
      >
      </MantineDataTable>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  contracts: state.getIn(["contract", "contracts"]),
  contractsLoading: state.getIn(["contract", "contractsLoading"]),
});

export default connect(mapStateToProps, {
  fetchContracts,
  fetchPDF,
  saveNotes,
  fetchPDFByJob,
})(OnHold);