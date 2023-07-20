import { Grid, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosConfig";

const ForgotPassword = () => {

    const forgotPasswordEndpoint: string = '/user/reset'
  
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState('');
  
    const [formData, setFormData] = useState({
      email: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      }
  
      )
    }
  
    const onClickSend = () => {
      const res = axiosInstance.post(forgotPasswordEndpoint, {
        email: formData.email
      })
    
      console.log("email: " + formData.email)
    }
    
    return (
      <Grid spacing={2} container item direction="column" xs>
        <Grid item container direction="column" spacing={5} sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Grid item xs>
            <Typography variant="h2" fontWeight={'bold'} sx={{ color: 'text.main', marginLeft: 'auto' }}>
              Forgot Password
            </Typography>
          </Grid>
          <Grid item xs sx={{ width: '70%' }}>
            <TextField type="text" label="Email" {...register("email", { required: true })} onChange={handleChange}/>
          </Grid>
          <Grid item xs>
            <Button variant="contained" sx={{ borderRadius: 25, width: '15em' }} onClick={onClickSend}>
              Send Link to Email
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  export default ForgotPassword