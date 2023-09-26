import { useState } from "react";
import { Grid, Typography, createTheme, ThemeProvider } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import ProfileTextField from "./profile-textfield";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0b7d66",
    },
  },
  typography: {
    h1: {
      fontFamily: "cocogoose",
      fontWeight: "bold",
      color: "#26383A",
    },
  },
});

/**
 * Displays the user's current occupation.
 *
 * @param props - Properties of the component
 * @param {string} props.occupationTitle - Title of user's occupation
 * @param {string} props.occupationBusiness - Name of business/org the user affiliates with
 */
export default function ProfileOccupation(props: {
  occupationTitle: string;
  occupationBusiness: string;
}) {
  const [editMode, setEditMode] = useState(false);
  const [occupationTitle, setOccupationTitle] = useState(props.occupationTitle);
  const [occupationBusiness, setOccupationBusiness] = useState(
    props.occupationBusiness
  );

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleBackClick = () => {
    setEditMode(false);
  };

  //TODO: Retrieve and store occupation
  function saveTitle(text: string) {
    setOccupationTitle(text);
  }

  function saveBusiness(text: string) {
    setOccupationBusiness(text);
  }

  /**
   * Displays the user's occupation in edit mode.
   */
  const EditOccupation = () => {
    return (
      <Grid container gap="20px">
        <Grid xs={5.8}>
          <ProfileTextField
            variant="outlined"
            label="Occupation"
            placeholder=""
            text={occupationTitle}
            charLimit={50}
            handleSave={saveTitle}
          />
        </Grid>
        <Grid xs={5.8}>
          <ProfileTextField
            variant="outlined"
            label="Organization"
            placeholder=""
            text={occupationBusiness}
            charLimit={50}
            handleSave={saveBusiness}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid className="profile-page-occupations">
        {editMode ? (
          <Grid container gap="10px" alignItems="center">
            <ArrowBackIosIcon
              color="primary"
              onClick={handleBackClick}
              sx={{
                "&:hover": {
                  color: "#0A6B57",
                },
              }}
            />
            <Grid item xs={11.5}>
              <EditOccupation />
            </Grid>
          </Grid>
        ) : (
          <Grid container gap="10px" alignItems="center">
            <Typography variant="h1" sx={{ fontSize: "24px" }}>
              {occupationTitle}, {occupationBusiness}
            </Typography>
            <EditIcon
              color="disabled"
              onClick={handleEditClick}
              sx={{
                "&:hover": {
                  color: "#0b7d66",
                },
              }}
            />
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
}
