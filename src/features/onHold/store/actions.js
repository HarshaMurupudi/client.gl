import baseAxios from '../../../apis/baseAxios';
import {delay} from '../../../utils';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

export const setContracts = (status) => ({
  type: 'SET_CONTRACTS',
  payload: status,
});

export const setContractsLoading = (status) => ({
  type: 'SET_CONTRACTS_LOADING',
  payload: status,
});

export const fetchContracts = (data) => async (dispatch) => {
  try {
    dispatch(setContractsLoading(true));

    const response = await baseAxios.get('/jobs/onHold', {
      params: data,
    });
    dispatch(setContracts(response.data.contracts));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setContractsLoading(false));
  }
};

export const saveNotes = (jobs) => async (dispatch) => {
  try {
    dispatch(setContractsLoading(true));

   await baseAxios.patch('/jobs/onHold/notes', 
      {
        data: {jobs},
        headers
      });
  } catch (error) {
    console.log(error);
  } finally {
    await delay(1200)
    dispatch(setContractsLoading(false));
  }
};
