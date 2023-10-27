const INITIAL_STATE = {
  openJobs: [],
  readyJobs: [],
  vendorLoading: true,
};

const jobsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_OPEN_JOBS':
      return {
        ...state,
        openJobs: action.payload,
      };
    case 'SET_READY_JOBS':
      return {
        ...state,
        readyJobs: action.payload,
      };
    case 'SET_VENDOR_LOADING':
      return {
        ...state,
        vendorLoading: action.payload,
      };
    default:
      return state;
  }
};

export default jobsReducer;
