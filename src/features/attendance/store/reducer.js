const INITIAL_STATE = {
    attendances: [],
    attendanceLoading: false,
  };
  
const attendanceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_ATTENDANCE':
      return {
        ...state,
        attendance: action.payload,
      };
    case 'SET_ATTENDANCE_LOADING':
      return {
        ...state,
        attendanceLoading: action.payload,
      };
    default:
      return state;
  }
};

export default attendanceReducer;
