import { notifications } from '@mantine/notifications';

import baseAxios from '../../../apis/baseAxios';
import {delay} from '../../../utils';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const setApproval = (status) => ({
  type: 'SET_APPROVAL',
  payload: status,
});

export const setApprovalLoading = (status) => ({
  type: 'SET_APPROVAL_LOADING',
  payload: status,
});

export const fetchApproval = (partID) => async (dispatch) => {
  try {
    dispatch(setApprovalLoading(true));

    const response = await baseAxios.get(`/requests/entries`);
    dispatch(setApproval(response.data.entries));
  } catch (error) {
  } finally {
    dispatch(setApprovalLoading(false));
  }
};

export const saveNotes = (requests) => async (dispatch) => {
  try {
    dispatch(setApprovalLoading(true));

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
    dispatch(setApprovalLoading(false));
  }
};
