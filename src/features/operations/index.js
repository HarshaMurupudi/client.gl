import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import {
  Box,
  Group,
  createStyles,
  px,
  Text,
  Textarea,
  Grid,
} from "@mantine/core";
import { useLocation, useParams } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";

import {
  fetchOperations,
  fetchOperationTimes,
  setOperationTimes,
} from "./store/actions";
import { fetchPDFByJob } from "../jobs/store/actions";
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./laborColumns";
import { getOperationColumns } from "./operationColumns";
import { getJobColumns } from "./jobColumns";

function Operations({
  operations,
  operationTimes,
  operationsLoading,
  fetchOperations,
  fetchPDFByJob,
  fetchOperationTimes,
  setOperationTimes,
}) {
  const { showBoundary } = useErrorBoundary();
  const location = useLocation();
  const params = useParams();
  const [selectedOperation, setSelectedOperation] = useState({
    Job_Operation: "",
    Note_Text: "",
    Work_Center: "",
  });
  const [selectedJob, setSelectedJob] = useState("");

  const totalEstHours = useMemo(() => {
    console.log("job selected")
    const totalPoints = (operations[selectedJob] || []).reduce(
      (acc, row) => acc + row.Est_Total_Hrs,
      0
    );
    return totalPoints;
  }, [operations, selectedJob]);

  const laborColumns = useMemo(() => getColumns(fetchPDFByJob), []);
  const operationColumns = useMemo(
    () => getOperationColumns(fetchPDFByJob, totalEstHours),
    [totalEstHours]
  );
  const jobColumns = useMemo(() => getJobColumns(fetchPDFByJob), []);

  const onWorkCenterClick = async (row) => {
    setSelectedOperation({
      Job_Operation: row.Job_Operation,
      Note_Text: row.Note_Text,
      Work_Center: row.Work_Center,
    });

    await fetchOperationTimes(row.Job_Operation);
  };

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        if (location.state) {
          await fetchOperations(location.state.jobID);
        } else if (params.jobID) {
          await fetchOperations(params.jobID);
        }
      } catch (error) {
        showBoundary(error);
      }
    };

    fetchPageData();
  }, []);

  const customOnRowSelection = (value, currentRow) => {
    if (!currentRow.getIsSelected()) {
      setSelectedJob(currentRow.getValue("Job"));
    } else {
      setSelectedJob("");
    }
  };

  const customOnOperationRowSelection = (value, currentRow) => {
    if (!currentRow.getIsSelected()) {
      onWorkCenterClick(currentRow.original);
    } else {
      setSelectedOperation({
        Job_Operation: "",
        Note_Text: "",
        Work_Center: "",
      });
      setOperationTimes([]);
    }
  };

  return (
    <Box>
      <Grid>
        {/* <Grid.Col span={12}> */}
        <Grid.Col span={4}>
          <MantineDataTable
            tableKey={"Operations-data-table"}
            title={`Jobs`}
            columns={jobColumns}
            data={Object.keys(operations).map((op) => {
              const isCompleted = operations[op].every(
                (operation) => operation.Status === "C"
              );

              return {
                Job: op,
                Status: isCompleted ? "C" : "O",
                Description: operations[op][0].job
                  ? operations[op][0].job.Description
                  : "-",
              };
            })}
            hasActionColumn={false}
            enableGrouping={false}
            customOnRowSelection={customOnRowSelection}
            isBasicTable={true}
            tableProps={{
              enableEditing: false,
              getRowId: (row, index) => `${row.Job}_${index}`,
            }}
            loading={operationsLoading}
          />
        </Grid.Col>
        {/* </Grid.Col> */}
        <Grid.Col span={8}>
          <MantineDataTable
            tableKey={"Operation-Details-data-table"}
            title={`Jobs`}
            columns={operationColumns}
            data={selectedJob ? operations[selectedJob] : []}
            hasActionColumn={false}
            enableGrouping={false}
            customOnRowSelection={customOnOperationRowSelection}
            tableProps={{
              enableEditing: false,
              getRowId: (row, index) => `${row.Job}_${index}`,
            }}
          />
          {/* </Grid.Col> */}
        </Grid.Col>
        {/* <Grid.Col span={12}> */}
        <Grid.Col span={4}>
          <Textarea
            my={16}
            label={`Operation Notes - ${selectedOperation.Work_Center || ""}`}
            value={selectedOperation.Note_Text}
            autosize
          />
        </Grid.Col>
        <Grid.Col span={8}>
          <MantineDataTable
            tableKey={"Employee-Details"}
            title={`Labor Entry - ${selectedOperation.Work_Center || ""}`}
            columns={laborColumns}
            data={operationTimes}
            hasActionColumn={false}
            enableGrouping={false}
            tableProps={{
              enableEditing: false,
              getRowId: (row, index) => `${row.Job}_${index}`,
            }}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  operations: state.getIn(["operation", "operations"]),
  operationsLoading: state.getIn(["operation", "operationsLoading"]),
  operationTimes: state.getIn(["operation", "operationTimes"]),
});

export default connect(mapStateToProps, {
  fetchOperations,
  fetchPDFByJob,
  fetchOperationTimes,
  setOperationTimes,
})(Operations);
