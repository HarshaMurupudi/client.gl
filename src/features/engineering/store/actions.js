import baseAxios from '../../../apis/baseAxios';

export const setOpenJobs = (status) => ({
  type: 'SET_OPEN_JOBS',
  payload: status,
});

export const setReadyJobs = (status) => ({
  type: 'SET_READY_JOBS',
  payload: status,
});

export const setEngineeringLoading = (status) => ({
  type: 'SET_ENGINEERING_LOADING',
  payload: status,
});

export const fetchOpenJobs = () => async (dispatch) => {
  try {
    dispatch(setEngineeringLoading(true));

    const response = await baseAxios.get(`/jobs/open`);
    dispatch(setOpenJobs(response.data.jobs));
  } catch (error) {
  } finally {
    dispatch(setEngineeringLoading(false));
  }
};

export const fetchReadyJobs = (partID) => async (dispatch) => {
  try {
    dispatch(setEngineeringLoading(true));

    const response = await baseAxios.get(`/jobsByWorkCenter/${partID}`);
    dispatch(setReadyJobs(response.data.jobs));
  } catch (error) {
  } finally {
    dispatch(setEngineeringLoading(false));
  }
};
