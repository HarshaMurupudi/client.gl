const INITIAL_STATE = {
  materialJobs: {},
  materialJobsLoading: true,
};

const jobsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_MATERIAL_JOBS":
      return {
        ...state,
        materialJobs: Object.assign({}, action.payload),
      };
    case "SET_MATERIAL_JOBS_LOADING":
      return {
        ...state,
        materialJobsLoading: action.payload,
      };
    default:
      return state;
  }
};

export default jobsReducer;
