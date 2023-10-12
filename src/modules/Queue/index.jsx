import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Flex,
  Text,
  Grid,
  Skeleton,
  Button,
  createStyles,
  rem,
  Select,
  TextInput,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { MantineDataTable } from "../../components/mantine-data-table";

const dropDownData = [
  { value: "Open", label: "Open" },
  { value: "Ready", label: "Ready" },
];

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  // label: {
  //   position: "absolute",
  //   pointerEvents: "none",
  //   fontSize: theme.fontSizes.xs,
  //   paddingLeft: theme.spacing.sm,
  //   paddingTop: `calc(${theme.spacing.sm} / 2)`,
  //   zIndex: 1,
  // },
}));

function WorkCenterQueue({
  title,
  loading,
  wc,
  columns,
  jobs,
  value,
  editedUsers,
  handleSaveUsers,
  setValue,
  fetchData,
}) {
  const { classes } = useStyles();

  return (
    <Box>
      <MantineDataTable
        title={title}
        tableKey={`${wc}-data-table`}
        columns={columns}
        data={jobs}
        tableProps={{
          // editingMode: "table",
          editDisplayMode: "table",
          // createDisplayMode: "cell",
          enableEditing: true,
          getRowId: (row, index) => `${row.Job}_${index}`,
        }}
        initialState={{
          sorting: [
            { id: "Priority", desc: false },
            { id: "schedDate", desc: false },
            // { id: "shipBayDateDate", desc: false },
          ],
        }}
        maxHeight={"78vh"}
        loading={loading}
        isEditable={true}
        isEdited={Object.keys(editedUsers).length === 0}
        handleSave={handleSaveUsers}
        hasCustomActionBtn={true}
        fetchData={fetchData}
        hasRefetch={true}
        hasActionColumn={true}
        enableGrouping={false}
      >
        <Select
          // my="md"
          size="xs"
          // withinPortal
          data={dropDownData}
          placeholder="Status"
          // label="Status"
          // classNames={classes}
          value={value}
          onChange={setValue}
        />
      </MantineDataTable>
    </Box>
  );
}

export default WorkCenterQueue;
