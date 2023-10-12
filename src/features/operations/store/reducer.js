const INITIAL_STATE = {
  operations: [],
  operationsLoading: true,
  operationTimes: [],
  operationTimesLoading: false,
};

const jobsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_OPERATIONS":
      return {
        ...state,
        operations: action.payload,
      };
    case "SET_OPERATION_TIMES":
      return {
        ...state,
        operationTimes: action.payload,
      };
    case "SET_OPERATIONS_LOADING":
      return {
        ...state,
        operationsLoading: action.payload,
      };
    case "SET_OPERATION_TIMES_LOADING":
      return {
        ...state,
        operationTimesLoading: action.payload,
      };
    default:
      return state;
  }
};

export default jobsReducer;
