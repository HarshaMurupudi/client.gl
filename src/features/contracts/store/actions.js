import baseAxios from '../../../apis/baseAxios';

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
    const { jobID, partID } = data;
    console.log(data, data.jobID);

    dispatch(setContractsLoading(true));

    const response = await baseAxios.get('/jobs', {
      params: { 'jobID': jobID },
    });
    dispatch(setContracts(response.data.jobs));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setContractsLoading(false));
  }
};
