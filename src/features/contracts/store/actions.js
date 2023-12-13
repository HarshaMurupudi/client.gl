import baseAxios from '../../../apis/baseAxios';

export const setContracts = (status) => ({
  type: 'SET_CONTRACTS',
  payload: status,
});

export const setContractsLoading = (status) => ({
  type: 'SET_CONTRACTS_LOADING',
  payload: status,
});

export const setContractsOnHandLoading = (status) => ({
  type: 'SET_CONTRACTS_WITH_ON_HAND_LOADING',
  payload: status,
});

export const fetchContracts = (data) => async (dispatch) => {
  try {
    dispatch(setContractsLoading(true));

    const response = await baseAxios.get('/jobs', {
      params: data,
    });
    dispatch(setContracts(response.data.jobs));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setContractsLoading(false));
  }
};

export const fetchContractsWithOnHand = (data) => async (dispatch) => {
  try {
    dispatch(setContractsOnHandLoading(true));

    const response = await baseAxios.get('/jobs/on-hand-qty', {
      params: data,
    });
    dispatch(setContracts(response.data.jobs));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setContractsOnHandLoading(false));
  }
};

export const searchCustomers = (data) => async (dispatch) => {
  try {
    const response = await baseAxios.get("/customers/search?Customer=" + data + "");
    return response.data.customers;
  } catch (error) {
    console.log(error);
  }
};