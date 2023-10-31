import baseAxios from "../../../apis/baseAxios";
import { delay } from "../../../utils";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const setJobs = (status) => ({
  type: "SET_JOBS",
  payload: status,
});

export const setJobsLoading = (status) => ({
  type: "SET_JOBS_LOADING",
  payload: status,
});

export const setPDFLoading = (status) => ({
  type: "SET_PDF_LOADING",
  payload: status,
});

export const setEditedUsers = (status) => ({
  type: "SET_EDITED_USERS",
  payload: status,
});

export const fetchJobs = (startDate, endDate) => async (dispatch) => {
  try {
    dispatch(setJobsLoading(true));

    const response = await baseAxios.get("/", {
      params: {
        startDate,
        endDate,
      },
    });

    dispatch(setJobs(response.data.jobs));
  } catch (error) {
    console.log(error);
  } finally {
    await delay(2000);
    dispatch(setJobsLoading(false));
  }
};

export const fetchPDF = (partID) => async (dispatch) => {
  try {
    dispatch(setPDFLoading(true));
    const { data } = await baseAxios.get(`/part-number/${partID}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "arraybuffer",
    });

    const blob = new Blob([data], { type: "application/pdf" });
    const fileUrl = URL.createObjectURL(blob);
    window.open(fileUrl);
  } catch (error) {
    if (error.response.data.code === "ENOENT") {
      alert("no file");
    } else {
      alert("Try after some time");
    }
  } finally {
    dispatch(setPDFLoading(false));
  }
};

export const fetchPDFByJob = (jobID) => async (dispatch) => {
  try {
    dispatch(setPDFLoading(true));
    const { data } = await baseAxios.get(`/job-image/${jobID}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "arraybuffer",
    });

    const blob = new Blob([data], { type: "application/pdf" });
    const fileUrl = URL.createObjectURL(blob);
    window.open(fileUrl);
  } catch (error) {
    if (error.response.data.code === "ENOENT") {
      alert("no file");
    } else {
      alert("Try after some time");
    }
  } finally {
    dispatch(setPDFLoading(false));
  }
};

export const saveNotes = (jobs) => async (dispatch) => {
  try {
    dispatch(setJobsLoading(true));

    await baseAxios.patch("/notes", {
      data: { jobs },
      headers,
    });
  } catch (error) {
    console.log(error);
  } finally {
    await delay(1200);
    dispatch(setJobsLoading(false));
  }
};
