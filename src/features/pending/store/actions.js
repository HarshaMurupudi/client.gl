import baseAxios from '../../../apis/baseAxios';

export const setPendingJobs = (status) => ({
  type: 'SET_PENDING_JOBS',
  payload: status,
});

export const setPendingJobsLoading = (status) => ({
  type: 'SET_PENDING_JOBS_LOADING',
  payload: status,
});

export const fetchPendingJobs = (flag) => async (dispatch) => {
  try {
    dispatch(setPendingJobsLoading(true));

    const response = await baseAxios.get('/jobs/pending');
    dispatch(setPendingJobs(response.data.jobs));
  } catch (error) {
  } finally {
    dispatch(setPendingJobsLoading(false));
  }
};
