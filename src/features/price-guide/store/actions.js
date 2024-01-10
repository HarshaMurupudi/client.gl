import baseAxios from '../../../apis/baseAxios';

export const setGuides = (status) => ({
  type: 'SET_GUIDES',
  payload: status,
});

export const setGuidesLoading = (status) => ({
  type: 'SET_GUIDES_LOADING',
  payload: status,
});

export const fetchGuides = (data) => async (dispatch) => {
  try {
    dispatch(setGuidesLoading(true));

    const response = await baseAxios.get('/guides', {
      params: data,
    });
    dispatch(setGuides(response.data.jobs));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setGuidesLoading(false));
  }
};

export const searchGuides = (column, val) => async (dispatch) => {
  try {
    const response = await baseAxios.get("/guides/search", {
      params: { column, value: val },
    });
    return response.data.jobs;
  } catch (error) {
    console.log(error);
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