const INITIAL_STATE = {
  openJobs: [],
  readyJobs: [],
  engineeringLoading: true,
  engineeringOpenJobsNowAtLoading: false,
};

const jobsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_OPEN_JOBS":
      return {
        ...state,
        openJobs: action.payload,
      };
    case "SET_READY_JOBS":
      return {
        ...state,
        readyJobs: action.payload,
      };
    case "SET_ENGINEERING_LOADING":
      return {
        ...state,
        engineeringLoading: action.payload,
      };
    case "SET_ENGINEERING_OPEN_JOBS_NOW_AT_LOADING":
      return {
        ...state,
        engineeringOpenJobsNowAtLoading: action.payload,
      };
    default:
      return state;
  }
};

export default jobsReducer;
