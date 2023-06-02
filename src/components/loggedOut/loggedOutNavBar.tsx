import React from "react";
import { Typography, Grid, Link, Button } from "@mui/material";





//the nav bar for the logged out home page
export default function loggedOutNav() {


    return (


        <Grid container direction="row" xs={12} sx={{ background: "#0B7D66" }} p={"20px"}>


            {/*contains the app name, need to add in image later*/}
            <Grid container item xs={1} md={3} alignItems={"flex-end"} >
                <Typography variant="h1" color={"#F2E8DE"} >mesh</Typography>

            </Grid>

            {/*contains the nav links and sign in button*/}

            <Grid item container xs={11} md={9} direction="row" justifyContent="flex-end" spacing={5}  >
                <Grid item>
                    <Link href="#">
                        <Typography variant="h4" color={"#F2E8DE"} sx={{ textDecoration: "underline" }}>home</Typography>
                    </Link>
                </Grid>

                <Grid item>
                    <Link href="#">
                        <Typography variant="h4" color={"#F2E8DE"} sx={{ textDecoration: "underline" }}>about us</Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <Button size="medium" color="primary" variant="contained" sx={{ background: "#68D391", padding: "6px 16px" }}>
                        <Typography variant="button" >Sign In</Typography>
                    </Button>
                </Grid>
            </Grid>

        </Grid>
    )
}
