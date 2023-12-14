const INITIAL_STATE = {
  autoCreateParts: [],
  autoCreatePartsLoading: false,
};

const attendanceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_AUTO_CREATE_PARTS":
      return {
        ...state,
        autoCreateParts: action.payload,
      };
    case "SET_AUTO_CREATE_PARTS_LOADING":
      return {
        ...state,
        autoCreatePartsLoading: action.payload,
      };
    default:
      return state;
  }
};

export default attendanceReducer;
