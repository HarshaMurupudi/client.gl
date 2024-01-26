const INITIAL_STATE = {
    diecut: [],
    diecutLoading: false,
  };
  
const diecutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_DIECUT':
      return {
        ...state,
        diecut: action.payload,
      };
    case 'SET_DIECUT_LOADING':
      return {
        ...state,
        diecutLoading: action.payload,
      };
    default:
      return state;
  }
};

export default diecutReducer;
