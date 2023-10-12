import baseAxios from "../../../apis/baseAxios";

export const setOperations = (status) => ({
  type: "SET_OPERATIONS",
  payload: status,
});

export const setOperationsLoading = (status) => ({
  type: "SET_OPERATIONS_LOADING",
  payload: status,
});

export const setOperationTimes = (status) => ({
  type: "SET_OPERATION_TIMES",
  payload: status,
});

export const setOperationTimesLoading = (status) => ({
  type: "SET_OPERATION_TIMES_LOADING",
  payload: status,
});

export const fetchOperations = (partID) => async (dispatch) => {
  try {
    dispatch(setOperationsLoading(true));

    const response = await baseAxios.get(`/operations/${partID}`);
    dispatch(setOperations(response.data.operations));
  } catch (error) {
  } finally {
    dispatch(setOperationsLoading(false));
  }
};

export const fetchOperationTimes = (operationId) => async (dispatch) => {
  try {
    dispatch(setOperationTimesLoading(true));

    const response = await baseAxios.get(`/operation-time/${operationId}`);

    dispatch(setOperationTimes(response.data.operationTimes));
  } catch (error) {
  } finally {
    dispatch(setOperationTimesLoading(false));
  }
};
