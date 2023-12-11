import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import BASE_URL from '../../../services/api/BASE_URL';
import './index.module.css';
import { UserContext } from '../../../services/context/index';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});


const Login = () => {
  const { setUser } = useContext(UserContext)
  const initialValues = {
    username: '',
    password: '',
  };

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const { username, password } = values;
    try {
      const response = await axios.get(`${BASE_URL}/users?search=${username}&password=${password}`);
      const userData = response.data;
      
      const loggedInUser = userData.find(user => user.username === username && user.password === password);
  
      if (loggedInUser) {
        localStorage.setItem('loggedInUserId', loggedInUser.id);
        setUser(loggedInUser);
        Swal.fire({
          icon: 'success',
          title: 'Sign In Successful!',
          text: 'You have successfully signed in.',
          confirmButtonText: 'OK',
        });
        navigate('/home');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Credentials',
          text: 'Incorrect username or password. Please try again.',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <Typography variant="h4" style={{ color: 'white', textAlign: 'center' }} gutterBottom>
        Sign In Form
      </Typography>
      <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form style={{ width: '300px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', padding: '30px', borderRadius: '8px', backgroundColor:'white' }}>
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