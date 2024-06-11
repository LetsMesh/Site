import { useAccountContext } from "src/contexts/UserContext";

import LoadingProgress from "src/components/ui/LoadingSpinner";
import { GridContainer } from "src/components/ui/Grid";
import LoggedInHome from "./LoggedIn/LoggedInHome";
import LoggedOutHome from "./LoggedOut/LoggedOutHome";

const HomePage = () => {
  const { account, loadingState } = useAccountContext();

  if (loadingState != "completed") {
    // Display loading indicator while loading
    return (
      <GridContainer>
        <LoadingProgress />
      </GridContainer>
    );
  } else {
    // Decide which component to render based on login state
    return (
      <GridContainer>
        {account !== null ? <LoggedInHome /> : <LoggedOutHome />}
      </GridContainer>
    );
  }
};

export default HomePage;
