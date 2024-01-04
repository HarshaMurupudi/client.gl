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

    const response = await baseAxios.get('/requests/submit');
    dispatch(setRequests(response.data.requests));
  } catch (error) {
  } finally {
    dispatch(setRequestsLoading(false));
  }
};

export const saveNotes = (form, formName) => async (dispatch) => {
  try {
    dispatch(setRequestsLoading(true));
    form = [form];
    switch (formName) {
      case "shop":
        await baseAxios.patch('requests/shop', { data: { form }, headers });
        break;
      case "eco":
        await baseAxios.patch('requests/eco', { data: { form }, headers });
        break;
      case "safety":
        await baseAxios.patch('requests/safety', { data: { form }, headers });
        break;
      case "maintenance":
        await baseAxios.patch('requests/maintenance', { data: { form }, headers });
        break;
      case "improvement":
        await baseAxios.patch('requests/improvement', { data: { form }, headers });
        break;
      case "time-off":
        await baseAxios.patch('requests/time-off', { data: { form }, headers });
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  } finally {
    await delay(1200)
    dispatch(setRequestsLoading(false));
  }
};