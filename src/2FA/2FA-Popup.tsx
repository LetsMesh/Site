import React from "react";
import { Modal } from "@mui/material";

import './Popup.css';

function Popup(props: any) {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <div className="container">
        {props.children}
      </div>
    </Modal>
  );
}

export default Popup;

