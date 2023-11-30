const INITIAL_STATE = {
  autoCreateJobs: [],
  autoCreateParts: [],
  autoCreateJobsLoading: false,
  autoCreatePartsLoading: false,
};

const attendanceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_AUTO_CREATE_JOBS":
      return {
        ...state,
        autoCreateJobs: action.payload,
      };
    case "SET_AUTO_CREATE_JOBS_LOADING":
      return {
        ...state,
        autoCreateJobsLoading: action.payload,
      };
    case "SET_AUTO_CREATE_PARTS_LOADING":
      return {
        ...state,
        autoCreatePartsLoading: action.payload,
      };
    case "SET_AUTO_CREATE_PARTS":
      return {
        ...state,
        autoCreateParts: action.payload,
      };
    default:
      return state;
  }
};

export default attendanceReducer;
