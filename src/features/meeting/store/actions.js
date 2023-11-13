import baseAxios from '../../../apis/baseAxios';
import {delay} from '../../../utils';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const setMeetings = (status) => ({
  type: 'SET_MEETINGS',
  payload: status,
});

export const setMeetingsLoading = (status) => ({
  type: 'SET_MEETINGS_LOADING',
  payload: status,
});

export const addNewRow = () => ({
  type: 'ADD_NEW_ROW',
});

export const fetchMeetings = (flag) => async (dispatch) => {
  try {
    dispatch(setMeetingsLoading(true));

    const response = await baseAxios.get('/meeting');
    dispatch(setMeetings(response.data.meeting));
  } catch (error) {
  } finally {
    dispatch(setMeetingsLoading(false));
  }
};

export const saveNotes = (meetings) => async (dispatch) => {
  try {
    dispatch(setMeetingsLoading(true));

   await baseAxios.patch('meeting/notes', 
      {
        data: {meetings},
        headers
      });
  } catch (error) {
    console.log(error);
  } finally {
    await delay(1200)
    dispatch(setMeetingsLoading(false));
  }
};