import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchDie, saveNotes } from "./store/actions";
import { Box, Button } from "@mantine/core";
import { MantineDataTable } from "../../components/mantine-data-table";
import { getColumns } from "./columns";

function DieOrder({
  die,
  dieLoading,
  fetchDie,
  saveNotes,
  user
}) {
  const [editedUsers, setEditedUsers] = useState({});
  const [showActive, setShowActive] = useState(false);

  const userName = `${user.First_Name} ${user.Last_Name}`;

  const filteredDies = useMemo(() => {
    if (die) {
      return die.filter(
        (entry) =>
          showActive && entry.Status !== "Obsolete" || !showActive
      );
    }
  }, [die, showActive]);


  const fetchData = async () => {
    await fetchDie();
  };

  useEffect(() => {
    fetchData();
  }, [showActive]);

  const columns = useMemo(
    () =>
      getColumns(
        editedUsers,
        setEditedUsers,
        userName,
      ),
    [editedUsers, user]
  );

  const handleSave = async () => {
    await saveNotes(Object.values(editedUsers));
    setEditedUsers({});
  };

  return (
    <Box>
      <MantineDataTable
        title={"Die Orders"}
        tableKey={`die-orders-data-table`}
        columns={columns}
        data={filteredDies || []}
        tableProps={{
          editDisplayMode: "table",
          enableEditing: true,
          getRowId: (row, index) => `${row.Tool_ID}_${index}`,
        }}
        initialState={{
          sorting: [
            { id: "Tool_ID", desc: true },
          ],
        }}
        handleSave={handleSave}
        loading={dieLoading}
        hasRefetch={true}
        fetchData={fetchData}
        hasActionColumn={true}
        enableGrouping={false}
        hasCustomActionBtn={true}
        isEditable={true}
        isEdited={Object.keys(editedUsers).length === 0}
      >
        <Button onClick={() => setShowActive(!showActive)}>
          {showActive ? "All Dies" : "Active Dies"}
        </Button>
      </MantineDataTable>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.getIn(["user","user"]),
  die: state.getIn(["dieOrder", "die"]),
  dieLoading: state.getIn(["die", "dieLoading"]),
});

export default connect(mapStateToProps, {
  fetchDie,
  saveNotes,
})(DieOrder);
