import { Typography, Button } from "@mui/material";
import { paths } from "../../../../../routing/RoutePaths";
import { Link as RouterLink } from "react-router-dom";

const WelcomeMessage = () => {
  return (
    <>
      <Typography
        textAlign={"center"}
        fontFamily="cocogoose"
        fontSize="36px"
        color="#F2E8DE"
        sx={{
          fontWeight: "bold",
        }}
      >
        Find Your Perfect Mentor or Mentee with Mesh
      </Typography>
      <Typography
        fontWeight={500}
        textAlign={"center"}
        fontFamily="cocogoose"
        fontSize="24px"
        color="#F2E8DE"
      >
        Unlock Your Potential with Expert Guidance and Support.
      </Typography>
      <Button
        variant="contained"
        color="success"
        component={RouterLink}
        to={paths.sign_up}
      >
        Sign Up
      </Button>
    </>
  );
};

export default WelcomeMessage;
