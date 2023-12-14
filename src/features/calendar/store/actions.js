import baseAxios from "../../../apis/baseAxios";
import { delay } from "../../../utils";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const setEvents = (status) => ({
  type: "SET_EVENTS",
  payload: status,
});

export const setEventsLoading = (status) => ({
  type: "SET_EVENTS_LOADING",
  payload: status,
});

export const fetchEvents = () => async (dispatch) => {
  try {
    dispatch(setEventsLoading(true));
    const response = await baseAxios.get(`/attendance/events`);
    dispatch(setEvents(response.data.events));
  } catch (error) {
  } finally {
    dispatch(setEventsLoading(false));
  }
};
