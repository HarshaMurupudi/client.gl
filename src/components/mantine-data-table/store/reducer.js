const INITIAL_STATE = {
  mantineDataTableLoading: false,
};

const jobsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_MANTINE_DATA_TABLE_LOADING":
      return {
        ...state,
        mantineDataTableLoading: action.payload,
      };
    default:
      return state;
  }
};

export default jobsReducer;
