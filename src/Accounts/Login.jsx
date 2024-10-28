import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import login from "../assets/login.png"
import styled from '@emotion/styled';
import { apiurl } from '../../Constants/Apiurl';
import { toast } from 'react-toastify';

import HomeNavbar from '../Components/HomeNavbar';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to={"/"} className='hover:underline text-blue-400'>
      IMDB
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

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

const Login = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const navigate = useNavigate();




  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const [remember, setRemember] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    const { username, password } = values;


     console.log(`${apiurl}/Login/${username}/${password}`);
     
     const apiResponse = await axios.post(`${apiurl}/Login`, { username, password }, {
      withCredentials: true,
    });
    

    console.log(apiResponse)
    if (apiResponse.data.success) {
      localStorage.setItem('login', apiResponse.data.data.user.username);
      localStorage.setItem('usertoken', apiResponse.data.data.token);
      toast.success("Login success");


      navigate('/');
    } else {
      toast.error("Invalid credentials");
    }


    setSubmitting(false);
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <HomeNavbar/>
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "white" }}>
            <img src={login} alt="login" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Box component={Form} noValidate sx={{ mt: 1, width: '100%' }}>
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <ErrorMessage name="username" component="div" className="error text-red-600" />
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
                <ErrorMessage name="password" component="div" className="error text-red-600" />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" onChange={() => setRemember(!remember)} />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting || !remember}

                >
                  Sign In
                </Button>
                <Grid container justifyContent={"end"}>

                  <Grid item>
                    <Link to="/Register" style={{ textDecoration: 'underline' }} className='text-blue-500 '>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;