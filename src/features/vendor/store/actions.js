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

export const setVendorLoading = (status) => ({
  type: 'SET_VENDOR_LOADING',
  payload: status,
});

export const fetchJobs = (partID) => async (dispatch) => {
  dispatch(setVendorLoading(true));
  await dispatch(fetchOpenJobs(partID));
  await dispatch(fetchReadyJobs(partID));
  dispatch(setVendorLoading(false));
};

export const fetchOpenJobs = (partID) => async (dispatch) => {
  try {
    dispatch(setVendorLoading(true));

    const response = await baseAxios.get(`/vendor/open/${partID}`);
    dispatch(setOpenJobs(response.data.jobs));
  } catch (error) {
  } finally {
    dispatch(setVendorLoading(false));
  }
};

export const fetchReadyJobs = (partID) => async (dispatch) => {
  try {
    dispatch(setVendorLoading(true));

    const response = await baseAxios.get(`/jobsByVendor/${partID}`);
    dispatch(setReadyJobs(response.data.jobs));
  } catch (error) {
  } finally {
    dispatch(setVendorLoading(false));
  }
};

export const saveNotes = (jobs) => async (dispatch) => {
  try {
    dispatch(setVendorLoading(true));

   await baseAxios.patch('vendor/notes', 
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
    dispatch(setVendorLoading(false));
  }
};
