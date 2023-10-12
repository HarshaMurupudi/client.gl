const INITIAL_STATE = {
  poDetails: [],
  pdfs: [],
  poDetailsLoading: true,
};

const jobsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_PO_DETAILS":
      return {
        ...state,
        poDetails: [...action.payload],
      };
    case "SET_PDFS":
      return {
        ...state,
        pdfs: [...action.payload],
      };
    case "SET_PO_DETAILS_LOADING":
      return {
        ...state,
        poDetailsLoading: action.payload,
      };
    default:
      return state;
  }
};

export default jobsReducer;
