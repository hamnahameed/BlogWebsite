// src/LoginPage.js
import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Avatar, CssBaseline, Paper
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { toast } from 'react-toastify';

const theme = createTheme();

const LoginPage = ({ setIsAuthenticated }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginData;

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', loginData);

      console.log("Login Response:", res.data);

      // ✅ username directly from backend response
      const { token, user } = res.data;
      console.log("Username:", user.username);

      if (res.status === 200) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', user.username);
        localStorage.setItem('email', user.email);

        setIsAuthenticated(true);

        toast.success("Login successfully");
        navigate('/');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
      console.error(err.response?.data);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          {message && <Typography color="error">{message}</Typography>}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'secondary.main',
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: 'secondary.main',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
              autoComplete="current-password"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'secondary.main',
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: 'secondary.main',
                  },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: '20px',
                mt: 3,
                mb: 2,
                width: "200px",
                display: "block",
                mx: "auto",
                backgroundColor: 'secondary.main',
                '&:hover': {
                  backgroundColor: '#AA96DA',
                },
              }}
            >
              Login
            </Button>

            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Typography align="center" fontSize="14px">
                Don't have an Account? Signup
              </Typography>
            </Link>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
