import { Avatar, Box, Button, Grid, Link, Modal, Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SyncIcon from '@mui/icons-material/Sync';
import { useState } from "react";

const signUpStyle = {
  paddingTop: 100,
  paddingBottom: 100,
  marginRight: 100,
  marginLeft: 100,
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "32%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};



export default function StepTwo() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function successVerification(){
    <Modal open={true}>
      <Box sx={modalStyle}>
        <Grid container direction="column" alignItems={'center'}>
            <Grid item>
              <Typography variant='h4'>
                <b>Yay, You're Verified!</b>
              </Typography>
            </Grid>
            <Grid item sx={{ mt: 2 }}>
              <Typography variant="body2">
                <b>Continue on to the next step to start building your profile.</b>
              </Typography>
            </Grid>
            <Grid item sx={{ mt: 2 }}>
              <Typography variant="body2">
                <b>Please consider some optional sign in settings such as 2-factor authentication or 3rd party account connection & login</b>
              </Typography>
            </Grid>
        </Grid>
      </Box>
    </Modal>
  }

  return (
    <>
      <Grid container style={signUpStyle}>
        <Grid item xs={6}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h4">
                <b>Verify Your Email</b>
              </Typography>
            </Grid>
            <Grid item sx={{ mt: 2 }}>
              <Typography variant="body1">
                <b>Why do we verify?</b> To ensure that the email you provided
                can be accessed by you so we can send you more memes.
              </Typography>
            </Grid>
            <Grid item sx={{ mt: 5 }}>
              <Typography variant="h6">
                <b>email@address.com</b>
              </Typography>
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                color="success"
                size="large"
                onClick={handleOpen}
              >
                Send Verify Link
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} style={{ justifyContent: "center", display: "flex" }}>
          <Grid item>
            <Avatar sx={{ width: 285, height: 281 }}>
              <MailOutlineIcon
                color="success"
                sx={{ width: 200, height: 250 }}
              />
            </Avatar>
          </Grid>
        </Grid>
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Grid container direction="column" alignItems={'center'}> 
            <Grid item>
              <Typography variant="h4">
                <b>Verification Sent!</b>
              </Typography>
            </Grid>
            <Grid item sx={{ mt: 2 }} >
              <Typography variant="body2">
                <b>Check your email!</b> We have sent you an email. Please follow the instructions sent in the email.
              </Typography>
            </Grid>
            <SyncIcon color="success" sx={{ mt: 2 }}/>
            <Grid item sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                <b>email@address.com</b>
              </Typography>
            </Grid>
            <Button variant = 'contained' sx={{ mt: 2 }} disabled>
              Send Verify Link
            </Button>
            <Link underline = "always" component={"button"} variant="h6" sx={{ mt: 4 }}>
              <Typography>
                Trouble Verifying? Give Up
              </Typography>
            </Link>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
