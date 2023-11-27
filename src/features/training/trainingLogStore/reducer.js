const INITIAL_STATE = {
  trainingLog: [],
  trainingLogLoading: false,
};

const trainingLogReducer = (state = INITIAL_STATE, action) => {
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
    case 'ADD_NEW_ROW':
      return {
        ...state,
        trainingLog: [...state.training, {Training_ID: null, Date: null, Training_Name: null, Training_Type: null, Needs_Repeat: null, Repeat_After: null, Trainees: null}]
      }
    default:
      return state;
  }
};

export default trainingLogReducer;
