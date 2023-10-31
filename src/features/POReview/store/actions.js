import baseAxios from "../../../apis/baseAxios";
import { notifications } from "@mantine/notifications";

import { delay } from "../../../utils";

export const setPO = (po) => ({
  type: "SET_PO_DETAILS",
  payload: po,
});

export const setPOLoading = (status) => ({
  type: "SET_PO_DETAILS_LOADING",
  payload: status,
});

export const setPDFS = (pdfs) => ({
  type: "SET_PDFS",
  payload: pdfs,
});

export const fetchPODetails = (jobId) => async (dispatch) => {
  try {
    dispatch(setPOLoading(true));

    const response = await baseAxios.get(`/po-details/${jobId}`);
    dispatch(setPO(response.data.po));
  } catch (error) {
  } finally {
    dispatch(setPOLoading(false));
  }
};

export const fetchPOPDF = (jobID) => async (dispatch) => {
  try {
    //   dispatch(setPDFLoading(true));

    // Check for avalability and file number
    let pdfData = [];
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
      pdfData.push(fileUrl);
    }

    return pdfData;
  } catch (error) {
    console.log(error);
    alert("no file");
  } finally {
    //   dispatch(setPDFLoading(false));
  }
};

export const updateJobStatus = (jobID, status) => async (dispatch) => {
  try {
    const response = await baseAxios.get(`/jobBoss/${jobID}/${status}`);

    notifications.show({
      title: "Success",
      message: response.data.message,
      color: "green",
    });
  } catch (error) {
    notifications.show({
      title: "Error",
      message: "Failed to update the status",
      color: "red",
    });
  } finally {
    dispatch(setPOLoading(true));
    await delay(1000);
    dispatch(fetchPODetails(jobID));
  }
};
