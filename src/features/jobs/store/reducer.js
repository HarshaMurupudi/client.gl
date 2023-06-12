const INITIAL_STATE = {
  jobs: [],
  jobsLoading: true,
};

const jobsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_JOBS':
      return {
        ...state,
        jobs: action.payload,
      };
    case 'SET_JOBS_LOADING':
      return {
        ...state,
        jobsLoading: action.payload,
      };
    default:
      return state;
  }
};

export default jobsReducer;
