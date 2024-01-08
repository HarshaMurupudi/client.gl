import { notifications } from '@mantine/notifications';

import baseAxios from '../../../apis/baseAxios';
import {delay} from '../../../utils';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const setVacation = (status) => ({
  type: 'SET_VACATION',
  payload: status,
});

export const setVacationLoading = (status) => ({
  type: 'SET_VACATION_LOADING',
  payload: status,
});

export const fetchVacation = (partID) => async (dispatch) => {
  try {
    dispatch(setVacationLoading(true));

    const response = await baseAxios.get(`/requests/vacation`);
    dispatch(setVacation(response.data.vacations));
  } catch (error) {
  } finally {
    dispatch(setVacationLoading(false));
  }
};

export const saveNotes = (vacation) => async (dispatch) => {
  try {
    dispatch(setVacationLoading(true));
    if (vacation.length > 0){
      await baseAxios.patch('request/vacation', 
      {
        data: {form: vacation},
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
    dispatch(setVacationLoading(false));
  }
  };
