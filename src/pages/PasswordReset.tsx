import { useForm } from "react-hook-form";
import { Button, Divider, Grid, Link, Stack, Skeleton, Typography, TextField, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState } from "react";
import { axiosInstance } from "../config/axiosConfig";
import '../fonts/fonts.css'

const theme = createTheme({
    palette:{
      primary: {
        main: '#68D391'
      },
    },
    typography:{
      fontFamily: 'CustomFont'
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 25,
            width: '75%',
            height: '4.5rem',
            fontSize: '1.5rem',
          },
        },
      },
    },
  });

export const PasswordReset = () => {

    const passwordResetConfirmedEndpoint = 'user/reset/confirmed'

    // input validation on password reset form 
    const { register, handleSubmit, formState: { errors } } = useForm();

    // stores password inputs in state
    const [formData, setFormData] = useState({
        password: '',
        confirmedPassword: '',

    });

    // updates form data in state when input fields detect change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        })
    }

    // submit user data to backend
    const onSubmit = () => {
        if (formData.password == formData.confirmedPassword){
            const res = axiosInstance.post(passwordResetConfirmedEndpoint,{
              newpassword: formData.confirmedPassword
          }).then(
            (res) => {
              console.log(res.data)
            }
          )
        } else {
          console.log("Passwords must match!")
        }

        console.log("password: " + formData.password)
        console.log("confirmed password: " + formData.confirmedPassword)
    }

    return (
      <Box sx={{ backgroundColor: '#097D66', padding: '20px' }}>
        <ThemeProvider theme={theme}>
        <Grid container wrap="nowrap" direction="column" spacing={5} p={2} sx={{ boxShadow: 10, margin: '20em auto', maxWidth: '50%', minWidth: '480px', bgcolor: 'background.default', color: 'text.primary', borderRadius: 5 }}>
          <Grid item>
          <Typography variant="h2" fontWeight={550} sx={{ marginLeft: 'auto' }} align='center'>
            Password Reset
          </Typography>
          <Typography variant="h5" fontWeight={400} sx={{ marginLeft: 'auto' }} align='center'>
            Please enter your new password
          </Typography>
        </Grid>
        <Grid item  sx={{ width: '70%' }}>
          <Stack spacing={2}>
            <TextField type="password" label="Password" {...register("password", { required: true })} onChange={handleChange} />
            {errors.password && <p>New password required to reset password</p>}
            <TextField type="password" label="Confirm Password" {...register("confirmedPassword", { required: true})} onChange={handleChange} />
            {errors.confirmedPassword && <p>Please re-enter new password</p>}
          </Stack>
        </Grid>
        <Grid item >
            <Button variant="contained" sx={{ width: '15em', color: 'white' }} onClick={handleSubmit(onSubmit)}>
              <Typography variant="button" >
                Reset Password
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
      </Box>
    )
}