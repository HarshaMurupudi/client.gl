const INITIAL_STATE = {
  vacations: [],
  vacationLoading: false,
};

const approvalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_VACATION':
      return {
        ...state,
        vacations: action.payload,
      };
    case 'SET_VACATION_LOADING':
      return {
        ...state,
        vacationLoading: action.payload,
      };
    default:
      return state;
  }
};

export default approvalReducer;
