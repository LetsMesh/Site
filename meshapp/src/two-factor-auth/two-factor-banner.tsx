import React from "react";
import { Button, Typography, Slide } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ReactComponent as Logo } from "../assets/two-factor-assets/two-factor-icon.svg";

import "./styling/two-factor-banner.css";
import { useAccountContext } from "../contexts/UserContext";

/**
 * A React component that renders a banner to remind users to enable Two-Factor Authentication (2FA).
 * This banner should only render if the user has already seen the modal and 2FA is not enabled.
 *
 * @param props - Properties of the component
 * @param {boolean} props.visible - A boolean value indicating whether the banner is visible or not
 * @param {function} props.handleClose - A function for handling the closing of the banner
 * @param {function} props.handleOptIn - A function for handling the user's decision to enable 2FA
 */
const TwoFactorBanner = (props: any) => {
  const { account } = useAccountContext();
  if (account === null) return null;
  return (
    <Slide direction="down" in={props.visible} mountOnEnter unmountOnExit>
      <div className="banner" style={{ position: "fixed", marginTop: "72px" }}>
        <div className="bannerLogo">
          <Logo
            style={{
              width: "40px",
              height: "40px",
            }}
          />
        </div>

        <div className="descText">
          <Typography sx={{ fontSize: 17 }}>
            Secure your account with Two-Factor Authentication
          </Typography>
        </div>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0B7D66",
            "&:hover": {
              backgroundColor: "#0A6B57",
            },
          }}
          endIcon={<ChevronRightIcon />}
          onClick={props.handleOptIn}
        >
          GO TO SETTINGS
        </Button>

        <div className="bannerCloseBtn">
          <CloseIcon
            sx={{
              color: "black",
              cursor: "pointer",
              transition: "color 0.15s ease-in-out",
            }}
            fontSize="small"
            onClick={props.handleClose}
          />
        </div>
      </div>
    </Slide>
  );
};

export default TwoFactorBanner;
