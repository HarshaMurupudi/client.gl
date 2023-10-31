import baseAxios from '../../../apis/baseAxios';
import {delay} from '../../../utils';

export const setJobs = (status) => ({
  type: 'SET_JOBS',
  payload: status,
});

export const setJobsLoading = (status) => ({
  type: 'SET_JOBS_LOADING',
  payload: status,
});

export const setPDFLoading = (status) => ({
  type: 'SET_PDF_LOADING',
  payload: status,
});

export const setEditedUsers = (status) => ({
  type: 'SET_EDITED_USERS',
  payload: status,
});

export const fetchJobs = (job) => async (dispatch) => {
  try {
    dispatch(setJobsLoading(true));

    const response = await baseAxios.get('/delivery/shiplines/', 
    {
      params: {
        job
      },
    });
  
    dispatch(setJobs(response.data.jobs));

  } catch (error) {
    console.log(error);
  } finally {
    await delay(2000)
    dispatch(setJobsLoading(false));
  }
};
