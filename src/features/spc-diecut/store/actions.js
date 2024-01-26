import { notifications } from '@mantine/notifications';

import baseAxios from '../../../apis/baseAxios';
import { delay } from '../../../utils';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const setDiecut = (status) => ({
  type: 'SET_DIECUT',
  payload: status,
});

export const setDiecutLoading = (status) => ({
  type: 'SET_DIECUT_LOADING',
  payload: status,
});

export const fetchDiecut = () => async (dispatch) => {
  try {
    dispatch(setDiecutLoading(true));

    // const response = await baseAxios.get(`/diecut`);

    const data = {
      "die": [
        {
          Die_ID: "1",
          Die_Number: "219",
          Impressions: "Total: 291",
          subRows: [
            {
              Die_ID: "1290",
              Die_Number: "219",
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
              Die_ID: "12490",
              Die_Number: "219",
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
              Die_ID: "2359",
              Die_Number: "219",
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
          Die_ID: "45",
          Die_Number: "45",
          Impressions: "Total: 945",
          subRows: [
            {
              Die_ID: "2436",
              Die_Number: "45",
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
              Die_ID: "2345",
              Die_Number: "45",
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
              Die_ID: "426",
              Die_Number: "45",
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
      ],
      "emboss": [
        {
          Die_ID: "218",
          Die_Number: "218",
          Impressions: "Total: 291",
          subRows: [
            {
              Die_ID: "124",
              Die_Number: "218",
              Art_Number: "9845",
              Part_Number: "2358",
              Date: "12/2/23",
              Material: "123123",
              Ink_Layers: "5",
              Heat: "1",
              Dwell: ".5",
              Emboss_Height: "1",
              Makeready: ".08",
              Platen: "7",
              Impressions: "75",
              Signature: "Brian Kohout"
            },
            {
              Die_ID: "1235",
              Die_Number: "218",
              Art_Number: "9845",
              Part_Number: "2358",
              Date: "12/3/23",
              Material: "123123",
              Ink_Layers: "5",
              Heat: "1",
              Dwell: ".5",
              Emboss_Height: "1",
              Makeready: ".08",
              Platen: "6.5",
              Impressions: "125",
              Signature: "Sumit Mahajan"
            },
            {
              Die_ID: "112",
              Die_Number: "218",
              Art_Number: "9845",
              Part_Number: "2358",
              Date: "12/5/23",
              Material: "123123",
              Ink_Layers: "5",
              Heat: "1",
              Dwell: ".5",
              Emboss_Height: "1",
              Makeready: ".08",
              Platen: "6.5",
              Impressions: "91",
              Signature: "Spencer Erie"
            }
          ]
        },
        {
          Die_ID: "2345",
          Die_Number: "45",
          Impressions: "Total: 945",
          subRows: [
            {
              Die_ID: "643",
              Die_Number: "46",
              Art_Number: "512",
              Part_Number: "210",
              Date: "12/14/23",
              Material: "123123",
              Ink_Layers: "5",
              Heat: "1",
              Dwell: ".5",
              Emboss_Height: "1",
              Makeready: ".05",
              Platen: "7",
              Impressions: "295",
              Signature: "Spencer Erie"
            },
            {
              Die_ID: "3457",
              Die_Number: "46",
              Art_Number: "512",
              Part_Number: "210",
              Date: "12/13/23",
              Material: "123123",
              Ink_Layers: "5",
              Heat: "1",
              Dwell: ".5",
              Emboss_Height: "1",
              Makeready: ".05",
              Platen: "6.5",
              Impressions: "400",
              Signature: "Sumit Mahajan"
            },
            {
              Die_ID: "547",
              Die_Number: "46",
              Art_Number: "512",
              Part_Number: "210",
              Date: "12/12/23",
              Material: "123123",
              Ink_Layers: "5",
              Heat: "1",
              Dwell: ".5",
              Emboss_Height: "1",
              Makeready: ".05",
              Platen: "6.5",
              Impressions: "300",
              Signature: "Brian Kohout"
            }
          ]
        },
      ]
    }

    dispatch(setDiecut(data));
  } catch (error) {
  } finally {
    dispatch(setDiecutLoading(false));
  }
};

export const saveNotes = (form, formName) => async (dispatch) => {
  try {
    dispatch(setDiecutLoading(true));
    console.log(form)
    form = [form];

    if (formName === "cut"){
      await baseAxios.patch('diecut/notes', 
      {
        data: { form },
        headers
      });
    } if (formName === "emboss") {
      await baseAxios.patch('emboss/notes', 
        {
          data: { form },
          headers
        });
    }
  } catch (error) {
    console.log(error);
    notifications.show({
      title: 'Error',
      message: error.response?.data?.message,
      color: 'red',
    })
  } finally {
    await delay(1200)
    dispatch(setDiecutLoading(false));
  }
};
