import baseAxios from '../../../apis/baseAxios';

export const setTracking = (status) => ({
  type: 'SET_TRACKING',
  payload: status,
});

export const setTrackingLoading = (status) => ({
  type: 'SET_TRACKING_LOADING',
  payload: status,
});

export const fetchTracking = (data) => async (dispatch) => {
  // console.log(jobID);
  try {
    dispatch(setTrackingLoading(true));

    const response = await baseAxios.get(`/tracking/${data.jobID}`);
    dispatch(setTracking(response.data.tracking));
  } catch (error) {
  } finally {
    dispatch(setTrackingLoading(false));
  }
};
