import baseAxios from "../../../apis/baseAxios";

export const setMaterialJobs = (status) => ({
  type: "SET_MATERIAL_JOBS",
  payload: status,
});

export const setMaterialJobsLoading = (status) => ({
  type: "SET_MATERIAL_JOBS_LOADING",
  payload: status,
});

export const setMaterialRequirements = (status) => ({
  type: "SET_MATERIAL_REQUIREMENTS",
  payload: status,
});

export const setMaterialRequirementsLoading = (status) => ({
  type: "SET_MATERIAL_REQUIREMENTS_LOADING",
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

export const fetchMaterialRequirements = (jobID) => async (dispatch) => {
  try {
    dispatch(setMaterialRequirementsLoading(true));
    const response = await baseAxios.get(`/job/material/requirements/${jobID}`);
    dispatch(setMaterialRequirements(response.data.jobs));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setMaterialRequirementsLoading(false));
  }
};
