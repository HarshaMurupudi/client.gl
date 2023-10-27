const INITIAL_STATE = {
  materialJobs: {},
  materialRequirements: [],
  materialJobsLoading: true,
  materialRequirementsLoading: true,
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
    case "SET_MATERIAL_REQUIREMENTS":
      return {
        ...state,
        materialRequirements: [...action.payload],
      };
    case "SET_MATERIAL_REQUIREMENTS_LOADING":
      return {
        ...state,
        materialRequirementsLoading: action.payload,
      };
    default:
      return state;
  }
};

export default jobsReducer;
