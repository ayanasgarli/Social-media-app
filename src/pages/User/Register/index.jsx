import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, FormControlLabel, Checkbox, Grid } from '@mui/material';
import Swal from 'sweetalert2';
import { getAllUsers, postUser } from '../../../services/api/users'; 

import '../Login/index.module.css';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/,
      'Password must contain at least 5 characters, one uppercase, one lowercase, and one number'
    )
    .required('Password is required'),
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});


const Register = () => {
  const initialValues = {
    username: '',
    password: '',
    fullName: '',
    email: '',
    confirmPassword: '',
    isPublic: false,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const users = await getAllUsers(); 
      const { username, email } = values;
      const userExists = users.some((user) => user.username === username || user.email === email);

      if (userExists) {
        Swal.fire({
          icon: 'error',
          title: 'Already Registered',
          text: 'You have already registered.',
          confirmButtonText: 'OK',
        });
      } else {
        await postUser(values);
        Swal.fire({
          icon: 'success',
          title: 'Registered Successfully!',
          text: 'You have registered successfully.',
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
    <div className="container" style={{margin: '60px 460px'}}>
      <Typography variant="h4" style={{ color: 'whitesmoke', textAlign: 'center' }} gutterBottom>
        Sign Up Form
      </Typography>
      <Formik initialValues={initialValues} validationSchema={RegisterSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="form" style={{ width: '600px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', padding: '30px', borderRadius: '8px', backgroundColor: 'whitesmoke' }}>
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field name="fullName">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Full Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      helperText={<ErrorMessage name="fullName" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={6}>
                <Field name="email">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      helperText={<ErrorMessage name="email" />}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
                <Field name="confirmPassword">
                  {({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      label="Confirm Password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      helperText={<ErrorMessage name="confirmPassword" />}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Checkbox
                  name="isPublic"
                  color="primary"
                />
              }
              label="Is Public?"
              style={{ marginTop: '15px' }}
            />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
              disabled={isSubmitting}
              style={{ marginTop: '15px' }}
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;