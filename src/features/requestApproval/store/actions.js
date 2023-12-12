import { notifications } from '@mantine/notifications';

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

export const fetchRequests = (partID) => async (dispatch) => {
  try {
    dispatch(setRequestsLoading(true));

    const response = await baseAxios.get(`/requests/entries`);
    dispatch(setRequests(response.data.entries));
  } catch (error) {
  } finally {
    dispatch(setRequestsLoading(false));
  }
};

export const saveNotes = (requests) => async (dispatch) => {
  try {
    dispatch(setRequestsLoading(true));

   let shop = requests.filter(request => request.Request_Type === 'shop');
   let eco = requests.filter(request => request.Request_Type === 'eco');
   let maintenance = requests.filter(request => request.Request_Type === 'maintenance');
   let improvement = requests.filter(request => request.Request_Type === 'improvement');
   if (shop.length > 0){
    await baseAxios.patch('requests/shop', 
    {
      data: {form: shop},
      headers
    });
   } if (eco.length > 0){
    await baseAxios.patch('requests/eco', 
    {
      data: {form: eco},
      headers
    });
   } if (maintenance.length > 0){
    await baseAxios.patch('requests/maintenance', 
    {
      data: {form: maintenance},
      headers
    });
   } if (improvement.length > 0){
    await baseAxios.patch('requests/improvement', 
    {
      data: {form: improvement},
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
