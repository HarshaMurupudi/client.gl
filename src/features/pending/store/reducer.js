const INITIAL_STATE = {
  pendingJobs: [],
  pendingJobsLoading: true,
  jobQuantityLoading: false
};

const jobsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_PENDING_JOBS':
      return {
        ...state,
        pendingJobs: action.payload,
      };
    case 'SET_PENDING_JOBS_LOADING':
      return {
        ...state,
        pendingJobsLoading: action.payload,
      };
      case 'SET_JOB_QUANTITY_LOADING':
        return {
          ...state,
          jobQuantityLoading: action.payload,
        };
    default:
      return state;
  }
};

export default jobsReducer;
