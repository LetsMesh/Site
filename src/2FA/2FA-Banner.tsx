import React, { useState, useEffect } from "react";
import { Modal, Button, Typography, Fade, Backdrop } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ReactComponent as Logo } from "./2FA-icon.svg";

import "./Banner.css";

function TwoFactorBanner(props: any) {
  return (
    <div className="banner" style={{ width: props.width, height: 50 }}>
      <div className="bannerLogo">
        <Logo
          style={{
            width: "50px",
            height: "50px",
          }}
        />
      </div>

      <div className="descText">
        <Typography sx={{ fontSize: 21, fontFamily: "cocogoose" }}>
          Secure your account with Two-Factor Authentication.
        </Typography>
      </div>

      <div className="bannerBtn">
        <Button
          fullWidth
          variant="contained"
          sx={{
            fontSize: 16,
            backgroundColor: "#0B7D66",
            fontFamily: "cocogoose",
            "&:hover": {
              backgroundColor: "#0A6B57",
            },
            borderRadius: 3,
          }}
          endIcon={<ChevronRightIcon />}
          onClick={props.handleOptIn}
        >
          GO TO SETTINGS
        </Button>
        <div />
      </div>

      <div className="bannerCloseBtn">
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
    </div>
  );
}

export default TwoFactorBanner;
