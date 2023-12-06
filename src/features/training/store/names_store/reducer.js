const INITIAL_STATE = {
    names: [],
    namesLoading: false,
  };
  
export const namesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'SET_NAMES':
        return {
            ...state,
            names: [...action.payload],
        };
      case 'SET_NAMES':
        return {
            ...state,
            namesLoading: action.payload,
        };
        default:
    return state;
  }
};

export default namesReducer;