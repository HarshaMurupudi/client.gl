import { notifications } from '@mantine/notifications';

import baseAxios from '../../../apis/baseAxios';
import {delay} from '../../../utils';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

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

export const fetchJobs = (partID) => async (dispatch) => {
  dispatch(setEngineeringLoading(true));
  await dispatch(fetchOpenJobs(partID));
  await dispatch(fetchReadyJobs(partID));
  dispatch(setEngineeringLoading(false));
};

export const fetchOpenJobs = (partID) => async (dispatch) => {
  try {
    dispatch(setEngineeringLoading(true));

    const response = await baseAxios.get(`/jobs/open/${partID}`);
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

export const saveNotes = (jobs) => async (dispatch) => {
  try {
    dispatch(setEngineeringLoading(true));

   await baseAxios.patch('engineering/notes', 
      {
        data: {jobs},
        headers
      });
  } catch (error) {
    console.log(error);
    notifications.show({
      title: 'Error',
      message: error.response?.data?.message,
      color: 'red',
    })
  } finally {
    await delay(1200)
    dispatch(setEngineeringLoading(false));
  }
};
