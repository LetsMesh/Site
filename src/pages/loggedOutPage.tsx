import { Button, Grid, Link, Stack, TextField, ThemeProvider, Typography, createTheme, } from '@mui/material';
import React from 'react';
import "../App.css"

import loggedOutNav from '../components/loggedOut/loggedOutNavBar';
import welcomeMessage from '../components/loggedOut/loggedOutWelcome';
import advertSection from "../components/loggedOut/advertSection"
import reviewsSection from '../components/loggedOut/reviewSection';



export default function LoggedOutPage() {

    const theme = pageTheme();

    return (

        <ThemeProvider theme={theme} >
            <Grid container sx={{
                flexDirection: 'column'

            }}>
                {loggedOutNav()}
                {/*-------------------------HEADER-------------------------*/}
                <Grid item container direction="column" justifyContent="space-evenly" p={5} alignItems="center" xs={12} sx={{
                    background: '#0B7D66',
                    '@media (min-width: 600px)': {
                        flexDirection: "row"
                    }

                }}>

                    {/*-------------------------------Welcome Message--------------------------------------*/}

                    {welcomeMessage()}

                    {/*-------------------------------Login Bubble--------------------------------------*/}

                    <Grid item container xs={8} sm={6} md={4} sx={{ background: "blue" }}>


                        <Grid spacing={2} container item direction="column" xs>
                            <Grid item container direction="column" spacing={5} sx={{ textAlign: 'center', alignItems: 'center' }}>
                                <Grid item xs>
                                    <Typography variant="h2" fontWeight={'bold'} sx={{ marginLeft: 'auto' }}>
                                        Login
                                    </Typography>
                                </Grid>
                                <Grid item xs sx={{ width: '70%' }}>
                                    <Stack spacing={2}>
                                        <TextField type="text" label="Email" />
                                        <TextField type="password" label="Password" />
                                    </Stack>
                                </Grid>
                                <Grid item xs>
                                    <Stack spacing={2}>
                                        <Button variant="contained" sx={{ width: '15em' }}>
                                            Login
                                        </Button>
                                        <Link href="#" sx={{ color: 'black', textDecoration: 'underline', fontSize: '1.5em' }}>
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

                    </Grid>
                </Grid>


                {/*-----------------------Advertisement Section-------------------------------------*/}
                {advertSection()}


                {/*----------------------------Review Section-----------------------------------------*/}
                {reviewsSection()}
            </Grid>
        </ThemeProvider>

    )





}
/*theme for font sizes*/
function pageTheme() {
    const theme = createTheme();



    theme.typography.h1 = {
        fontSize: "30px", lineHeight: "30px", fontWeight: "600",
        '@media (min-width:600px)': {
            fontSize: '40px',
            lineHeight: '40px'
        },
        '@media (min-width:900px)': {
            fontSize: '48px',
            lineHeight: '48px'
        },
        '@media (min-width: 1600px)': {
            fontSize: '60px',
            lineHeight: '60px'
        }
    }

    theme.typography.h2 = {
        fontSize: '22.5px', lineHeight: '22.5px', fontWeight: '600',
        '@media (min-width:600px)': {
            fontSize: '30px',
            lineHeight: '30px'
        },
        '@media (min-width:900px)': {
            fontSize: '36px',
            lineHeight: '36px',

        },
        '@media (min-width: 1600px)': {
            fontSize: '45px',
            lineHeight: '45px'
        }
    }

    theme.typography.h3 = {
        fontSize: '20px', lineHeight: '20px', fontWeight: "600",
        '@media (min-width:600px)': {
            fontSize: '27px',
            lineHeight: '27px'
        },
        '@media (min-width:900px)': {
            fontSize: "30px",
            lineHeight: "40px"
        },
        '@media (min-width: 1600px)': {
            fontSize: '40px',
            lineHeight: '40px'
        }
    }

    theme.typography.h4 = {
        fontSize: "18.75px", lineHeight: "25px", fontWeight: "250",
        '@media (min-width:600px)': {
            fontSize: '30px',
            lineHeight: '33.5px'
        },
        '@media (min-width:900px)': {
            fontSize: "30px",
            lineHeight: "40px"
        },
        '@media (min-width: 1600px)': {
            fontSize: '37.5px',
            lineHeight: '50px'
        }
    }

    theme.typography.body1 = {
        fontSize: "15px", lineHeight: "20px",
        '@media (min-width:600px)': {
            fontSize: '20px',
            lineHeight: '27px'
        },
        '@media (min-width:900px)': {
            fontSize: "24px",
            lineHeight: "32px",
        },
        '@media (min-width: 1600px)': {
            fontSize: '30px',
            lineHeight: '40px'
        }
    }

    theme.typography.body2 = {
        fontSize: "10px", lineHeight: "13px",
        '@media (min-width:600px)': {
            fontSize: '13.5px',
            lineHeight: '17.5px'
        },
        '@media (min-width:900px)': {
            fontSize: "16px",
            lineHeight: "21px",
        },
        '@media (min-width: 1600px)': {
            fontSize: '20px',
            lineHeight: '26.25px'
        }
    }

    theme.typography.button = {
        fontSize: '12.5px', lineHeight: '15px',
        '@media (min-width:600px)': {
            fontSize: '16.5px',
            lineHeight: '20px'
        },
        '@media (min-width:900px)': {
            fontSize: '20px',
            lineHeight: '24px'
        },
        '@media (min-width: 1600px)': {
            fontSize: '25px',
            lineHeight: '30px'
        }
    }

    return theme;
}
