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

export const setTrainingLog = (status) => ({
  type: 'SET_TRAINING_LOG',
  payload: status,
});

export const setTrainingLogLoading = (status) => ({
  type: 'SET_TRAINING_LOG_LOADING',
  payload: status,
});

export const addNewLogRow = () => ({
  type: 'ADD_NEW_LOG_ROW',
});

export const fetchTrainingLog = (flag) => async (dispatch) => {
  try {
    dispatch(setTrainingLogLoading(true));

    const response = await baseAxios.get('/training/log');
    dispatch(setTrainingLog(response.data.trainingLog));
  } catch (error) {
  } finally {
    dispatch(setTrainingLogLoading(false));
  }
};

export const saveLogNotes = (trainingLog) => async (dispatch) => {
  try {
    dispatch(setTrainingLogLoading(true));

   await baseAxios.patch('training/log', 
      {
        data: {trainingLog},
        headers
      });
  } catch (error) {
    console.log(error);
  } finally {
    await delay(1200)
    dispatch(setTrainingLogLoading(false));
  }
};

export const setEmployees = (status) => ({
  type: 'SET_EMPLOYEES',
  payload: status,
});

export const setEmployeesLoading = (status) => ({
  type: 'SET_EMPLOYEES_LOADING',
  payload: status,
});


export const fetchEmployees = (flag) => async (dispatch) => {
  try {
    dispatch(setEmployeesLoading(true));

    const response = await baseAxios.get('/training/employees');
    dispatch(setEmployees(response.data.employees));
  } catch (error) {
  } finally {
    dispatch(setEmployeesLoading(false));
  }
};