const INITIAL_STATE = {
  operations: [],
  operationsLoading: true,
};

const jobsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_OPERATIONS':
      return {
        ...state,
        operations: action.payload,
      };
    case 'SET_OPERATIONS_LOADING':
      return {
        ...state,
        operationsLoading: action.payload,
      };
    default:
      return state;
  }
};

export default jobsReducer;
