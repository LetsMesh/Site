import { Avatar, Box, Button, Grid, Modal, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";



const signUpStyle = {
  paddingTop: 15,
  paddingBottom: 15,
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function StepTwo() {

	const [open,setOpen] = useState(false)
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
		
  return (
    <>
      <Grid container style={signUpStyle}>
        <Grid item xs={6}>
          <Grid container direction="column" alignItems={"center"}>
            <Grid item>
              <Typography variant="h3">Verify Your Email</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Why do we verify?To ensure that the email you provided can be
                accessed by you so we can send you more memes
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">email@address.com</Typography>
              <Button variant="contained" color="success" onClick={handleOpen}>
                Send Verify Link
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} style={{ justifyContent: "center", display: "flex" }}>
          <Grid item>
            <Avatar
              alt="Email icon"
              src="email.png"
              sx={{ width: 285, height: 281 }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Modal
        open={open}
				onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
