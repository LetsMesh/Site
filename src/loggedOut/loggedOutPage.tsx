import { Grid, } from '@mui/material';
import React from 'react';


import loggedOutNav from './loggedOutNavBar';
import welcomeMessage from './loggedOutWelcome';
import advertSection from "./advertSection"
import reviewsSection from './reviewSection';

export default function LoggedOutPage() {





    return (


        <Grid container sx={{
            flexDirection: 'column'

        }}>
            {loggedOutNav()}
            {/*-------------------------HEADER-------------------------*/}
            <Grid item container direction="row" justifyContent="space-evenly" alignItems="center" xs={12} sx={{
                background: '#0B7D66',

            }}>

                {/*-------------------------------Welcome Message--------------------------------------*/}

                {welcomeMessage()}

                {/*-------------------------------Login Bubble--------------------------------------*/}

                <Grid item container xs={4} >



                </Grid>
            </Grid>


            {/*-----------------------Advertisement Section-------------------------------------*/}
            {advertSection()}


            {/*----------------------------Review Section-----------------------------------------*/}
            {reviewsSection()}
        </Grid>
    )





}
