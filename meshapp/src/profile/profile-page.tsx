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
      fontSize: "60px",
      fontWeight: "bold",
      color: "#26383A",
    },
    h2: {
      fontSize: "30px",
      fontFamily: "cocogoose",
      color: "#26383A",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "24px",
      fontFamily: "cocogoose",
      color: "#26383A",
      fontWeight: "bold",
    },
    h4: {
      fontSize: "22px",
      fontFamily: "cocogoose",
      color: "#26383A",
      fontWeight: "bold",
    },
  },
});

const ProfilePage = (props: Profile) => {
  return (
    <Box className="profile-page-container">
      <Box className="profile-page-header">
        <ProfileHeader name={props.name} pronouns={props.pronouns} />
        <Box className="profile-page-details">
          <ProfilePicture image={props.image} />
          <ProfileRole isMentor={props.isMentor} isMentee={props.isMentee} />
        </Box>
      </Box>
      <Box
        className="profile-page-body"
        sx={{ borderBottom: 1, borderColor: "#d9d9d9" }}
      >
        <ProfileOccupation
          occupationTitle={props.occupationTitle}
          occupationBusiness={props.occupationBusiness}
        />
        <ProfileBiography biography={props.biography} />
      </Box>
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

const ProfileHeader = (props: { name: string; pronouns: string }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box className="profile-page-header" sx={{ pl: "40px" }}>
        <Grid container alignItems="flex-end">
          <Box>
            <Typography
              sx={{
                lineHeight: "0.85",
              }}
              variant="h1"
            >
              {props.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h2">({props.pronouns})</Typography>
          </Box>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

const ProfilePicture = (props: { image: string }) => {
  return (
    <Box className="profile-page-picture-container">
      <img
        className="profile-page-picture-body"
        src={props.image}
        alt="profile"
      />
    </Box>
  );
};

const ProfileOccupation = (props: {
  occupationTitle: string;
  occupationBusiness: string;
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Box className="profile-page-occupations">
        <Typography variant="h3">
          {props.occupationTitle}, {props.occupationBusiness}
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

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
        fontWeight: "bold",
        fontSize: "22px",
        fontFamily: "cocogoose",
      }}
      size="medium"
    />
  );
};

// To be fully implemented
const ProfileExperience = (props: any) => {
  return (
    <ThemeProvider theme={theme}>
      <Box className="profile-page-column-body">
        <Typography
          variant="h4"
          sx={{
            marginBottom: "20px",
          }}
        >
          Experience
        </Typography>
        <TestComponent />
      </Box>
    </ThemeProvider>
  );
};

// To be fully implemented
const ProfileEducation = (props: any) => {
  return (
    <ThemeProvider theme={theme}>
      <Box className="profile-page-column-body">
        <Typography
          variant="h4"
          sx={{
            marginBottom: "20px",
          }}
        >
          Education
        </Typography>
        <TestComponent />
      </Box>
    </ThemeProvider>
  );
};

// To be fully implemented
const ProfileInterests = (props: any) => {
  return (
    <ThemeProvider theme={theme}>
      <Box className="profile-page-column-body">
        <Typography
          variant="h4"
          sx={{
            marginBottom: "20px",
          }}
        >
          Interests
        </Typography>
        <TestComponent />
      </Box>
    </ThemeProvider>
  );
};

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
