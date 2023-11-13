import React, { useMemo, useState, useRef } from "react";
import { connect } from "react-redux";
import { Box } from "@mantine/core";

import { attendanceLoading, fetchAttendance } from "./store/actions"
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";

function Attendance({
  attendance
}) {
  const columns = useMemo(() => getColumns(), []);
  const [currentAutofillSelection, setCurrentAutofillSelection] = useState("");
  const timeoutRef = useRef(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);

  const handleSubmit = async (data) => {
    if (currentAutofillSelection) {
      await fetchAttendance({ [currentAutofillSelection]: data.value });
      setCurrentAutofillSelection("");
      setValue("");
      setData([]);
    }
  };

  return (
    <Box mt={32}>
      <MantineDataTable
        title={"Attendance"}
        tableKey={`attendance-data-table`}
        columns={columns}
        data={attendance || []}
        tableProps={{
          // editingMode: "cell",
          enableEditing: false,
          getRowId: (row, index) => `${row.Employee}_${index}`,
        }}
        loading={attendanceLoading}
        hasCustomActionBtn={true}
        hasActionColumn={true}
        enableGrouping={false}
      >
      </MantineDataTable>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  attendance: state.getIn(["attendance", "attendance"]),
  attendanceLoading: state.getIn(["attendance", "attendanceLoading"]),
});

export default connect(mapStateToProps, {
  fetchAttendance,
})(Attendance);
