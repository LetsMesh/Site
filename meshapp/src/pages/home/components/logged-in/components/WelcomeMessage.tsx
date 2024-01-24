import { Button, Stack, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { paths } from "../../../../../Routing/RoutePaths";
import { ChevronRight } from "@mui/icons-material";

const WelcomeMessage = () => {
  const navigate = useNavigate();
  return (
    <Stack justifyContent="center" alignItems="center" gap="45px">
      <Typography
        color="#F2E8DE"
        fontFamily="cocogoose"
        fontWeight="700"
        fontSize="36px"
        textAlign="center"
      >
        Find Your Perfect Mentor or Mentee with Mesh
      </Typography>
      <Typography
        color="#F2E8DE"
        fontFamily="cocogoose"
        textAlign="center"
        fontSize="24px"
      >
        Unlock Your Potential with Expert Guidance and Support.
      </Typography>
      <Button
        variant="contained"
        color="success"
        sx={{
          width: "14em",
          height: "3em",
          borderRadius: 4,
          fontWeight: "bold",
          fontFamily: "cocogoose",
        }}
        onClick={() => navigate(paths.profile_swipe)}
        endIcon={<ChevronRight />}
      >
        {`Start Swiping`}
      </Button>
    </Stack>
  );
};

export default WelcomeMessage;
