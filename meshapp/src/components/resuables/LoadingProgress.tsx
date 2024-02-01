import { CircularProgress } from "@mui/material";
import { GridItem } from "./Grids";

const LoadingProgress = () => {
  return (
    <GridItem alignSelf={"center"}>
      <CircularProgress />
    </GridItem>
  );
};

export default LoadingProgress;
