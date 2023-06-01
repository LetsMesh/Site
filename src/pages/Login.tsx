import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button, Divider, Grid, Link, Stack, Skeleton, Typography, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PropaneSharp } from '@mui/icons-material';
import { axiosInstance } from '../config/axiosConfig';

// define interface for prop 
interface ComponentProps {
  updateShowForgotPasswordState: () => void;
}

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

const SignUp = () => {
  return (
    <Grid container direction="column" spacing={5} sx={{ textAlign: 'center', alignItems: 'center' }}>
      <Grid item xs width={'80%'}>
        <Typography variant="h2" fontWeight={'bold'}>
          Don't have an account with us yet?
        </Typography>
      </Grid>
      <Grid item xs>
        <Button variant="contained" sx={{ width: '15em' }}>
          {'Sign Up >'}
        </Button>
      </Grid>
      <Grid item xs>
        <Skeleton variant="rounded" height={'15em'} width={'30em'} />
      </Grid>
    </Grid>
  );
};

const LoginInput = (props: ComponentProps) => {

  // log in form input validation 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState('');

  // stores log in form data in state
  const [formData, setFormData] = useState({
		email: '',
    password: '',

	});
  
  // updates form data in state when input fields detect change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    }

    )
  }

  // show forgot password component if user clicks forgot password button
  const forgotPasswordClicked = () => {
    props.updateShowForgotPasswordState()
  }

  // submit user data to backend
  const onSubmit = () => {
    console.log("email: " + formData.email);
    console.log("password: " + formData.password);
  }

  return (
    <Grid spacing={2} container item direction="column" xs>
      <Grid item container direction="column" spacing={5} sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Grid item xs>
          <Typography variant="h2" fontWeight={'bold'} sx={{ marginLeft: 'auto' }}>
            Login
          </Typography>
        </Grid>
        <Grid item xs sx={{ width: '70%' }}>
          <Stack spacing={2}>
            <TextField type="text" label="Email" {...register("email", { required: true })} onChange={handleChange} />
            {errors.email && <p>Email required to log in</p>}
            <TextField type="password" label="Password" {...register("password", { required: true})} onChange={handleChange} />
            {errors.password && <p>Password required to log in</p>}
          </Stack>
        </Grid>
        <Grid item xs>
          <Stack spacing={2}>
            <Button variant="contained" sx={{ width: '15em' }} onClick={handleSubmit(onSubmit)}>
              Login
            </Button>
            <Link href="#" sx={{ color: 'black', textDecoration: 'underline', fontSize: '1.5em' }}  onClick={() => props.updateShowForgotPasswordState()}>
              Forgot Password
            </Link>
            <Typography variant="h5" fontWeight="bold">
              OR
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Button sx={{ bgcolor: '#D9D9D9', color: 'black', '&:hover': { bgcolor: '#D9D9D9' } }}>SIGN IN WITH GOOGLE</Button>
          <Button sx={{ bgcolor: '#748ADA', color: 'white', '&:hover': { bgcolor: '#748ADA' } }}>SIGN IN WITH DISCORD</Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

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
          <Typography variant="h2" fontWeight={'bold'} sx={{ marginLeft: 'auto' }}>
            Forgot Password
          </Typography>
        </Grid>
        <Grid item xs sx={{ width: '70%' }}>
          <TextField type="text" label="Email" {...register("email", { required: true })} onChange={handleChange}/>
        </Grid>
        <Grid item xs>
          <Button variant="contained" sx={{ width: '15em' }} onClick={onClickSend}>
            Send Link to Email
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Login = () => {

    // show forgot password reset form or not
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const updateShowForgotPasswordState = () => {
      if (showForgotPassword == false) {
        setShowForgotPassword(true)
      }
      if (showForgotPassword == true) {
        setShowForgotPassword(false)
      }
    }

  return (
    <ThemeProvider theme={theme}>
      <Grid container wrap="nowrap" spacing={5} p={2} sx={{ boxShadow: 10, margin: '20em auto', maxWidth: '50%', minWidth: '1000px', bgcolor: 'background.default', color: 'text.primary', borderRadius: 5 }}>
        <Grid item xs>
          <SignUp />
        </Grid>
        <Grid item xs={1}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs>
          {showForgotPassword ? <ForgotPassword /> : <LoginInput updateShowForgotPasswordState={updateShowForgotPasswordState} />}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Login;
