const INITIAL_STATE = {
  requests: [],
  requestsLoading: true,
};

const approvalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_REQUESTS':
      return {
        ...state,
        requests: action.payload,
      };
    case 'SET_REQUESTS_LOADING':
      return {
        ...state,
        requestsLoading: action.payload,
      };
    default:
      return state;
  }
};

export default approvalReducer;
