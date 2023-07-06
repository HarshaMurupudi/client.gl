const INITIAL_STATE = {
    deliveryQueueDetails: [],
    deliveryQueueDetailsLoading: true,
  };
  
  const jobsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'SET_DELIVERY_QUEUE_DETAILS':
        return {
          ...state,
          deliveryQueueDetails: action.payload,
        };
      case 'SET_DELIVERY_QUEUE_DETAILS_LOADING':
        return {
          ...state,
          deliveryQueueDetailsLoading: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default jobsReducer;
  