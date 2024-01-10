const INITIAL_STATE = {
  jobs: [],
  guidesLoading: false,
};

const guidesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_GUIDES':
      return {
        ...state,
        jobs: action.payload,
      };
    case 'SET_GUIDES_LOADING':
      return {
        ...state,
        guidesLoading: action.payload,
      };
    default:
      return state;
  }
};

export default guidesReducer;
