import LoggedOutHome from "./components/logged-out";
import LoggedInHome from "./components/logged-in";
import { useAccountContext } from "../../contexts/UserContext";
import { GridContainer } from "../../components/resuables/Grids";
import LoadingProgress from "../../components/resuables/LoadingProgress";
import { useTheme } from "@mui/material";

const HomePage = () => {
  const { account, isLoading } = useAccountContext();

  if (isLoading) {
    // Display loading indicator while loading
    return (
      <GridContainer>
        <LoadingProgress />
      </GridContainer>
    );
  } else {
    // Decide which component to render based on accountID
    return (
      <GridContainer>
        {account !== null ? <LoggedInHome /> : <LoggedOutHome />}
      </GridContainer>
    );
  }
};

export default HomePage;
