import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Box, Skeleton, Text, Flex, Button } from "@mantine/core";

import { fetchDeliveryQueueDetails } from "./store/actions";
import { fetchPDF, fetchPDFByJob } from "../jobs/store/actions";
// import { BasicUsageExample } from '../../components/data-table';
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";

function DeliveryQueueDetails({
  deliveryQueueDetails,
  fetchDeliveryQueueDetails,
  deliveryQueueDetailsLoading,
  fetchPDFByJob,
}) {
  const params = useParams();
  const [partID, jobID] = params.partID.split("_");

  const columns = useMemo(() => getColumns(fetchPDF), []);

  useEffect(() => {
    const fetchPageData = async () => {
      await fetchDeliveryQueueDetails(partID, jobID);
    };

    fetchPageData();
  }, []);

  return (
    <Box>
      <Box>
        On hand quantity: {deliveryQueueDetails.onHandSum}
      </Box>
      <MantineDataTable
        title={"Inventory"}
        tableKey={`inventory-queue-data-table`}
        columns={columns}
        data={deliveryQueueDetails.parts}
        tableProps={{
          editDisplayMode: "table",
          enableEditing: false,
          getRowId: (row, index) => `${row.Job}_${index}`,
        }}
        initialState={{
          sorting: [
            { id: "Material", desc: false },
          ],
        }}
        loading={deliveryQueueDetailsLoading}
        hasRefetch={true}
        hasActionColumn={false}
        enableGrouping={false}
        hasCustomActionBtn={true}
      ></MantineDataTable>
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
