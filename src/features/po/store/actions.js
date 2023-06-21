import baseAxios from '../../../apis/baseAxios';

export const setPos = (status) => ({
  type: 'SET_POS',
  payload: status,
});

export const setPosLoading = (status) => ({
  type: 'SET_POS_LOADING',
  payload: status,
});

export const fetchPos = (data) => async (dispatch) => {
  // console.log(jobID);
  try {
    dispatch(setPosLoading(true));

    const response = await baseAxios.get(`/po/${data.jobID}`);
    dispatch(setPos(response.data.po));
  } catch (error) {
  } finally {
    dispatch(setPosLoading(false));
  }
};
