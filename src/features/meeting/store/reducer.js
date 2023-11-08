const INITIAL_STATE = {
  meetings: [],
  meetingsLoading: false,
};

const meetingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_MEETINGS':
      return {
        ...state,
        meetings: action.payload,
      };
    case 'SET_MEETINGS_LOADING':
      return {
        ...state,
        meetingsLoading: action.payload,
      };
    default:
      return state;
  }
};

export default meetingReducer;
