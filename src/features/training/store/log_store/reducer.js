const INITIAL_STATE = {
  trainingLog: [],
  trainingLogLoading: false,
};

export const trainingLogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_TRAINING_LOG':
      return {
        ...state,
        trainingLog: [...action.payload],
      };
    case 'SET_TRAINING_LOG_LOADING':
      return {
        ...state,
        trainingLogLoading: action.payload,
      };
    default:
      return state;
  }
};

export default trainingLogReducer;