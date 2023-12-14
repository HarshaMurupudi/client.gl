import { useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Box, Text } from "@mantine/core";

import { fetchAutoCreateParts } from "./store/actions";
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";

function Attendance({
  autoCreateParts,
  fetchAutoCreateParts,
  autoCreatePartsLoading,
}) {
  const columns = useMemo(() => getColumns(), []);

  const fetchData = async () => {
    await fetchAutoCreateParts();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <MantineDataTable
        title={"Parts"}
        tableKey={`auto-create-folders-parts-data-table`}
        fetchData={fetchData}
        columns={columns}
        data={autoCreateParts || []}
        loading={autoCreatePartsLoading}
        hasRefetch={true}
        hasCustomActionBtn={false}
        hasActionColumn={true}
        isEditable={false}
        enableGrouping={false}
      ></MantineDataTable>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  autoCreateParts: state.getIn(["autoCreatePartFolder", "autoCreateParts"]),
  autoCreatePartsLoading: state.getIn([
    "autoCreatePartFolder",
    "autoCreatePartsLoading",
  ]),
});

export default connect(mapStateToProps, {
  fetchAutoCreateParts,
})(Attendance);
