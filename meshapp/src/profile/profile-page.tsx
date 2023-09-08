import React from "react";
import {
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  Chip,
} from "@mui/material";

import ProfileTextField from "./profile-textfield";
import ProfilePicture from "./profile-picture";
import ProfileInterestsComponent from "./profile-interests";
import { Profile } from "./types/profile";
import "./styling/profile-page.css";

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
 * A React component that renders a profile page.
 * Displays a user's personal, professional, and educational information.
 *
 * @param props - Properties of the component
 * @param {string} props.name - Name of user
 * @param {string} props.pronouns - Pronouns used by user
 * @param {string} props.occupationTitle - Title of user's occupation
 * @param {string} props.occupationBusiness - Name of business/org the user affiliates with
 * @param {string} props.biography - The initial text content of the bio
 * @param {string} props.image - A URL to user's profile image
 * @param {boolean} props.isMentor - Flag indicating whether the user is a mentor
 * @param {boolean} props.isMentee - Flag indicating whether the user is a mentee
 */
const ProfilePage = (props: Profile) => {
  return (
    <Box className="profile-page-container">
      <Box className="profile-page-header">
        <ProfileHeader name={props.name} pronouns={props.pronouns} />
      </Box>
      <Grid container sx={{ borderBottom: 1, borderColor: "#d9d9d9" }}>
        <Grid
          item
          xs={9}
          sx={{
            pl: "40px",
          }}
        >
          <ProfileOccupation
            occupationTitle={props.occupationTitle}
            occupationBusiness={props.occupationBusiness}
          />
          <ProfileBiography biography={props.biography} />
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pb: "15px",
            transform: "translateY(-125px)",
            marginBottom: "-125px", // Adjusts container height to match transform
          }}
        >
          <ProfilePicture image={props.image} />
          <ProfileRole isMentor={props.isMentor} isMentee={props.isMentee} />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
        <Grid container>
          <Grid item xs={9}>
            <Box sx={{ borderBottom: 1, borderColor: "#d9d9d9" }}>
              <ProfileExperience />
            </Box>
            <Box>
              <ProfileEducation />
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              borderLeft: 1,
              borderColor: "#d9d9d9",
            }}
          >
            <ProfileInterests />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

/**
 * The header of the profile page.
 *
 * @param props - Properties of the component
 * @param {string} props.name - Name of user
 * @param {string} props.pronouns - Pronouns used by user
 */
const ProfileHeader = (props: { name: string; pronouns: string }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ pl: "40px", display: "flex", alignItems: "flex-end" }}>
        <Grid container alignItems="flex-end">
          <Box
            sx={{
              maxWidth: "1000px",
              wordBreak: "break-word",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                lineHeight: 1,
                display: "inline",
                fontSize: "60px",
              }}
            >
              {props.name}
              <Typography
                variant="h1"
                sx={{
                  display: "inline",
                  fontSize: "30px",
                }}
              >
                {` (${props.pronouns})`}
              </Typography>
            </Typography>
          </Box>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

/**
 * Displays the user's current occupation.
 *
 * @param props - Properties of the component
 * @param {string} props.occupationTitle - Title of user's occupation
 * @param {string} props.occupationBusiness - Name of business/org the user affiliates with
 */
const ProfileOccupation = (props: {
  occupationTitle: string;
  occupationBusiness: string;
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Box className="profile-page-occupations">
        <Typography variant="h1" sx={{ fontSize: "24px" }}>
          {props.occupationTitle}, {props.occupationBusiness}
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

/**
 * Displays the user's biography. It also has a max character limit of 300.
 *
 * @param props - Properties of the component
 * @param {string} props.biography - The initial text content of the bio
 */
const ProfileBiography = (props: { biography: string }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box className="profile-page-biography">
        <ProfileTextField
          label={"Biography"}
          placeholder={"Share your background and experiences"}
          text={props.biography}
          charLimit={300}
        />
      </Box>
    </ThemeProvider>
  );
};

/**
 * Displays the user's role(s) (mentor, mentee, or both).
 *
 * @param props - Properties of the component
 * @param {boolean} props.isMentor - Flag indicating whether the user is a mentor
 * @param {boolean} props.isMentee - Flag indicating whether the user is a mentee
 */
const ProfileRole = (props: { isMentor: boolean; isMentee: boolean }) => {
  const { isMentor, isMentee } = props;
  let currentRole: string = isMentor
    ? "Mentor"
    : isMentee
    ? "Mentee"
    : "Unknown";

  if (isMentor && isMentee) {
    currentRole = "Mentor | Mentee";
  }

  return (
    <Chip
      className="profile-page-roles"
      label={currentRole}
      sx={{
        color: "#26383A",
        backgroundColor: "#d9d9d9",
        fontWeight: "bold",
        fontSize: "22px",
        fontFamily: "cocogoose",
      }}
      size="medium"
    />
  );
};

// TODO: To be fully implemented
const ProfileExperience = (props: any) => {
  return (
    <ThemeProvider theme={theme}>
      <Box className="profile-page-column-body">
        <Typography
          variant="h1"
          sx={{
            marginBottom: "20px",
            fontSize: "22px",
          }}
        >
          Experience
        </Typography>
        <TestComponent />
      </Box>
    </ThemeProvider>
  );
};

// TODO: To be fully implemented
const ProfileEducation = (props: any) => {
  return (
    <ThemeProvider theme={theme}>
      <Box className="profile-page-column-body">
        <Typography
          variant="h1"
          sx={{
            marginBottom: "20px",
            fontSize: "22px",
          }}
        >
          Education
        </Typography>
        <TestComponent />
      </Box>
    </ThemeProvider>
  );
};

const ProfileInterests = (props: any) => {
  // NOTE: Used to simulate future HTTP requests - remove when API is implemented
  const [testCurrentSelected, setTestCurrentSelected] = React.useState<
    string[]
  >([]);

  // Same as above
  const testRecommended: string[] = [
    "adventure",
    "cozy",
    "exploration",
    "vibrant",
    "serene",
    "inspiring",
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box className="profile-page-column-body" sx={{ margin: "20px" }}>
        <Typography
          variant="h1"
          sx={{
            marginBottom: "15px",
            fontSize: "26px",
          }}
        >
          Interests
        </Typography>
        <ProfileInterestsComponent
          currentTags={testCurrentSelected}
          recommendedTags={testRecommended}
          setTags={setTestCurrentSelected}
        />
      </Box>
    </ThemeProvider>
  );
};

// Temporary component as a filler for empty spaces
const TestComponent = (props: any) => {
  return (
    <ProfileTextField
      label={"Test"}
      placeholder={"Test"}
      text={"Test"}
      charLimit={200}
    />
  );
};

export default ProfilePage;
