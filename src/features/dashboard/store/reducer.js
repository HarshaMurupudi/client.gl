const INITIAL_STATE = {
  dashboard: [],
  dashboardLoading: false,
};

const dashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case 'SET_MEETINGS':
    //   return {
    //     ...state,
    //     meetings: [...action.payload],
    //   };
    // case 'SET_MEETINGS_LOADING':
    //   return {
    //     ...state,
    //     meetingsLoading: action.payload,
    //   };
    // case 'ADD_NEW_ROW':
    //   return {
    //     ...state,
    //     meetings: [...state.meetings, {Meeting_Note_ID: null, Description: null, Date: date, Meeting_Note: null }]
    //   }
    default:
      return state;
  }
};

export default dashboardReducer;
