import baseAxios from '../../../apis/baseAxios';
import {delay} from '../../../utils';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const setTraining = (status) => ({
  type: 'SET_TRAINING',
  payload: status,
});

export const setTrainingLoading = (status) => ({
  type: 'SET_TRAINING_LOADING',
  payload: status,
});

export const addNewRow = () => ({
  type: 'ADD_NEW_ROW',
});

export const fetchTraining = (flag) => async (dispatch) => {
  try {
    dispatch(setTrainingLoading(true));

    const response = await baseAxios.get('/training');
    dispatch(setTraining(response.data.training));
  } catch (error) {
  } finally {
    dispatch(setTrainingLoading(false));
  }
};

export const saveNotes = (training) => async (dispatch) => {
  try {
    dispatch(setTrainingLoading(true));

   await baseAxios.patch('training/notes', 
      {
        data: {training},
        headers
      });
  } catch (error) {
    console.log(error);
  } finally {
    await delay(1200)
    dispatch(setTrainingLoading(false));
  }
};