import { Alert, Stack, Typography } from "@mui/material";

import { ErrorOutline } from "@mui/icons-material";

const AlertBox = () => {
  return (
    <Alert severity="error" icon={<ErrorOutline sx={{ fontSize: "4vh" }} />}>
      <Stack spacing={1} direction="column" flexWrap="wrap">
        <Typography fontSize={"16px"}>
          <strong>Notice</strong>
        </Typography>
        <Typography fontSize={"14px"}>
          Please update your profile with the following items:
          <br /> - Biography
          <br /> - Years of Experience
          <br /> - Career
          <br /> - Interests
        </Typography>
      </Stack>
    </Alert>
  );
};

export default AlertBox;
