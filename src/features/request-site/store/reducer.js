const INITIAL_STATE = {
  requests: [],
  requestsLoading: false,
};

const requestsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_TRAINING':
      return {
        ...state,
        requests: [...action.payload],
      };
    case 'SET_TRAINING_LOADING':
      return {
        ...state,
        requestsLoading: action.payload,
      };
    default:
      return state;
  }
};

export default requestsReducer;