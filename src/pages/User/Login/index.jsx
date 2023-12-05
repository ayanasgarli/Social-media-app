import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'; 

import './index.css';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const { username, password } = values;
  
    try {
      const response = await axios.get(`https://656ec3a06529ec1c6236974d.mockapi.io/api/users?search=${username}&password=${password}`);
      const userData = response.data;
  
      if (userData.length > 0) {
        localStorage.setItem('userData', JSON.stringify(userData));
  
        Swal.fire({
          icon: 'success',
          title: 'Sign In Successful!',
          text: 'You have successfully signed in.',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Credentials',
          text: 'Incorrect username or password. Please try again.',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '50px' }}>
      <Typography variant="h4" style={{ color: '#9C27B0' }} gutterBottom>
        Sign In Form
      </Typography>
      <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form style={{ width: '300px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', padding: '30px', borderRadius: '8px' }}>
            <Field name="username">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  helperText={<ErrorMessage name="username" />}
                />
              )}
            </Field>
            <Field name="password">
              {({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  helperText={<ErrorMessage name="password" />}
                />
              )}
            </Field>
            <FormControlLabel control={<Checkbox name="isPublic" color="primary" />} label="Remember me" />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
              disabled={isSubmitting}
              style={{ marginTop: '15px' }}
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
      <Typography variant="body1" style={{ marginTop: '25px' }}>
        Don't you have an account? <Link to="/register" style={{ color: 'black' }}>Sign up here</Link>
      </Typography>
    </div>
  );
};

export default Login;
