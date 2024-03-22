import { notifications } from '@mantine/notifications';

import baseAxios from '../../../apis/baseAxios';
import {delay} from '../../../utils';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const setDie = (status) => ({
  type: 'SET_DIE',
  payload: status,
});

export const setDieLoading = (status) => ({
  type: 'SET_DIE_LOADING',
  payload: status,
});

export const fetchDie = (flag) => async (dispatch) => {
  try {
    dispatch(setDieLoading(true));

    const response = await baseAxios.get(`/requests/dieOrder`);
    dispatch(setDie(response.data.die));
  } catch (error) {
  } finally {
    dispatch(setDieLoading(false));
  }
};

export const saveNotes = (die) => async (dispatch) => {
  try {
    dispatch(setDieLoading(true));
    await baseAxios.patch('requests/dieOrder', 
    {
      data: {form: die},
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
    dispatch(setDieLoading(false));
  }
};
