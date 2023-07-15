import React, { useEffect } from 'react';
import { Button, TextInput, Center } from '@mantine/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { login } from './store/actions';

const validationSchema = yup.object({
  employeeID: yup
    .string('Enter your employee ID')
    .required('employeeID is required'),
  password: yup
    .string('Enter your password')
    .min(1, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

function Login({ login, isAuthenticated, authLoading, loading }) {
  const navigate = useNavigate();
  const location = useLocation();
  const formik = useFormik({
    initialValues: {
      employeeID: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { employeeID, password } = values;
      await login(employeeID, password);

      navigate('/mission');
    },
  });

  if (isAuthenticated) {
    if(location.state){
      return <Navigate to={location.state.from}/>
    } else {
      return <Navigate to='/'/>
    }
  }

    return (
      <Center maw={400} h={'100vh'} mx='auto'>
       <form onSubmit={formik.handleSubmit}>
         <TextInput
           id='employeeID'
           name='employeeID'
           label='ID'
           placeholder='Employee ID'
           inputWrapperOrder={['label', 'input', 'description', 'error']}
           value={formik.values.employeeID}
           onChange={formik.handleChange}
           error={formik.errors.employeeID}
         />
         <TextInput
           id='password'
           name='password'
           label='Password'
           placeholder='Password'
           value={formik.values.password}
           onChange={formik.handleChange}
           error={formik.errors.password}
         />
         <Center>
           <Button type='submit' mt={{ sm: '1rem' }}>
             Login
           </Button>
         </Center>
       </form>
     </Center>
   );
  


}

const mapStateToProps = (state) => ({
  isAuthenticated: state.getIn(['user', 'isAuthenticated']),
  authLoading: state.getIn(['user', 'authLoading']),
  isLoginSnackbarVisible: state.getIn(['user', 'isLoginSnackbarVisible']),
  loginSnackbarMessage: state.getIn(['user', 'loginSnackbarMessage']),
  loginSnackbarType: state.getIn(['user', 'loginSnackbarType']),
  loading: state.getIn(['user', 'loading'])
});

export default connect(mapStateToProps, {
  login,
})(Login);
