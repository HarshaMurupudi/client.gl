const INITIAL_STATE = {
  pos: [],
  posLoading: false,
  poPDF: null
};

const jobsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_POS':
      return {
        ...state,
        pos: action.payload,
      };
    case 'SET_PO_PDF':
      return {
        ...state,
        poPDF: action.payload,
      };
    case 'SET_POS_LOADING':
      return {
        ...state,
        posLoading: action.payload,
      };
    default:
      return state;
  }
};

export default jobsReducer;
