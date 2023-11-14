import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchJobs, saveNotes, fetchOpenJobsNowAt } from "./store/actions";
import { fetchPDF } from "../jobs/store/actions";
import { getColumns } from "./columns";
import WorkCenterQueue from "../../modules/Queue";

function Engineering({
  openJobs,
  readyJobs,
  engineeringLoading,
  wc,
  title,
  engineeringOpenJobsNowAtLoading,
  fetchJobs,
  fetchPDF,
  saveNotes,
  fetchOpenJobsNowAt,
}) {
  const location = useLocation();
  const pathName = location.pathname;

  const [value, setValue] = useState("Ready");
  const [editedUsers, setEditedUsers] = useState({});

  const getTableData = value === "Open" ? openJobs : readyJobs;

  const fetchPageData = async () => {
    await fetchJobs(wc);
    fetchOpenJobsNowAt(wc)
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const totalEstHours = useMemo(() => {
    const totalPoints = getTableData.reduce(
      (acc, row) => acc + row.Est_Total_Hrs,
      0
    );
    return totalPoints;
  }, [getTableData]);

  const columns = useMemo(
    () =>
      getColumns(
        fetchPDF,
        pathName,
        value,
        wc,
        editedUsers,
        setEditedUsers,
        totalEstHours,
        getTableData,
        engineeringOpenJobsNowAtLoading
      ),
    [value, editedUsers, totalEstHours, engineeringOpenJobsNowAtLoading]
  );

  const handleSaveUsers = async () => {
    await saveNotes(Object.values(editedUsers));
    setEditedUsers({});
  };

  return (
    <WorkCenterQueue
      title={title}
      loading={engineeringLoading}
      wc={wc}
      columns={columns}
      jobs={getTableData}
      value={value}
      editedUsers={editedUsers}
      handleSaveUsers={handleSaveUsers}
      setValue={setValue}
      fetchData={fetchPageData}
    />
  );
}

const mapStateToProps = (state) => ({
  openJobs: state.getIn(["engineering", "openJobs"]),
  readyJobs: state.getIn(["engineering", "readyJobs"]),
  engineeringLoading: state.getIn(["engineering", "engineeringLoading"]),
  engineeringOpenJobsNowAtLoading: state.getIn([
    "engineering",
    "engineeringOpenJobsNowAtLoading",
  ]),
});

export default connect(mapStateToProps, {
  fetchJobs,
  fetchPDF,
  saveNotes,
  fetchOpenJobsNowAt,
})(Engineering);
