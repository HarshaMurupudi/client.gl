import { notifications } from "@mantine/notifications";

import baseAxios from "../../../apis/baseAxios";
import { delay } from "../../../utils";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const setOpenJobs = (status) => ({
  type: "SET_OPEN_JOBS",
  payload: status,
});

export const setReadyJobs = (status) => ({
  type: "SET_READY_JOBS",
  payload: status,
});

export const setEngineeringLoading = (status) => ({
  type: "SET_ENGINEERING_LOADING",
  payload: status,
});

export const fetchJobs = (partID, type) => async (dispatch) => {
  dispatch(setEngineeringLoading(true));
  await dispatch(fetchOpenJobs(partID, type));
  await dispatch(fetchReadyJobs(partID, type));
  dispatch(setEngineeringLoading(false));
};

export const fetchOpenJobs = (partID, type) => async (dispatch) => {
  try {
    let url = `/${type}/jobs/open/${partID}`;

    const response = await baseAxios.get(url);
    dispatch(setOpenJobs(response.data.jobs));
  } catch (error) {
    console.log(error);
  }
};

export const fetchReadyJobs = (partID, type) => async (dispatch) => {
  try {
    let url = `/${type}/jobsByWorkCenter/${partID}`;

    const response = await baseAxios.get(url);
    // const response = await baseAxios.get(`/print/jobsByWorkCenter/${partID}`);
    dispatch(setReadyJobs(response.data.jobs));
  } catch (error) {
    console.log(error);
  }
};

export const saveNotes = (jobs, type) => async (dispatch, getState) => {
  // const openJobs = getState().getIn(["engineering", "openJobs"]);
  // const readyJobs = getState().getIn(["engineering", "readyJobs"]);

  let url = `${type}/notes`;

  try {
    dispatch(setEngineeringLoading(true));
    await baseAxios.patch(url, {
      data: { jobs },
      headers,
    });
  } catch (error) {
    console.log(error);
    notifications.show({
      title: "Error",
      message: error.response?.data?.message,
      color: "red",
    });
  } finally {
    // dispatch(setOpenJobs([...openJobs]));
    // dispatch(setReadyJobs([...readyJobs]));

    await delay(1200);
    dispatch(setEngineeringLoading(false));
  }
};
