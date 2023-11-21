const INITIAL_STATE = {
  reports: [],
  reportsLoading: false,
};

const date = new Date(Date.now()).toISOString();

const reportsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_REPORTS':
      return {
        ...state,
        reports: [...action.payload],
      };
    case 'SET_REPORTS_LOADING':
      return {
        ...state,
        reportsLoading: action.payload,
      };
    case "SET_NEEDS_REVIEW_LOADING":
      return {
        ...state,
        needsReviewLoading: action.payload,
      };
    case 'ADD_NEW_ROW':
      return {
        ...state,
        reports: [...state.reports, {Review_ID: null, Employee: null, Date: date, Report_Type: null, Report_Note: null, Review_Note: null, Reviewed_By: null }]
      }
    default:
      return state;
  }
};

export default reportsReducer;
