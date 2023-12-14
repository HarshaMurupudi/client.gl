const INITIAL_STATE = {
  approval: [],
  approvalLoading: true,
};

const approvalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_APPROVAL':
      return {
        ...state,
        approval: action.payload,
      };
    case 'SET_APPROVAL_LOADING':
      return {
        ...state,
        approvalLoading: action.payload,
      };
    default:
      return state;
  }
};

export default approvalReducer;
