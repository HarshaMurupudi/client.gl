import fileDownload from "js-file-download";

import baseAxios from "../../../apis/baseAxios";
import { localAxios } from "../../../apis/baseAxios";
import { notifications } from "@mantine/notifications";
import { delay } from "../../../utils";

export const setMantineDataLoading = (status) => ({
  type: "SET_MANTINE_DATA_TABLE_LOADING",
  payload: status,
});

export const fetchCustomerApprovalPDF = (partNumber) => async (dispatch) => {
  try {
    //   dispatch(setPDFLoading(true));

    // Check for avalability and file number
    let pdfData = [];
    const {
      data: { count },
    } = await baseAxios.get(
      `/part-numbers/${partNumber}/art/approval/pdfs/info`
    );

    for (let i = 1; i <= count; i++) {
      const { data } = await baseAxios.get(
        `/part-numbers/${partNumber}/art/approval/pdfs/${i}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([data], { type: "application/pdf" });
      const fileUrl = URL.createObjectURL(blob);
      //   pdfData.push(fileUrl);

      await window.open(fileUrl);
    }

    return pdfData;
  } catch (error) {
    if (error.response.data.code === "ENOENT") {
      alert("no file");
    } else {
      alert("Try after some time");
    }
  } finally {
    //   dispatch(setPDFLoading(false));
  }
};

export const fetchZundCutFilePDF = (partNumber) => async (dispatch) => {
  try {
    const {
      data: { count },
    } = await baseAxios.get(
      `/part-numbers/${partNumber}/cutting/zund/pdfs/info`
    );

    for (let i = 1; i <= count; i++) {
      const res = await baseAxios.get(
        `/part-numbers/${partNumber}/cutting/zund/pdfs/${i}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer",
        }
      );
      const { data, headers } = res;
      const pdfBlob = new Blob([data], { type: "application/pdf" });
      const fileUrl = URL.createObjectURL(pdfBlob);
      const blob = new Blob([data]);
      const fileName = headers["content-disposition"]
        .split("filename=")[1]
        .replace(/^["'](.+(?=["']$))["']$/, "$1");

      if (headers["content-type"] !== "application/pdf") {
        fileDownload(blob, fileName);
      } else {
        await window.open(fileUrl);
      }
    }
  } catch (error) {
    if (error.response.data.code === "ENOENT") {
      alert("no file");
    } else {
      alert("Try after some time");
    }
  } finally {
    //   dispatch(setPDFLoading(false));
  }
};

export const openFolder = (id, key) => async (dispatch) => {
  try {
    dispatch(setMantineDataLoading(true));

    if (key === "Part_Number") {
      await localAxios.get(`/folders/parts/${id}`);
    } else if (key === "Job") {
      await localAxios.get(`/folders/jobs/${id}`);
    } else if (key === "Quote") {
      await localAxios.get(`/folders/quotes/${id}`);
    }
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      notifications.show({
        title: "Error",
        message: "Please run the server file",
        color: "red",
      });
    } else {
      dispatch(setMantineDataLoading(false));
      notifications.show({
        title: "Error",
        message: error.response.data.message,
        color: "red",
      });
    }
  } finally {
    // await delay(1000);
    dispatch(setMantineDataLoading(false));
  }
};
