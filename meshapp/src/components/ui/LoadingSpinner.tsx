import { CircularProgress, Grid } from "@mui/material";

const LoadingProgress = () => {
  return (
    <Grid item textAlign={"left"} xs={12} p={0} m={0} alignSelf={"center"}>
      <CircularProgress />
    </Grid>
  );
};

export default LoadingProgress;
