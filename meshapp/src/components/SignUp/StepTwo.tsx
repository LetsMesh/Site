import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  Modal,
  Typography,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SyncIcon from "@mui/icons-material/Sync";
import { useState } from "react";
import { IFormInput } from "./SignUp";
import { UseFormGetValues } from "react-hook-form";

const modalStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  margin: "auto",
  width: 400,
  height: 400,
  border: "2px solid #000",
  borderRadius: "50%",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "#D9D9D9",
  color: "#27383A",
  textAlign: "center",
};

export default function StepTwo(props: {
  getValues: UseFormGetValues<IFormInput>;
}) {
  //this holds the email from the firststep to be used for verification
  const emailAddress = props.getValues("email");

  //for opening/closing pending verification bubble
  const [pendingOpen, setPendingOpen] = useState(false);
  const handlePendingOpen = () => setPendingOpen(true);
  const handlePendingClose = () => setPendingOpen(false);

  //for opening/closing successful verification bubble

  const [successOpen, setSuccessOpen] = useState(false);
  const handleSuccessOpen = () => setSuccessOpen(true);
  const handleSuccessClose = () => setSuccessOpen(false);

  //returns modal for success verifcation
  function SuccessVerification() {
    return (
      <Modal open={successOpen} onClose={handleSuccessClose}>
        <Box sx={modalStyle}>
          <Grid container direction="column" alignItems={"center"}>
            <Grid item>
              <Typography variant="h4">
                <b>Yay, You're Verified!</b>
              </Typography>
            </Grid>
            <Grid item sx={{ mt: 2 }}>
              <Typography variant="body2">
                <b>
                  Continue on to the next step to start building your profile.
                </b>
              </Typography>
            </Grid>
            <Grid item sx={{ mt: 2 }}>
              <Typography variant="body2">
                <b>
                  Please consider some optional sign in settings such as
                  2-factor authentication or 3rd party account connection &
                  login
                </b>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    );
  }
  //returns modal for pending verifcation
  //currently the "send verification link" serves to just close the pending bubble and open the success bubble
  //will need to rework button to actually send verification and open the success bubble upon actual verification
  function PendingVerification() {
    return (
      <Modal open={pendingOpen} onClose={handlePendingClose}>
        <Box sx={modalStyle}>
          <Grid container direction="column" alignItems={"center"}>
            <Grid item>
              <Typography variant="h4">
                <b>Verification Sent!</b>
              </Typography>
            </Grid>
            <Grid item sx={{ mt: 2 }}>
              <Typography variant="body2">
                <b>Check your email!</b> We have sent you an email. Please
                follow the instructions sent in the email.
              </Typography>
            </Grid>
            <SyncIcon color="success" sx={{ mt: 2 }} />
            <Grid item sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                <b>{emailAddress}</b>
              </Typography>
            </Grid>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => {
                handleSuccessOpen();
                handlePendingClose();
              }}
            >
              Send Verify Link
            </Button>
            <Link
              underline="always"
              component={"button"}
              variant="h6"
              sx={{ mt: 4 }}
              onClick={handlePendingClose}
            >
              <Typography color={"#247C67"}>
                Trouble Verifying? Give Up
              </Typography>
            </Link>
          </Grid>
        </Box>
      </Modal>
    );
  }

  return (
    <Grid
      container
      bgcolor={"cardBackground.main"}
      color={"text.main"}
      height="80vh"
      alignItems={"center"}
    >
      <Grid container justifyContent={"center"}>
        <Grid item xs={10}>
          {/*keeps header and mail icon vertically centered*/}
          <Grid container direction="column" alignItems="center">
            {/*header*/}
            <Grid container xs={12} justifyContent={"center"}>
              <Grid
                container
                xs={8}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography variant="h4" textAlign={"center"}>
                  <b>Verify Your Email</b>
                </Typography>
              </Grid>

              {/*mail icon*/}
              <Grid
                container
                xs={8}
                sm={4}
                height={0}
                alignSelf={"center"}
                alignItems="center"
                sx={{
                  "@media(max-width:600px)": {
                    height: "auto",
                    order: "-1",
                    marginBottom: 5,
                  },
                  "@media(max-width:300px),  (max-height:400px), (max-width:600px) and (max-height: 550px)":
                    { margin: 0 },
                }}
              >
                <Grid
                  container
                  height={0}
                  position={"relative"}
                  alignItems={"center"}
                  sx={{
                    "@media(max-width:600px)": {
                      height: "auto",
                      justifyContent: "center",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: "#D9D9D9",
                      position: "absolute",
                      width: 200,
                      height: 200,
                      marginTop: 20,
                      "@media(max-width:600px)": {
                        width: 150,
                        height: 150,
                        position: "static",
                        margin: 0,
                      },
                      "@media(max-height:400px), (max-width:300px), (max-width:480px) and (max-height:480px)":
                        {
                          width: 100,
                          height: 100,
                        },
                    }}
                  >
                    <MailOutlineIcon
                      sx={{
                        width: "80%",
                        height: "80%",
                        color: "mailIconColor.main",
                      }}
                    />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            {/*Keeps the rest of the verification message horizontally aligned with the header*/}
            <Grid
              container
              xs={8}
              direction={"column"}
              alignItems={"center"}
              alignSelf={"flex-start"}
              sx={{
                "@media(max-width:600px)": {
                  alignSelf: "center",
                },
                "*": {
                  "@media(max-width:430px),  (max-height:400px), (max-width:600px) and (max-height: 630px)":
                    { margin: 0 },
                },
              }}
            >
              <Grid container sm={6} sx={{ mt: 2 }}>
                <Typography variant="body1" textAlign={"center"}>
                  <b>Why do we verify?</b> To ensure that the email you provided
                  can be accessed by you so we can send you more memes.
                </Typography>
              </Grid>
              <Grid
                item
                sx={{ mt: 5 }}
                direction="column"
                alignItems={"center"}
              >
                <Typography variant="h6" textAlign="center">
                  <b>{emailAddress}</b>
                </Typography>

                {/*currently just opens the pending verification bubble, need to rework to actually send verification email"*/}
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  size="large"
                  onClick={handlePendingOpen}
                >
                  Send Verify Link
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <PendingVerification />
      <SuccessVerification />
    </Grid>
  );
}
