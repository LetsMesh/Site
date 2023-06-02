import React, { useState } from "react";
import { Button, Typography, Slide } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ReactComponent as Logo } from "./2FA-icon.svg";


import "./Banner.css";



function TwoFactorBanner(props: any) {
  const [visible, setVisible] = useState(true);

  const removeElement = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className="banner"
    style={{visibility: visible ? 'visible' : 'hidden' }}>
      <div className="bannerLogo">
        <Logo
          style={{
            width: "45px",
            height: "45px",
          }}
        />
      </div>

      <div className="descText">
        <Typography sx={{ fontSize: 17, fontFamily: "cocogoose" }}>
          Secure your account with Two-Factor Authentication
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
            color: "black",
            cursor: "pointer",
            transition: "color 0.15s ease-in-out",
          }}
          fontSize="small"
          
          onClick={removeElement}

        />
      </div>
    </div>
  );
}

export default TwoFactorBanner;
