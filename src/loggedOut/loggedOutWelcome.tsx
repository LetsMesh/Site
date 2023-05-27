import React from "react"
import { Typography, Grid, Button } from "@mui/material"

export default function welcomeMessage() {

    return (
        <Grid item container xs={3} direction="column" p={5} rowGap={2} alignItems="center" color="#F2E8DE">
            <Typography variant="h1" fontWeight={600} fontSize={'36px'} lineHeight={'36px'} textAlign={'center'}>Find Your Perfect Mentor or Mentee with Mesh</Typography>
            <Typography fontWeight={250} fontSize={'24px'} lineHeight={'32px'} textAlign={'center'}>Unlock Your Potential with Expert Guidance and Support.</Typography>
            <Button variant="contained"
                sx={{
                    background: '#68D391',
                    textDecoration: 'uppercase',
                    padding: '6px 16px',
                    fontSize: '20px',
                    lineHeight: '24px',
                    minWidth: '250px',
                    height: '50px',
                    borderRadius: '15px'
                }}>Sign Up</Button>
        </Grid>
    )
}
