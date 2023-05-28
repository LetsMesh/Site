import React, { useState } from "react";
import { Modal, Button, IconButton, Typography } from "@mui/material";

import './Popup.css';

function TwoFactorAuthModal(props: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Open Modal</Button>
      <Modal open={open} onClose={handleClose}>
        <div className="modal">
          <FAModalBody onClose={handleClose}/>
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
        </IconButton>
      </div>
      <div className="body">
        <Typography>HELLO!</Typography>
      </div>
    </div>
  );
}

export default TwoFactorAuthModal;

