import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Box, Skeleton, Text, Flex, Button, Grid } from "@mantine/core";

import { fetchDeliveryQueueDetails } from "./store/actions";
import { fetchPDF, fetchPDFByJob } from "../jobs/store/actions";
// import { BasicUsageExample } from '../../components/data-table';
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";
import {getAllocatedJobsColumns} from "./allocatedJobsColumns";

function DeliveryQueueDetails({
  deliveryQueueDetails,
  fetchDeliveryQueueDetails,
  deliveryQueueDetailsLoading,
  fetchPDFByJob,
}) {
  const params = useParams();
  const [partID, jobID] = params.partID.split("_");

  const columns = useMemo(() => getColumns(fetchPDF), []);
  const allocatedJobsColumns = useMemo(() => getAllocatedJobsColumns(fetchPDF), []);

  useEffect(() => {
    const fetchPageData = async () => {
      await fetchDeliveryQueueDetails(partID, jobID);
    };

    fetchPageData();
  }, []);

  return (
    <Box>
      <Grid
        style={{ justifyContent: "space-around" }}
      >
        <Grid  span={4}>
          On hand quantity: {deliveryQueueDetails.onHandSum}
        </Grid>
        <Grid span={4}>
          Allocated quantity: {deliveryQueueDetails.allocatedTotal}
        </Grid>
        <Grid span={4}>
          Available quantity:{" "}
          {deliveryQueueDetails.onHandSum - deliveryQueueDetails.allocatedTotal}
        </Grid>
      </Grid>

      <Box mt={24}>
        <MantineDataTable
          title={"On Hand QTY"}
          tableKey={`inventory-queue-data-table`}
          columns={columns}
          data={deliveryQueueDetails.parts}
          tableProps={{
            editDisplayMode: "table",
            enableEditing: false,
            getRowId: (row, index) => `${row.Job}_${index}`,
          }}
          initialState={{
            sorting: [{ id: "Material", desc: false }],
          }}
          loading={deliveryQueueDetailsLoading}
          hasRefetch={true}
          hasActionColumn={false}
          enableGrouping={false}
          hasCustomActionBtn={true}
        ></MantineDataTable>
      </Box>
      <Box>
        <MantineDataTable
          title={"Allocated"}
          tableKey={`inventory-queue-data-table`}
          columns={allocatedJobsColumns}
          data={deliveryQueueDetails.allocatedJobs}
          tableProps={{
            editDisplayMode: "table",
            enableEditing: false,
            getRowId: (row, index) => `${row.Job}_${index}`,
          }}
          initialState={{
            sorting: [{ id: "Material", desc: false }],
          }}
          loading={deliveryQueueDetailsLoading}
          hasRefetch={true}
          hasActionColumn={false}
          enableGrouping={false}
          hasCustomActionBtn={true}
        ></MantineDataTable>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  deliveryQueueDetails: state.getIn([
    "deliveryQueueDetail",
    "deliveryQueueDetails",
  ]),
  deliveryQueueDetailsLoading: state.getIn([
    "deliveryQueueDetail",
    "deliveryQueueDetailsLoading",
  ]),
});

export default connect(mapStateToProps, {
  fetchDeliveryQueueDetails,
  fetchPDFByJob,
})(DeliveryQueueDetails);
