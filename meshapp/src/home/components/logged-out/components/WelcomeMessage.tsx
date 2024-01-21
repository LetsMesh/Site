import { Typography, Grid, Button } from "@mui/material";
import { paths } from "../../../../Routing/RoutePaths";
import { Link as RouterLink } from "react-router-dom";

const WelcomeMessage = () => {
  return (
    <>
      <Typography
        textAlign={"center"}
        sx={{
          fontFamily: "cocogoose",
          fontSize: "48px",
          padding: { lg: "0 100px", xs: "0 16px" },
        }}
      >
        Find Your Perfect Mentor or Mentee with{" "}
        <span style={{ fontWeight: "700", fontSize: "60px" }}>mesh</span>
      </Typography>
      <Typography variant="body1" fontWeight={250} textAlign={"center"}>
        Unlock Your Potential with Expert Guidance and Support.
      </Typography>
      <Button variant="contained" component={RouterLink} to={paths.sign_up}>
        Sign Up
      </Button>
    </>
  );
};

export default WelcomeMessage;
