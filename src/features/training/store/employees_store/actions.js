// import baseAxios from '../../../../apis/baseAxios';
// import {delay} from '../../../../utils';

// const headers = {
//   'Content-Type': 'application/json',
//   Accept: 'application/json'
// }

// export const setEmployees = (status) => ({
//   type: 'SET_EMPLOYEES',
//   payload: status,
// });

// export const setEmployeesLoading = (status) => ({
//   type: 'SET_EMPLOYEES_LOADING',
//   payload: status,
// });


// export const fetchEmployees = (flag) => async (dispatch) => {
//   try {
//     dispatch(setEmployeesLoading(true));

//     const response = await baseAxios.get('/training/employees');
//     const namesArray = []

//     for (const employee of response.data.employees) {
//       const firstName = employee.First_Name;
//       const lastName = employee.Last_Name;

//       if (firstName && lastName) {
//         const fullName = `${firstName} ${lastName}`;
//         namesArray.push(fullName);
//       }
//     }
//     console.log(namesArray);

//     dispatch(setEmployees(namesArray));
//   } catch (error) {
//   } finally {
//     dispatch(setEmployeesLoading(false));
//   }
// };