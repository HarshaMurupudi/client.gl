const INITIAL_STATE = {
  events: [],
  eventsLoading: false,
};

const calendarReducer = (state = INITIAL_STATE, action) => {
switch (action.type) {
  case 'SET_EVENTS':
    return {
      ...state,
      events: [...action.payload],
    };
  case 'SET_EVENTS_LOADING':
    return {
      ...state,
      eventsLoading: action.payload,
    };
  default:
    return state;
}
};

export default calendarReducer;
