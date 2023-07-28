import { Grid, Typography, TextField, Button, Link, Stack } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosConfig";

interface ComponentProps {
  updateShowForgotPasswordState: () => void;
}

const ForgotPassword = (props: ComponentProps) => {

    const forgotPasswordEndpoint: string = '/user/reset';
  
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState('');
  
    const [formData, setFormData] = useState({
      email: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    };
  
    const onClickSend = () => {
      const res = axiosInstance.post(forgotPasswordEndpoint, {
        email: formData.email
      })
      console.log("email: " + formData.email)
    };

    const onClickReturn = () => {
      props.updateShowForgotPasswordState()
    }

    return (
      <Grid
      container
      direction="column"
      alignItems="center"
      sx={{
        textAlign:'center',
        width:'100%',
        margin: "auto",
        bgcolor: "cardBackground.main",
        color: "text.main",
        borderRadius: 5,
      }}
    >
      <Grid container spacing={3} p={2} sx={{ width:'100%', margin:'auto' }}>
          <Grid xs sx={{ textAlign:'center' }} item>
            <Typography variant="h2" sx={{ fontWeight: 'bold', marginLeft: 'auto', textAlign:'center' }}>
              Forgot Password
            </Typography>
          </Grid>
          <Grid xs item>
            <Stack spacing={3} sx={{ alignItems:'center' }}>
              <TextField sx={{ width:'90%' }} type="text" label="Email" {...register("email", { required: true })} onChange={handleChange}/>
              <Button variant="contained" sx={{ borderRadius: 25, width: '15em' }} onClick={onClickSend}>
                Send Link to Email
              </Button>
              <Link sx={{ color:'text.main', fontWeight:'bold' }} onClick={onClickReturn}>
                Return to Login
              </Link>
            </Stack>
          <Grid>
        </Grid>
      </Grid>
      </Grid>
      </Grid>
    );
  };

  export default ForgotPassword;