import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchJobs, saveNotes } from "./store/actions";
import { fetchPDF } from "../jobs/store/actions";
import { getColumns } from "./columns";
import WorkCenterQueue from "../../modules/Queue";

function Vendor({
  openJobs,
  readyJobs,
  vendorLoading,
  vendor,
  title,
  fetchJobs,
  fetchPDF,
  saveNotes,
}) {
  const location = useLocation();
  const pathName = location.pathname;

  const [value, setValue] = useState("Ready");
  const [editedUsers, setEditedUsers] = useState({});

  const getTableData = value === "Open" ? openJobs : readyJobs;

  const fetchPageData = async () => {
    await fetchJobs(vendor);
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
        vendor,
        editedUsers,
        setEditedUsers,
        totalEstHours,
        getTableData
      ),
    [value, editedUsers, totalEstHours]
  );

  const handleSaveUsers = async () => {
    await saveNotes(Object.values(editedUsers));
    setEditedUsers({});
  };

  return (
    <WorkCenterQueue
      title={title}
      loading={vendorLoading}
      vendor={vendor}
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
  openJobs: state.getIn(["vendor", "openJobs"]),
  readyJobs: state.getIn(["vendor", "readyJobs"]),
  vendorLoading: state.getIn(["vendor", "vendorLoading"]),
});

export default connect(mapStateToProps, {
  fetchJobs,
  fetchPDF,
  saveNotes,
})(Vendor);
