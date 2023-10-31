const INITIAL_STATE = {
    jobs: [],
    jobsLoading: true,
    pdfLoading: false,
    editedUsers: {}
  };
  
  const jobsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'SET_JOBS':
        return {
          ...state,
          jobs: action.payload,
        };
      case 'SET_JOBS_LOADING':
        return {
          ...state,
          jobsLoading: action.payload,
        };
      case 'SET_PDF_LOADING':
          return {
            ...state,
            pdfLoading: action.payload,
      };
      case 'SET_EDITED_USERS':
        return {
            ...state,
            editedUsers: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default jobsReducer;
  