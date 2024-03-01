import React, { useState } from "react";
import {
  Button,
  Grid,
  Link,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useEffect } from "react";
import { errorHandler } from "../config/errorHandlerModule";

interface ComponentProps {
  updateShowForgotPasswordState: () => void;
}

const LoginScreen = (props: ComponentProps) => {

  const [formData, setFormData] = useState({ user: null, pass: null });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user_id']);

  useEffect(() =>{},[cookies]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await axiosInstance.post('accounts/login/',{
      "email":formData.user,
      "password":formData.pass
    })
      .then((axiosResponse) => {
        if(axiosResponse.data.enabled_2fa){
          setCookie('user_id', axiosResponse.data.user_id, { path:'/', maxAge:150 });
          axiosInstance.post('accounts/set-two-factor-auth/', {
            "accountID":axiosResponse.data.user_id
          })
          .then(() => {
            navigate('/otp');
          })
          .catch(errorHandler);  // Somehow, user's account ID could not be found
        }
        else{
          navigate('/logged_in_home')
        }
      })
      .catch(errorHandler);  // User attempted to login and an error occured
  }

  return (
    <Grid
      item
      container
      direction="column"
      spacing={3}
      sx={{ alignItems: "center", color: "text.main" }}
    >
      <Grid
        item
        xs
        sx={{ alignSelf: "flex-start", textAlign: "left", mx: "15%" }}
      >
        <Typography variant="h2" fontWeight={"bold"}>
          Login
        </Typography>
      </Grid>
      <Grid item xs sx={{ width: "70%" }}>
        <Stack spacing={2}>
          <TextField
            id="user"
            type="text"
            onChange={handleChange}
            label="Email"
          />
          <TextField
            id="pass"
            type="password"
            onChange={handleChange}
            label="Password"
          />
        </Stack>
      </Grid>
      <Grid item xs sx={{ textAlign: "center", width: "100%" }}>
        <form onSubmit={handleSubmit}>
          <Button variant="contained" type="submit" sx={{ width: "70%" }}>
            Login
          </Button>
        </form>
      </Grid>
      <Grid item xs sx={{ textAlign: "center", alignItems: "center" }}>
        <Stack spacing={2}>
          <Link
            onClick={() => props.updateShowForgotPasswordState()}
            href="#"
            sx={{
              textDecoration: "underline",
              fontSize: "1.5em",
              color: "text.main",
            }}
          >
            Forgot Password
          </Link>
          <Typography variant="h5" fontWeight="bold">
            OR
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs width={"100%"}>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <Button
            sx={{
              maxWidth: "70%",
              minWidth: "15em",
              bgcolor: "#D9D9D9",
              color: "black",
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: "#D9D9D9" },
            }}
          >
            SIGN IN WITH GOOGLE
          </Button>
          <Button
            sx={{
              maxWidth: "70%",
              minWidth: "15em",
              bgcolor: "#748ADA",
              color: "white",
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: "#748ADA" },
            }}
          >
            SIGN IN WITH DISCORD
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

const ForgotPasswordScreen = (props: ComponentProps) => {

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
}

const LoginWindow = () => {

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const updateShowForgotPasswordState = () => {
    setShowForgotPassword(prevState => !prevState)
  };
  return(
    showForgotPassword ? <ForgotPasswordScreen updateShowForgotPasswordState={updateShowForgotPasswordState} /> : <LoginScreen updateShowForgotPasswordState={updateShowForgotPasswordState} />
  );

};

export default LoginWindow;
