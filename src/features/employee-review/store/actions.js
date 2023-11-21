import baseAxios from '../../../apis/baseAxios';
import {delay} from '../../../utils';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const setReports = (status) => ({
  type: 'SET_REPORTS',
  payload: status,
});

export const setReportsLoading = (status) => ({
  type: 'SET_REPORTS_LOADING',
  payload: status,
});

export const setNeedsReviewLoading = (status) => ({
  type: "SET_NEEDS_REVIEW_LOADING",
  payload: status,
});


export const addNewRow = (newRow) => ({
  type: 'ADD_NEW_ROW',
  payload: newRow,
});

export const fetchReports = (flag) => async (dispatch) => {
  try {
    dispatch(setReportsLoading(true));

    const response = await baseAxios.get('/reports');
    dispatch(setReports(response.data.reports));
  } catch (error) {
  } finally {
    dispatch(setReportsLoading(false));
  }
};

export const fetchNeedsReview = (value) => async (dispatch) => {
  try {
    dispatch(setReportsLoading(true));

    const response = await baseAxios.get('/reports');
    if (value === "All"){
      dispatch(setReports(response.data.reports));
    } else if (value === "Needs Review") {
      const data = response.data.reports;
      const result = data.filter((report) => report.Reviewed_By === "needsReview" || report.Reviewed_By === null);
      dispatch(setReports(result));
    } else {
      const data = response.data.reports;
      const result = data.filter((report) => report.Reviewed_By !== null && report.Reviewed_By !== "needsReview");
      dispatch(setReports(result));
    }
  } catch (error) {
  } finally {
    dispatch(setReportsLoading(false));
  }
};

export const saveNotes = (reports) => async (dispatch) => {
  try {
    dispatch(setReportsLoading(true));

   await baseAxios.patch('reports/notes', 
      {
        data: {reports},
        headers
      });
  } catch (error) {
    console.log(error);
  } finally {
    await delay(1200)
    dispatch(setReportsLoading(false));
  }
};