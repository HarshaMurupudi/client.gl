import baseAxios from "../../../apis/baseAxios";

import { setPDFLoading } from "../../jobs/store/actions";

export const setPos = (status) => ({
  type: "SET_POS",
  payload: status,
});

export const setPosLoading = (status) => ({
  type: "SET_POS_LOADING",
  payload: status,
});

export const fetchPos = (data) => async (dispatch) => {
  // console.log(jobID);
  try {
    dispatch(setPosLoading(true));

    const response = await baseAxios.get(`/po`, {
      params: data,
    });
    dispatch(setPos(response.data.po));
  } catch (error) {
  } finally {
    dispatch(setPosLoading(false));
  }
};

export const fetchPOPDF = (jobID) => async (dispatch) => {
  try {
    dispatch(setPDFLoading(true));

    // Check for avalability and file number
    const {
      data: { count },
    } = await baseAxios.get(`/part-number/${jobID}/po/info`);

    for (let i = 1; i <= count; i++) {
      const { data } = await baseAxios.get(`/part-number/${jobID}/po/${i}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer",
      });

      const blob = new Blob([data], { type: "application/pdf" });
      const fileUrl = URL.createObjectURL(blob);

      await window.open(fileUrl);
    }
  } catch (error) {
    alert("no file");
  } finally {
    dispatch(setPDFLoading(false));
  }
};
