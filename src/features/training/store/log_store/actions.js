// import baseAxios from '../../../../apis/baseAxios';
// import {delay} from '../../../../utils';

// const headers = {
//   'Content-Type': 'application/json',
//   Accept: 'application/json'
// }

// export const setTrainingLog = (status) => ({
//   type: 'SET_TRAINING_LOG',
//   payload: status,
// });

// export const setTrainingLogLoading = (status) => ({
//   type: 'SET_TRAINING_LOG_LOADING',
//   payload: status,
// });

// export const addNewLogRow = () => ({
//   type: 'ADD_NEW_LOG_ROW',
// });

// export const fetchTrainingLog = (flag) => async (dispatch) => {
//   try {
//     dispatch(setTrainingLogLoading(true));

//     const response = await baseAxios.get('/training/log');
//     dispatch(setTrainingLog(response.data.trainingLog));
//   } catch (error) {
//   } finally {
//     dispatch(setTrainingLogLoading(false));
//   }
// };

// export const saveLogNotes = (trainingLog) => async (dispatch) => {
//   try {
//     dispatch(setTrainingLogLoading(true));

//    await baseAxios.patch('training/log', 
//       {
//         data: {trainingLog},
//         headers
//       });
//   } catch (error) {
//     console.log(error);
//   } finally {
//     await delay(1200)
//     dispatch(setTrainingLogLoading(false));
//   }
// };
