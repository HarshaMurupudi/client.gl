import { notifications } from '@mantine/notifications';

import baseAxios from '../../../apis/baseAxios';
import {delay} from '../../../utils';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const setAttendance = (status) => ({
  type: 'SET_ATTENDANCE',
  payload: status,
});

export const setAttendanceLoading = (status) => ({
  type: 'SET_ATTENDANCE_LOADING',
  payload: status,
});

export const fetchAttendance = () => async (dispatch) => {
  try {
    dispatch(setAttendanceLoading(true));

    const response = await baseAxios.get(`/attendance`);
    dispatch(setAttendance(response.data.employees));
  } catch (error) {
  } finally {
    dispatch(setAttendanceLoading(false));
  }
};

export const saveNotes = (employees) => async (dispatch) => {
  try {
    dispatch(setAttendanceLoading(true));

   await baseAxios.patch('attendance/notes', 
      {
        data: {employees},
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
    dispatch(setAttendanceLoading(false));
  }
};
