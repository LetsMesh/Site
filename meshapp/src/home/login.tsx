import React from 'react';
import { Button, Divider, Grid, Skeleton, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoginInput from '../components/login-form';

const theme = createTheme({
    components : {
        MuiButton : {
            styleOverrides : {
                root : {
                    borderRadius : 25,
                    width : '75%',
                    height : '4.5rem',
                    fontSize : '1.5rem',
                },
            },
        },
    },
});

const SignUp = () => {
    return (
        <Grid container direction="column" spacing={5} sx={{ textAlign : 'center', alignItems : 'center' }}>
            <Grid item xs width={'80%'}>
                <Typography variant="h2" fontWeight={'bold'}>
                    {'Don\'t have an account with us yet?'}
                </Typography>
            </Grid>
            <Grid item xs>
                <Button variant="contained" sx={{ width : '15em' }}>
                    {'Sign Up >'}
                </Button>
            </Grid>
            <Grid item xs>
                <Skeleton variant="rounded" height={'15em'} width={'30em'} />
            </Grid>
        </Grid>
    );
};

const Login = () => {
    return (
        <ThemeProvider theme={theme}>
            <Grid
                container
                wrap="nowrap"
                spacing={5}
                p={2}
                sx={{
                    boxShadow : 10,
                    margin : '20em auto',
                    maxWidth : '50%',
                    minWidth : '1000px',
                    bgcolor : 'background.default',
                    color : 'text.primary',
                    borderRadius : 5,
                }}
            >
                <Grid item xs>
                    <SignUp />
                </Grid>
                <Grid item xs={1}>
                    <Divider orientation="vertical" />
                </Grid>
                <Grid item xs>
                    <LoginInput />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};
export default Login;
