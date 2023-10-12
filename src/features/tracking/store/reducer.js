const INITIAL_STATE = {
  tacking: [],
  trackingLoading: false,
};

const jobsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_TRACKING':
      return {
        ...state,
        tracking: action.payload,
      };
    case 'SET_TRACKING_LOADING':
      return {
        ...state,
        trackingLoading: action.payload,
      };
    default:
      return state;
  }
};

export default jobsReducer;
