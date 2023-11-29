const INITIAL_STATE = {
  training: [],
  trainingLoading: false,
  employees: [],
  employeesLoading: false
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
    case 'ADD_NEW_ROW':
      return {
        ...state,
        training: [...state.training, {Training_ID: null, Date: null, Training_Name: null, Training_Type: null, Needs_Repeat: null, Repeat_After: null, Trainees: null}]
      }
    default:
      return state;
  }
};

export default trainingReducer;