import { notifications } from '@mantine/notifications';

import baseAxios from '../../../apis/baseAxios';
import {delay} from '../../../utils';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const setRequests = (status) => ({
  type: 'SET_ECO_REQUESTS',
  payload: status,
});

export const setRequestsLoading = (status) => ({
  type: 'SET_ECO_REQUESTS_LOADING',
  payload: status,
});

export const fetchRequests = (partID) => async (dispatch) => {
  try {
    dispatch(setRequestsLoading(true));

    const response = await baseAxios.get(`/requests/eco`);
    dispatch(setRequests(response.data.eco));
  } catch (error) {
  } finally {
    dispatch(setRequestsLoading(false));
  }
};

export const saveNotes = (eco) => async (dispatch) => {
  try {
    dispatch(setRequestsLoading(true));
    if (eco.length > 0){
      await baseAxios.patch('request/eco', 
      {
        data: {form: eco},
        headers
      });
    }
  } catch (error) {
    console.log(error);
    notifications.show({
      title: 'Error',
      message: error.response?.data?.message,
      color: 'red',
    })
  } finally {
    await delay(1200)
    dispatch(setRequestsLoading(false));
  }
  };
