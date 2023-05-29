import { useForm } from "react-hook-form";
import { Button, Divider, Grid, Link, Stack, Skeleton, Typography, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState } from "react";

const theme = createTheme({
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
        console.log("password: " + formData.password)
        console.log("confirmed password: " + formData.confirmedPassword)
    }
    return (
        <ThemeProvider theme={theme}>
        <Grid container wrap="nowrap" spacing={5} p={2} sx={{ boxShadow: 10, margin: '20em auto', maxWidth: '50%', minWidth: '1000px', bgcolor: 'background.default', color: 'text.primary', borderRadius: 5 }}>
          <Grid item xs>
          <Typography variant="h2" fontWeight={'bold'} sx={{ marginLeft: 'auto' }}>
            Complete password reset request
          </Typography>
        </Grid>
        <Grid item xs sx={{ width: '70%' }}>
          <Stack spacing={2}>
            <TextField type="password" label="Password" {...register("password", { required: true })} onChange={handleChange} />
            {errors.password && <p>New password required to reset password</p>}
            <TextField type="password" label="Confirm Password" {...register("confirmedPassword", { required: true})} onChange={handleChange} />
            {errors.confirmedPassword && <p>Please re-enter new password</p>}
          </Stack>
        </Grid>
        <Grid item xs>
            <Button variant="contained" sx={{ width: '15em' }} onClick={handleSubmit(onSubmit)}>
                Reset password
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
    )
}