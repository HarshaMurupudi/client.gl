import { notifications } from '@mantine/notifications';

import baseAxios from '../../../apis/baseAxios';
import { delay } from '../../../utils';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const setAttendance = (status) => ({
  type: 'SET_ATTENDANCE',
  payload: status,
});

export const setAttendanceLoading = (status) => ({
  type: 'SET_ATTENDANCE_LOADING',
  payload: status,
});

export const fetchAttendance = () => async (dispatch) => {
  try {
    dispatch(setAttendanceLoading(true));

    // const response = await baseAxios.get(`/attendance`);
    const data = [
      {
        Die_ID: "219-0",
        Die_Number: "219",
        Impressions: "Total: 291",
        subRows: [
          {
            Die_ID: "219-1",
            Die_Number: "",
            Art_Number: "9845",
            Part_Number: "2358",
            Date: "12/2/23",
            Material: "123123",
            Lamination: "Yes",
            Adhesive: "No",
            Cut_Type: "TC",
            Press: "Standard",
            Makeready: ".08",
            Platen: "7",
            Impressions: "75",
            Signature: "Brian Kohout"
          },
          {
            Die_ID: "219-2",
            Die_Number: "",
            Art_Number: "9845",
            Part_Number: "2358",
            Date: "12/3/23",
            Material: "123123",
            Lamination: "Yes",
            Adhesive: "No",
            Cut_Type: "TC",
            Press: "Standard",
            Makeready: ".08",
            Platen: "6.5",
            Impressions: "125",
            Signature: "Sumit Mahajan"
          },
          {
            Die_ID: "219-3",
            Die_Number: "",
            Art_Number: "9845",
            Part_Number: "2358",
            Date: "12/5/23",
            Material: "123123",
            Lamination: "Yes",
            Adhesive: "No",
            Cut_Type: "TC",
            Press: "Standard",
            Makeready: ".08",
            Platen: "6.5",
            Impressions: "91",
            Signature: "Spencer Erie"
          }
        ]
      },
      {
        Die_ID: "45-0",
        Die_Number: "45",
        Impressions: "Total: 945",
        subRows: [
          {
            Die_ID: "45-1",
            Die_Number: "",
            Art_Number: "512",
            Part_Number: "210",
            Date: "12/14/23",
            Material: "123123",
            Lamination: "Yes",
            Adhesive: "No",
            Cut_Type: "TC",
            Press: "Standard",
            Makeready: ".05",
            Platen: "7",
            Impressions: "295",
            Signature: "Spencer Erie"
          },
          {
            Die_ID: "45-2",
            Die_Number: "",
            Art_Number: "512",
            Part_Number: "210",
            Date: "12/13/23",
            Material: "123123",
            Lamination: "Yes",
            Adhesive: "No",
            Cut_Type: "TC",
            Press: "Standard",
            Makeready: ".05",
            Platen: "6.5",
            Impressions: "400",
            Signature: "Sumit Mahajan"
          },
          {
            Die_ID: "45-3",
            Die_Number: "",
            Art_Number: "512",
            Part_Number: "210",
            Date: "12/12/23",
            Material: "123123",
            Lamination: "Yes",
            Adhesive: "No",
            Cut_Type: "TC",
            Press: "Standard",
            Makeready: ".05",
            Platen: "6.5",
            Impressions: "300",
            Signature: "Brian Kohout"
          }
        ]
      },
    ]

    dispatch(setAttendance(data));
  } catch (error) {
  } finally {
    dispatch(setAttendanceLoading(false));
  }
};

export const saveNotes = (attendance) => async (dispatch) => {
  try {
    dispatch(setAttendanceLoading(true));

   await baseAxios.patch('attendance/notes', 
      {
        data: { attendance },
        headers
      });
  } catch (error) {
    console.log(error);
    notifications.show({
      title: 'Error',
      message: error.response?.data?.message,
      color: 'red',
    })
  } finally {
    await delay(1200)
    dispatch(setAttendanceLoading(false));
  }
};
