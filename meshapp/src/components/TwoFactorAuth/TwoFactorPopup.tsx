import { Modal, Button, Typography, Fade, Backdrop } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ReactComponent as Logo } from "src/assets/two-factor-assets/two-factor-icon.svg";

import "./styling/TwoFactorPopup.css";

/**
 * A React component that renders a modal pop-up to remind users to enable Two-Factor Authentication (2FA).
 * This modal should only render once per user.
 *
 * A button for opening the modal is also included in this component for testing.
 * It is currently commented out.
 *
 * @param props - Properties of the component
 * @param {boolean} props.visible - A boolean value indicating whether the modal is visible or not
 * @param {function} props.handleOpen - A function for handling the opening of the modal
 * @param {function} props.handleClose - A function for handling the closing of the modal
 * @param {function} props.handleOptIn - A function for handling the user's decision to enable 2FA
 */
function TwoFactorAuthModal(props: any) {
  return (
    <div>
      {/* This "Open Modal" button is only used for testing */}
      {/* <Button variant="contained" onClick={props.handleOpen}>
        Open Modal
      </Button> */}
      <Modal
        aria-labelledby="2FA-popup"
        aria-describedby="remind-users-to-enable-2FA"
        open={props.visible}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 175 } }}
      >
        <Fade in={props.visible}>
          <div className="modal">
            <FAModalBody
              onClose={props.handleClose}
              width={350}
              handleOptIn={props.handleOptIn}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

/**
 * A React component representing the contents of TwoFactorAuthModal
 *
 * @param props - Properties of the component
 * @param {function} props.onClose - A function for handling the closing of the modal
 * @param {number} props.width - The width and height of the modal
 * @param {function} props.handleOptIn - A function for handling the user's decision to enable 2FA
 */
function FAModalBody(props: any) {
  return (
    <div
      className="container"
      style={{ width: props.width, height: props.width }}
    >
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
            borderRadius: 3,
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
