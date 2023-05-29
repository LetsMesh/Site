import React, { useState } from "react";
import { Modal, Button, IconButton, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ReactComponent as Logo } from "./2FA-icon.svg";

import "./Popup.css";

function TwoFactorAuthModal(props: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className="modal">
          <FAModalBody onClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
}

function FAModalBody(props: any) {
  return (
    <div className="container">
      <div className="closeBtn">
        <IconButton onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <div>
        <Logo />
      </div>
      <div className="text">
        <Typography sx={{ fontSize: 17, fontFamily: "cocogoose" }}>
          Secure your account with
        </Typography>
        <Typography sx={{ fontSize: 17, fontFamily: "cocogoose" }}>
          Two-Factor Authentication
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
              color: "gray",
            },
          }}
        >
          No thanks
        </Typography>
      </div>
    </div>
  );
}

export default TwoFactorAuthModal;
