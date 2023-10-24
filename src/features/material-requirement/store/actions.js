import baseAxios from "../../../apis/baseAxios";

export const setMaterialJobs = (status) => ({
  type: "SET_MATERIAL_JOBS",
  payload: status,
});

export const setMaterialJobsLoading = (status) => ({
  type: "SET_MATERIAL_JOBS_LOADING",
  payload: status,
});

export const fetchMaterialJobs = (jobID) => async (dispatch) => {
  try {
    dispatch(setMaterialJobsLoading(true));
    const response = await baseAxios.get(`/material/requirements/${jobID}`);
    dispatch(setMaterialJobs(response.data.materials));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setMaterialJobsLoading(false));
  }
};
