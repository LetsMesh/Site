import React from 'react';
import './Login.css';
import { Button, Divider, Grid, Link, Stack, Skeleton, Typography, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          width: '75%',
          fontSize: '1.5rem',
        },
      },
    },
  },
});

const SignUp = () => {
  return (
    <Grid container direction="column" spacing={10} sx={{ textAlign: 'center', alignItems: 'center' }}>
      <Grid item xs>
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

const LoginInput = () => {
  return (
    <Grid spacing={5} container item direction="column" xs>
      <Grid item container direction="column" spacing={5} sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Grid item xs mr={'10rem'}>
          <Typography variant="h2" fontWeight={'bold'} sx={{ marginLeft: 'auto' }}>
            Login
          </Typography>
        </Grid>
        <Grid item xs sx={{ width: '70%' }}>
          <Stack spacing={2}>
            <TextField type="text" label="Username" />
            <TextField type="password" label="Password" />
          </Stack>
        </Grid>
        <Grid item xs>
          <Stack spacing={2}>
            <Button variant="contained" sx={{ width: '15em' }}>
              Login
            </Button>
            <Link href="#" sx={{ textDecoration: 'underline' }}>
              Forgot your password?
            </Link>
            <Typography variant="h5" fontWeight="bold">
              OR
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Button variant="contained">SIGN IN WITH GOOGLE</Button>
          <Button variant="contained">SIGN IN WITH DISCORD</Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

const Login = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={5} p={2} sx={{ boxShadow: 10, margin: '20em auto', width: '50%', bgcolor: 'background.default', color: 'text.primary', borderRadius: 5 }}>
        <Grid item xs p={5}>
          <SignUp />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs>
          <LoginInput />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Login;
