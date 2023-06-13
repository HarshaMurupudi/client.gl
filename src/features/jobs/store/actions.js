import baseAxios from '../../../apis/baseAxios';

export const setJobs = (status) => ({
  type: 'SET_JOBS',
  payload: status,
});

export const setJobsLoading = (status) => ({
  type: 'SET_JOBS_LOADING',
  payload: status,
});

export const fetchJobs = (flag) => async (dispatch) => {
  try {
    dispatch(setJobsLoading(true));

    const response = await baseAxios.get('/');
    dispatch(setJobs(response.data.jobs));
  } catch (error) {
  } finally {
    dispatch(setJobsLoading(false));
  }
};

// fetch(`${apiUrl}/mo/gettestdoc`, requestOptions).then((response) => {
//   response.blob().then((blob) => {
//     const fileUrl = URL.createObjectURL(blob);
//     window.open(fileUrl);
//   });
// });

export const fetchPDF = (partID) => async (dispatch) => {
  try {
    const { data } = await baseAxios.get(`/part-number/${partID}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'arraybuffer',
    });

    const blob = new Blob([data], { type: 'application/pdf' });
    const fileUrl = URL.createObjectURL(blob);
    window.open(fileUrl);
  } catch (error) {
    alert('no file');
  } finally {
    dispatch(setJobsLoading(false));
  }
};
