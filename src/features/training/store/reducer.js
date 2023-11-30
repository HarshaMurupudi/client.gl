const INITIAL_STATE = {
  training: [],
  trainingLoading: false,
};

const trainingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_TRAINING':
      return {
        ...state,
        training: [...action.payload],
      };
    case 'SET_TRAINING_LOADING':
      return {
        ...state,
        trainingLoading: action.payload,
      };
    default:
      return state;
  }
};

export default trainingReducer;