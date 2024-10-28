import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import bcryptjs from 'bcryptjs';

import * as Yup from 'yup';
import axios from 'axios';
import { GrDocumentUser } from "react-icons/gr";
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { apiurl } from '../../Constants/Apiurl';
import { toast } from 'react-toastify';
import HomeNavbar from '../Components/HomeNavbar';




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/" className='hover:underline text-blue-400'>
      IMDB
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
const PasswordFieldWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .eye-icon {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
`;

export default function SignUp() {
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const navigate = useNavigate();

  const initialValues = {
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    try {
      const hashedPassword = await bcryptjs.hash(values.password, 10);
      const apiResponse = await axios.post(`${apiurl}/Signup`, {
        username: values.username,
        phoneNumber: values.phoneNumber,
        emailaddress: values.email,
        password: hashedPassword,
      });

     

      if (apiResponse?.data?.data?._id) {
        toast.success("User created successfully")
        resetForm();
        setTerms(false);
        navigate("/Login"); // Redirect to home or login after successful registration
      }
       else {
        toast.error("Registration failed")
       }
  
    } catch (error) {
      toast.error("Registration failed")
      console.error('Registration error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
       <HomeNavbar/>
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'white',color:'black' }} className='mx-auto  w-full max-w-sm'>
           
           <GrDocumentUser className='size-8' />
            
         
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Box component={Form} noValidate sx={{ mt: 1, width: '100%' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      autoComplete="given-name"
                      name="username"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      autoFocus
                    />
                    <ErrorMessage name="username" component="div" className="error text-red-600" />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                    <ErrorMessage name="email" component="div" className="error  text-red-600" />
                  </Grid>
                  <Grid item xs={12}>
                    <PasswordFieldWrapper>
                      <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                      />
                      <div className="eye-icon" onClick={toggleShowPassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </PasswordFieldWrapper>
                    <ErrorMessage name="password" component="div" className="error  text-red-600" />
                  </Grid>
                  <Grid item xs={12}>
                    <PasswordFieldWrapper>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        autoComplete="new-password"
                      />
                      <div className="eye-icon" onClick={toggleShowConfirmPassword}>
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </PasswordFieldWrapper>
                    <ErrorMessage name="confirmPassword" component="div" className="error  text-red-600" />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      name="phoneNumber"
                      label="Phone Number"
                      type="text"
                      id="phoneNumber"
                      autoComplete="phoneNumber"
                    />
                    <ErrorMessage name="phoneNumber" component="div" className="error  text-red-600" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I agree to the terms and regulations of the website."
                      onClick={() => setTerms(true)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!terms || isSubmitting}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to={"/Login"} style={{ textDecoration: "underline" }} className='text-blue-500'>
                      Already have an account !
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}