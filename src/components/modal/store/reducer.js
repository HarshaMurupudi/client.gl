const INITIAL_STATE = {
  modalText: "",
  isModalOpen: false,
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_MODAL_TEXT":
      return {
        ...state,
        modalText: action.payload,
      };
    case "SET_MODAL_VISIBILITY":
      return {
        ...state,
        isModalOpen: action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
