import React, { useEffect, useMemo } from "react";
import { Box, Text, Paper, LoadingOverlay } from "@mantine/core";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";
import { fetchMaterialJobs } from "./store/actions";
import { selectMaterialJobsOpenTotals } from "./store/selector";

function MaterialRequirement({
  materialJobs,
  materialJobsLoading,
  fetchMaterialJobs,
  materialJobsOpenTotals,
}) {
  const params = useParams();
  const jobID = params.jobID;
  const columns = useMemo(() => getColumns(), []);

  useEffect(() => {
    const fetchPageData = async () => {
      await fetchMaterialJobs(jobID);
      // await fetchMaterialJobs(176269);
    };

    fetchPageData();
  }, []);

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={materialJobsLoading}
        zIndex={1000}
        overlayprops={{ radius: "sm", blur: 2 }}
      />
      <Text fz="md" fw={700}>
        Material Requirements
      </Text>

      {Object.entries(materialJobs).map(([material, jobs]) => {
        return (
          <Box key={material}>
            <MantineDataTable
              tableKey={"Operation-Details-data-table"}
              title={`${material}`}
              columns={columns}
              data={jobs}
              hasActionColumn={false}
              enableGrouping={false}
              loading={materialJobsLoading}
              // customOnRowSelection={customOnOperationRowSelection}
              tableProps={{
                enableEditing: false,
                getRowId: (row, index) => `${row.Job}_${index}`,
              }}
              minHeight={1}
            />

            <Paper shadow="xs" p="xl">
              <Text>Total Open Qty: {materialJobsOpenTotals[material]}</Text>
            </Paper>
          </Box>
        );
      })}

      {!Object.keys(materialJobs).length > 0 && <Text>No data!</Text>}
    </Box>
  );
}

const mapStateToProps = (state) => ({
  materialJobs: state.getIn(["materialJobs", "materialJobs"]),
  materialJobsLoading: state.getIn(["materialJobs", "materialJobsLoading"]),
  materialJobsOpenTotals: selectMaterialJobsOpenTotals(state),
});

export default connect(mapStateToProps, { fetchMaterialJobs })(
  MaterialRequirement
);
