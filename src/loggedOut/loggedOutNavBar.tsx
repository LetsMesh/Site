import React from "react";
import { Typography, Grid, Link, Button } from "@mui/material";






export default function loggedOutNav() {


    return (
        <Grid container direction="row" xs={12} sx={{ background: "#0B7D66" }} p={"20px"}>

            <Grid container item xs={3} alignItems={"flex-end"} >
                <Typography color={"#F2E8DE"} fontSize="48.36px" lineHeight="48.36px" fontWeight={600}>mesh</Typography>

            </Grid>

            <Grid item container xs={9} direction="row" justifyContent="flex-end" spacing={5}  >
                <Grid item>
                    <Link href="#">
                        <Typography fontSize="30px" lineHeight="40px" fontWeight={250} color={"#F2E8DE"} sx={{ textDecoration: "underline" }}>home</Typography>
                    </Link>
                </Grid>

                <Grid item>
                    <Link href="#">
                        <Typography fontSize="30px" lineHeight="40px" fontWeight={250} color={"#F2E8DE"} sx={{ textDecoration: "underline" }}>about</Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <Button size="medium" color="primary" variant="contained" sx={{ background: "#68D391", padding: "6px 16px" }}>
                        <Typography fontWeight={500} lineHeight="24px" fontSize="14px" textTransform={"uppercase"}>Sign in</Typography>
                    </Button>
                </Grid>
            </Grid>

        </Grid>
    )
}
