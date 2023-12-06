import baseAxios from '../../../apis/baseAxios';
import {delay} from '../../../utils';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const setRequests = (status) => ({
  type: 'SET_REQUESTS',
  payload: status,
});

export const setRequestsLoading = (status) => ({
  type: 'SET_REQUESTS_LOADING',
  payload: status,
});

export const fetchRequests = (flag) => async (dispatch) => {
  try {
    dispatch(setRequestsLoading(true));

    const response = await baseAxios.get('/requests');
    dispatch(setRequests(response.data.requests));
  } catch (error) {
  } finally {
    dispatch(setRequestsLoading(false));
  }
};

export const saveNotes = (requests) => async (dispatch) => {
  try {
    dispatch(setRequestsLoading(true));

   await baseAxios.patch('requests/notes', 
      {
        data: {requests},
        headers
      });
  } catch (error) {
    console.log(error);
  } finally {
    await delay(1200)
    dispatch(setRequestsLoading(false));
  }
};