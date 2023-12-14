import { notifications } from "@mantine/notifications";

import baseAxios from "../../../apis/baseAxios";
import { delay } from "../../../utils";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const setAutoCreateParts = (status) => ({
  type: "SET_AUTO_CREATE_PARTS",
  payload: status,
});

export const setAutoCreatePartsLoading = (status) => ({
  type: "SET_AUTO_CREATE_PARTS_LOADING",
  payload: status,
});

export const fetchAutoCreateParts = () => async (dispatch) => {
  try {
    console.log("hit fecth");
    dispatch(setAutoCreatePartsLoading(true));

    const response = await baseAxios.get(`/parts/latest`);
    dispatch(setAutoCreateParts(response.data.jobs));
  } catch (error) {
  } finally {
    dispatch(setAutoCreatePartsLoading(false));
  }
};
