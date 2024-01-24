import { useEffect, useState } from "react";
import LoggedOutHome from "./components/logged-out";
import LoggedInHome from "./components/logged-in";
import { useAccount } from "../../contexts/UserContext";
import { GridContainer } from "../../components/resuables/Grids";
import LoadingProgress from "../../components/resuables/LoadingProgress";

const HomePage = () => {
  const { accountID, isLoading } = useAccount();

  if (isLoading) {
    // Display loading indicator while loading
    return (
      <GridContainer bgcolor="primary.main">
        <LoadingProgress />
      </GridContainer>
    );
  } else {
    // Decide which component to render based on accountID
    return (
      <GridContainer bgcolor="primary.main">
        {accountID !== null ? <LoggedInHome /> : <LoggedOutHome />}
      </GridContainer>
    );
  }
};

export default HomePage;
