const INITIAL_STATE = {
  contracts: [],
  contractsLoading: true,
};

const jobsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CONTRACTS':
      return {
        ...state,
        contracts: action.payload,
      };
    case 'SET_CONTRACTS_LOADING':
      return {
        ...state,
        contractsLoading: action.payload,
      };
    default:
      return state;
  }
};

export default jobsReducer;
