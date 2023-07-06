import baseAxios from '../../../apis/baseAxios';

export const setDeliveryQueueDetails = (status) => ({
  type: 'SET_DELIVERY_QUEUE_DETAILS',
  payload: status,
});

export const setDeliveryQueueDetailsLoading = (status) => ({
  type: 'SET_DELIVERY_QUEUE_DETAILS_LOADING',
  payload: status,
});

export const fetchDeliveryQueueDetails = (jobID) => async (dispatch) => {
  try {
    dispatch(setDeliveryQueueDetailsLoading(true));
    const response = await baseAxios.get(`/job-details/${jobID}`);
    dispatch(setDeliveryQueueDetails(response.data.jobs));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setDeliveryQueueDetailsLoading(false));
  }
};
