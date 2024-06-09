import { Button, Typography, Slide, IconButton, useTheme } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ReactComponent as Logo } from "src/assets/two-factor-assets/two-factor-icon.svg";

import "./styling/TwoFactorBanner.css";
import { useAccountContext } from "src/contexts/UserContext";

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
  const theme = useTheme();
  if (account === null) return null;

  return (
    <Slide direction="down" in={props.visible} mountOnEnter unmountOnExit>
      <div
        className="banner"
        style={{
          position: "fixed",
          paddingTop: "74px",
          background: theme.palette.secondary.light,
        }}
      >
        <div className="bannerContent">
          <div className="bannerLogo">
            <Logo style={{ width: "40px", height: "40px" }} />
          </div>

          <div className="descText">
            <Typography sx={{ fontSize: 17, color: "black" }}>
              Secure your account with Two-Factor Authentication
            </Typography>
          </div>

          <div className="bannerBtn">
            <Button
              variant="contained"
              color="success"
              endIcon={<ChevronRightIcon />}
              onClick={props.handleOptIn}
            >
              SETTINGS
            </Button>
          </div>
        </div>

        <div className="bannerCloseBtn">
          <IconButton onClick={props.handleClose}>
            <CloseIcon
              sx={{
                color: "black",
                transition: "color 0.15s ease-in-out",
              }}
            />
          </IconButton>
        </div>
      </div>
    </Slide>
  );
};

export default TwoFactorBanner;
