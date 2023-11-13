const INITIAL_STATE = {
    attendance: [],
    vendorLoading: true,
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
  