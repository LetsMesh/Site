import React, { useState, useEffect } from "react";
import { Modal, Button, Typography, Fade, Backdrop } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ReactComponent as Logo } from "./2FA-icon.svg";

import "./Popup.css";

/**
 * Component to render a modal to remind users to enable 2FA
 * It should only render once per user
 *
 * @param props
 */
function TwoFactorAuthModal(props: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // On page load, check if user has already been prompted to enable 2FA
  // If not, open the modal and set a flag in localStorage
  useEffect(() => {
    const prompted = localStorage.getItem("promptedFor2FA");
    if (!prompted) {
      handleOpen();
      localStorage.setItem("promptedFor2FA", "true");
    }
  }, []);

  return (
    <div>
      {/* This "Open Modal" button is only used for testing; remove before merging */}
      <Button variant="contained" onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal
        aria-labelledby="2FA-popup"
        aria-describedby="remind-users-to-enable-2FA"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 175 } }}
      >
        <Fade in={open}>
          <div className="modal">
            <FAModalBody onClose={handleClose} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

/**
 * Contents inside TwoFactorAuthModal
 *
 * @param props
 */
function FAModalBody(props: any) {
  return (
    <div className="container">
      <div className="closeBtn">
        <CloseIcon
          sx={{
            color: "#848484",
            "&:hover": {
              color: "black",
            },
            cursor: "pointer",
            transition: "color 0.15s ease-in-out",
          }}
          fontSize="small"
          onClick={props.onClose}
        />
      </div>
      <div>
        <Logo />
      </div>
      <div className="text">
        <Typography sx={{ fontSize: 17, fontFamily: "cocogoose" }}>
          Secure your account with Two-Factor Authentication
        </Typography>
      </div>
      <div className="btn">
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#0B7D66",
            fontFamily: "cocogoose",
            "&:hover": {
              backgroundColor: "#0A6B57",
            },
          }}
          endIcon={<ChevronRightIcon />}
          onClick={props.handleOptIn}
        >
          OPT-IN
        </Button>
      </div>
      <div>
        <Typography
          sx={{
            fontSize: 12,
            fontFamily: "cocogoose",
            color: "#C1C1C1",
            cursor: "pointer",
            transition: "color 0.2s ease-in-out",
            "&:hover": {
              color: "#353535",
            },
          }}
          onClick={props.onClose}
        >
          No thanks
        </Typography>
      </div>
    </div>
  );
}

export default TwoFactorAuthModal;
