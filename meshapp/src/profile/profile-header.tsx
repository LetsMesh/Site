import React, { useState } from "react";
import {
  TextField,
  Box,
  ThemeProvider,
  Typography,
  Grid,
  createTheme,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

// Error-handling Imports
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

/**
 * A React component that renders a text field with editing capabilities.
 * Includes a character limit and an edit/save mode toggle.
 *
 * Used in the Profile page (src/profile/profile-page.tsx).
 *
 * @param props - Properties of the component
 * @param {string} props.label - The label
 * @param {string} props.placeholder - The placeholder text
 * @param {string} props.text - The initial text content
 * @param {number} props.charLimit - The max number of characters allowed
 * @param {string} props.fontSize - The font size
 */
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

const ProfileHeader = (props: {
  label: string;
  placeholder: string;
  text: string;
  charLimit: number;
  fontSize: string;
}) => {
  const [text, setText] = useState(props.text);
  const [editMode, setEditMode] = useState(false);
  const [snackBar, setSnackbar] = useState(false);

  // Handler
  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  // Enforce developer-defined character limit and empty string
  const handleTextChange = (event: any) => {
    // Allows "/" special character use for only Pronouns
    if ( (props.placeholder === "Nickname" && !/^[a-zA-Z\s]{1,15}$/.test(event.target.value)) || 
    (props.placeholder === "Pronouns" && !/^[a-zA-Z\s/]{1,8}$/.test(event.target.value))) {
      setSnackbar(true);
      return;
    }
    setText(event.target.value);
  };

  // Return
  return editMode ? (
    <ThemeProvider theme={theme}>
      <Box sx={{ pl: "40px", display: "flex", alignItems: "flex-end" }}>
        <Typography
          variant="h1"
          sx={{
            lineHeight: 1,
            display: "inline",
            fontSize: props.fontSize,
          }}
        >
          <TextField
            required
            id="standard-required"
            label={props.placeholder}
            defaultValue={text}
            variant="standard"
            onChange={handleTextChange}
          />
          <SaveIcon
            color="primary"
            onClick={handleSaveClick}
            sx={{
              "&:hover": {
                color: "#0A6B57",
              },
              cursor: "pointer",
              transition: "color 0.15s ease-in-out",
            }}
          />
        </Typography>
      </Box>
    </ThemeProvider>
  ) : (
    // View Mode
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
                fontSize: props.fontSize,
              }}
            >
              {text}
              <EditIcon
                onClick={handleEditClick}
                sx={{
                  "&:hover": {
                    color: "#0b7d66",
                  },
                  cursor: "pointer",
                  transition: "color 0.15s ease-in-out",
                }}
              />
            </Typography>
          </Box>
        </Grid>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackBar}
        autoHideDuration={7000} 
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={handleCloseSnackbar}
        >
          Nickname/Pronouns cannot contain special characters or numbers, be empty, or exceed character limit of 15 or 8.
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default ProfileHeader;
