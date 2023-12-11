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
    console.log(response.data.entries);
    dispatch(setRequests(response.data.entries));
  } catch (error) {
  } finally {
    dispatch(setRequestsLoading(false));
  }
};

export const saveNotes = (requests) => async (dispatch) => {
  try {
    dispatch(setRequestsLoading(true));

   const shop = requests.filter(request => request.Request_Type === 'shop');
   const eco = requests.filter(request => request.Request_Type === 'eco');
   const maintenance = requests.filter(request => request.Request_Type === 'maintenance');
   const improvement = requests.filter(request => request.Request_Type === 'improvement');
   if (shop){
    await baseAxios.patch('requests/shop', 
    {
      data: {shop},
      headers
    });
   } if (eco){
    await baseAxios.patch('requests/eco', 
    {
      data: {eco},
      headers
    });
   } if (maintenance){
    await baseAxios.patch('requests/maintenance', 
    {
      data: {maintenance},
      headers
    });
   } if (improvement){
    await baseAxios.patch('requests/improvement', 
    {
      data: {improvement},
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
    dispatch(setVendorLoading(false));
  }
};
