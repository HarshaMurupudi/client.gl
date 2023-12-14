const INITIAL_STATE = {
  employees: [],
  employeesLoading: false,
};

export const employeesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_EMPLOYEES':
      return {
        ...state,
        employees: [...action.payload],
      };
    case 'SET_EMPLOYEES_LOADING':
      return {
        ...state,
        employeesLoading: action.payload,
      };
    default:
      return state;
  }
};

export default employeesReducer;