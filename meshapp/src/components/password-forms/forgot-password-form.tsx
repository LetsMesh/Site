import { useForm } from "react-hook-form";
import { Button, Divider, Grid, Link, Stack, Skeleton, Typography, TextField, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosConfig";

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

    }

    // TODO: https://github.com/LetsMesh/Site/issues/255

    return (
      <Box sx={{ backgroundColor: 'primary.main', padding: '20px' }}>
        <Grid container wrap="nowrap" alignItems="center" direction="column" spacing={5} p={2} sx={{ boxShadow: 10, margin: '20em auto', maxWidth: '480px', minWidth: '480px', bgcolor: 'secondary.main', color: 'text.primary', borderRadius: 5 }}>
          <Grid item>
          <Typography variant="h3" fontWeight={500} sx={{ marginLeft: 'auto', fontFamily: "cocogoose, sans-serif" }} align='center'>
            Password Reset
          </Typography>
          <Typography variant="h5" fontWeight={400} sx={{ marginLeft: 'auto', fontFamily: "cocogoose, sans-serif"}} align='center'>
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
        <Grid item>
            <Button variant="contained" sx={{ fontSize: '1.5rem', borderRadius: 25, width: '15em', color: 'white' }} onClick={handleSubmit(onSubmit)}>
              <Typography variant="button" >
                Reset Password
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    )
}

export default PasswordReset