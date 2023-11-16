import baseAxios from '../../../apis/baseAxios';
import {delay} from '../../../utils';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const setPendingJobs = (status) => ({
  type: 'SET_PENDING_JOBS',
  payload: status,
});

export const setPendingJobsLoading = (status) => ({
  type: 'SET_PENDING_JOBS_LOADING',
  payload: status,
});

export const setJobQunatityLoading = (status) => ({
  type: 'SET_JOB_QUANTITY_LOADING',
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

export const fetchPendingJobsWithQuantity = (flag) => async (dispatch) => {
  try {
    dispatch(setJobQunatityLoading(true));

    const response = await baseAxios.get('/jobs/pending/quantity');
    dispatch(setPendingJobs(response.data.jobs));
  } catch (error) {
  } finally {
    dispatch(setJobQunatityLoading(false));
  }
};

export const saveNotes = (jobs) => async (dispatch) => {
  try {
    dispatch(setPendingJobsLoading(true));

   await baseAxios.patch('/jobs/pending/notes', 
      {
        data: {jobs},
        headers
      });
  } catch (error) {
    console.log(error);
  } finally {
    await delay(1200)
    dispatch(setPendingJobsLoading(false));
  }
};
