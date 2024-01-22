import React from "react";
import { Grid, GridProps } from "@mui/material";

interface GridContainerProps extends GridProps {
  children: React.ReactNode;
}

const GridContainer: React.FC<GridContainerProps> = (props) => (
  <Grid
    container
    spacing={1}
    justifyContent="flex-start"
    alignItems="flex-start"
    {...props}
  >
    {props.children}
  </Grid>
);

interface GridItemProps extends GridProps {
  children: React.ReactNode;
}

const GridItem: React.FC<GridItemProps> = (props) => (
  <Grid
    item
    textAlign={"left"}
    alignSelf={"top"}
    xs={12}
    md={12}
    p={0}
    m={0}
    {...props}
  >
    {props.children}
  </Grid>
);

export { GridContainer, GridItem };