const INITIAL_STATE = {
  die: [],
  dieLoading: true,
};

const dieReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_DIE':
      return {
        ...state,
        die: action.payload,
      };
    case 'SET_DIE_LOADING':
      return {
        ...state,
        dieLoading: action.payload,
      };
    default:
      return state;
  }
};

export default dieReducer;
