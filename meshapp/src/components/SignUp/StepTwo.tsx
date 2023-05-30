import { Avatar, Button, Grid, Typography } from "@mui/material";

const signUpStyle = {
    paddingTop: 15,
    paddingBottom: 15
}

export default function StepTwo(){
    return(
        <>
                <Grid container style={signUpStyle}>
                    <Grid item xs = {6}>
                        <Grid container direction="column" alignItems={'center'}>
                            <Grid item>
                                <Typography variant="h3">Verify Your Email</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">Why do we verify?To ensure that the email
                                you provided can be accessed by you so we can send you more memes</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4">email@address.com</Typography>
                                <Button variant="contained" color='success'>Send Verify Link</Button>
                            </Grid>
                        </Grid>
                    </Grid> 
                    <Grid item xs = {6}>
                        <Grid item>
                            <Avatar alt="Email icon"
                            src="email.png"
                            sx={{width: 285, height: 281}}
                            />
                        </Grid>
                    </Grid> 
                </Grid>
        </>
    )
}