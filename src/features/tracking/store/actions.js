import baseAxios from "../../../apis/baseAxios";

export const setTracking = (status) => ({
  type: "SET_TRACKING",
  payload: status,
});

export const setTrackingLoading = (status) => ({
  type: "SET_TRACKING_LOADING",
  payload: status,
});

export const fetchTracking = (data) => async (dispatch) => {
  // console.log(jobID);
  try {
    dispatch(setTrackingLoading(true));

    // const response = await baseAxios.get(`/tracking/${value}`);

    const response = await baseAxios.get(`/tracking`, {
      params: data
    });
    dispatch(setTracking(response.data.tracking));
  } catch (error) {
  } finally {
    dispatch(setTrackingLoading(false));
  }
};

export const searchJobs = (column, val) => async (dispatch) => {
  try {
    const response = await baseAxios.get("/jobs/search", {
      params: { column, value: val },
    });
    return response.data.jobs;
  } catch (error) {
    console.log(error);
  }
};
