import { useEffect, useState } from "react";
import LoggedOutHome from "./components/logged-out";
import LoggedInHome from "./components/logged-in";
import { useAccountContext } from "../../contexts/UserContext";
import { GridContainer } from "../../components/resuables/Grids";
import LoadingProgress from "../../components/resuables/LoadingProgress";

const HomePage = () => {
  const { account, isLoading } = useAccountContext();

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
        {account !== null ? <LoggedInHome /> : <LoggedOutHome />}
      </GridContainer>
    );
  }
};

export default HomePage;
