import React, { useState } from "react";
import { TextField, Box, ThemeProvider, Theme, Typography, Grid, createTheme } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";


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



const ProfileName = (props: {
  label: string;
  placeholder: string;
  text: string;
  charLimit: number;
}) => {
  const [text, setText] = useState(props.text);
  const [editMode, setEditMode] = useState(false);
  

  // Enforce developer-defined character limit and empty string
  const handleTextChange = (event: any) => {
    if (event.target.value.length > props.charLimit) return;
    if (event.target.value.length === 0) return;
    if (event.target.value.includes(" ")) return;
    setText(event.target.value);
  };

  // Checks if it is a name or pronoun
  
  const name = "60px";
  const pronoun = "30px";
  let nicknameOrPronouns = "Nickname";

  const nameOrPronounFont = (charLimit: number) => {
    if(props.charLimit == 15) {
      return name;
    } else {
      nicknameOrPronouns = "Pronouns"
      return pronoun;
    }
  }

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  return (
    
    editMode ? (
        <ThemeProvider theme={theme}>
            <Box sx={{ pl: "40px", display: "flex", alignItems: "flex-end" }}>
                <Typography
                    variant="h1"
                    sx={{
                        lineHeight: 1,
                        display: "inline",
                        fontSize: nameOrPronounFont(props.charLimit),
                    }}
                >
                <TextField
                        required
                        id="standard-required"
                        label={nicknameOrPronouns}
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
                  fontSize: nameOrPronounFont(props.charLimit),
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
      </ThemeProvider>
      
    )
    
  );
}

export default ProfileName;
