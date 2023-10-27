import React, { useEffect, useMemo } from "react";
import { Box, Text, Paper, LoadingOverlay, Grid } from "@mantine/core";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";
import { getMaterialRequirementsColumns } from "./materialRequirementsColumns";

import { fetchMaterialJobs, fetchMaterialRequirements } from "./store/actions";
import {
  selectMaterialJobsOpenTotals,
  selectOnHandMaterialTotals,
  selectOnOrderMaterialTotals,
} from "./store/selector";
import Table from "../../components/Table";
import onHandMaterialColumns from "./onHandColumns";
import onOrderMaterialColumns from "./onOrderColumns";

function MaterialRequirement({
  materialJobs,
  materialRequirements,
  materialJobsLoading,
  materialRequirementsLoading,
  fetchMaterialJobs,
  fetchMaterialRequirements,
  materialJobsOpenTotals,
  onHandMaterialTotals,
  onOrderMaterialTotals,
}) {
  const params = useParams();
  const jobID = params.jobID;
  const columns = useMemo(() => getColumns(), []);
  const materialRequirementsColumns = useMemo(
    () => getMaterialRequirementsColumns(),
    []
  );

  useEffect(() => {
    const fetchPageData = async () => {
      await fetchMaterialJobs(jobID);
      await fetchMaterialRequirements(jobID);
      // await fetchMaterialJobs(176269);
    };

    fetchPageData();
  }, []);

  return (
    <Box>
      <Box>
        <MantineDataTable
          tableKey={"material-requirements-data-table"}
          title={`Material Requirements`}
          columns={materialRequirementsColumns}
          data={materialRequirements}
          hasActionColumn={false}
          hasCustomActionBtn={true}
          enableGrouping={false}
          loading={materialRequirementsLoading}
          // customOnRowSelection={customOnOperationRowSelection}
          tableProps={{
            enableEditing: false,
            getRowId: (row, index) => `${row.Job}_${index}`,
          }}
          minHeight={1}
        />
      </Box>
      <Box pos="relative" mt={16}>
        <LoadingOverlay
          visible={materialJobsLoading}
          zIndex={1000}
          overlayprops={{ radius: "sm", blur: 2 }}
        />
        <Text fz="md" fw={700}>
          Material Summary
        </Text>

        {Object.entries(materialJobs).map(([material, jobData]) => {
          const offsetTotal =
            materialJobsOpenTotals[material] -
            (onHandMaterialTotals[material] + onOrderMaterialTotals[material]);
          const pendingTotal = offsetTotal > 0 ? offsetTotal : 0;

          return (
            <Box key={material} my={16}>
              <Box display={"flex"} style={{ justifyContent: "space-between" }}>
                <Text fw={700}>Type: {jobData.type}</Text>
                <Text fw={700}>Description: {jobData.description}</Text>
                <Text fw={700}>On Hand: {onHandMaterialTotals[material]}</Text>
                <Text fw={700}>
                  On Order: {onOrderMaterialTotals[material]}
                </Text>
                <Text fw={700}>Pending: {pendingTotal}</Text>
                <Text fw={700}>
                  Allocated: {materialJobsOpenTotals[material]}
                </Text>
                <Text fw={700}>Cost: ${jobData.estUnitCost}</Text>
                <Text fw={700}>Lead Days: {jobData.leadDays}</Text>
              </Box>
              <MantineDataTable
                tableKey={"Operation-Details-data-table"}
                title={`${material}`}
                columns={columns}
                data={jobData.jobs}
                hasActionColumn={false}
                hasCustomActionBtn={true}
                enableGrouping={false}
                loading={materialJobsLoading}
                // customOnRowSelection={customOnOperationRowSelection}
                tableProps={{
                  enableEditing: false,
                  getRowId: (row, index) => `${row.Job}_${index}`,
                }}
                minHeight={1}
              ></MantineDataTable>

              <Paper shadow="xs" p="md">
                <Grid>
                  <Grid.Col span={5} style={{ border: "1px soild black" }}>
                    <Text fw={700}>
                      On Hand Material ({onHandMaterialTotals[material]})
                    </Text>
                    <Table
                      columns={onHandMaterialColumns}
                      rows={jobData.onHandMaterial}
                    />
                  </Grid.Col>
                  <Grid.Col span={5}>
                    <Text fw={700}>
                      On Order Material ({onOrderMaterialTotals[material]})
                    </Text>
                    <Table
                      columns={onOrderMaterialColumns}
                      rows={jobData.onOrderMaterial}
                    />
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <Text fw={700}>
                      Total Open Qty: {materialJobsOpenTotals[material]}
                    </Text>
                  </Grid.Col>
                </Grid>
              </Paper>
            </Box>
          );
        })}

        {!Object.keys(materialJobs).length > 0 && <Text>No data!</Text>}
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  materialJobs: state.getIn(["materialJobs", "materialJobs"]),
  materialRequirements: state.getIn(["materialJobs", "materialRequirements"]),
  materialJobsLoading: state.getIn(["materialJobs", "materialJobsLoading"]),
  materialRequirementsLoading: state.getIn([
    "materialJobs",
    "materialRequirementsLoading",
  ]),
  materialJobsOpenTotals: selectMaterialJobsOpenTotals(state),
  onHandMaterialTotals: selectOnHandMaterialTotals(state),
  onOrderMaterialTotals: selectOnOrderMaterialTotals(state),
});

export default connect(mapStateToProps, {
  fetchMaterialJobs,
  fetchMaterialRequirements,
})(MaterialRequirement);
