import { notifications } from '@mantine/notifications';

import baseAxios from '../../../apis/baseAxios';
import { delay } from '../../../utils';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const setAutoCreateJobs = (status) => ({
  type: 'SET_AUTO_CREATE_JOBS',
  payload: status,
});

export const setAutoCreateJobsLoading = (status) => ({
  type: 'SET_AUTO_CREATE_JOBS_LOADING',
  payload: status,
});

export const fetchAutoCreateJobs = () => async (dispatch) => {
  try {
    console.log("hit fecth")
    dispatch(setAutoCreateJobsLoading(true));

    const response = await baseAxios.get(`/jobs/latest`);
    dispatch(setAutoCreateJobs(response.data.jobs));
  } catch (error) {
  } finally {
    dispatch(setAutoCreateJobsLoading(false));
  }
};
