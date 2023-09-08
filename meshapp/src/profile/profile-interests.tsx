import React, { useState } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Autocomplete,
  createFilterOptions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import "./styling/profile-page.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0b7d66",
    },
  },
});

// TODO: Fix the vertical center of edit icon respective to tag
// TODO: Update styling to fit with global themes

// NOTE: The rendering order of the tags is dependent on the selection order - might be better if forced alphabetical?

const ProfileInterestsComponent = (props: any) => {
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Box className="profile-page-interests-body">
        {props.currentTags.map((tag: any, index: any) => (
          <ProfileTag key={index} label={tag} />
        ))}
        <EditIcon
          onClick={() => {
            setOpen(true);
          }}
          sx={{
            color: "#999999",
            "&:hover": {
              color: "#0b7d66",
            },
            cursor: "pointer",
            transition: "color 0.15s ease-in-out",
          }}
        />
        <ProfileInterestsEdit
          open={open}
          onClose={() => setOpen(false)}
          recommendedTags={props.recommendedTags}
          onSelectedTagsChange={props.setTags}
          currentSelectedTags={props.currentTags}
        />
      </Box>
    </ThemeProvider>
  );
};

const ProfileTag = (props: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Chip
      label={props.label}
      onClick={props.onClick}
      sx={{
        height: "28px",
        mb: "5px",
        mr: "8px",
        backgroundColor: props.selected ? "#0b7d66" : undefined,
        color: props.selected ? "#ffffff" : undefined,
        "&:hover": {
          backgroundColor: props.selected ? "#087a59" : undefined,
          filter: props.selected ? undefined : "brightness(85%)",
        },
      }}
    />
  );
};

const ProfileInterestsEdit = (props: {
  open: boolean;
  onClose: () => void;
  recommendedTags: string[];
  selectedTags?: string[];
  onSelectedTagsChange: (tags: string[]) => void;
  currentSelectedTags: string[];
}) => {
  const [recommendedTags, setRecommendedTags] = useState<string[]>([
    ...props.recommendedTags,
  ]);
  const [currentSelectedTags, setCurrentSelectedTags] = useState<string[]>(
    props.currentSelectedTags
  );
  const [searchText, setSearchText] = useState<string | null>("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const addTag = (tag: string) => {
    setRecommendedTags((prevTags) => [...prevTags, tag]);
  };

  const toggleTag = (tag: string) => {
    setCurrentSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const handleSave = () => {
    props.onClose();
    props.onSelectedTagsChange(currentSelectedTags);
  };

  const handleClose = () => {
    props.onClose();
    setCurrentSelectedTags(props.currentSelectedTags);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const isCustomTag =
    searchText && !recommendedTags.includes(searchText) && searchText !== "";

  return (
    <Dialog open={props.open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ backgroundColor: "#f2e8de", pb: "8px" }}>
        <Typography
          sx={{
            fontFamily: "cocogoose",
            fontWeight: "bold",
            color: "#26383A",
            fontSize: "32px",
          }}
        >
          Interests
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ mt: "15px" }}>
        <Box mb={2}>
          <Autocomplete
            options={recommendedTags}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Search" />
            )}
            value={searchText}
            onInputChange={(event, newInputValue) => {
              setSearchText(newInputValue);
            }}
            onChange={(event, newValue) => {
              if (newValue && recommendedTags.includes(newValue)) {
                toggleTag(newValue);
              }
              setSearchText(newValue);
            }}
            filterOptions={createFilterOptions({
              matchFrom: "any",
              limit: 15,
            })}
          />
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              if (isCustomTag) {
                addTag(searchText);
                toggleTag(searchText);
                setSearchText("");
              } else {
                searchText === ""
                  ? setAlertMessage("Invalid tag, try again!")
                  : setAlertMessage("Tag already exists!");
                setShowAlert(true);
              }
            }}
          >
            Add New Tag
          </Button>
          <Snackbar
            open={showAlert}
            onClose={handleAlertClose}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <Alert onClose={handleAlertClose} severity="error" variant="filled">
              {alertMessage}
            </Alert>
          </Snackbar>
        </Box>
        {recommendedTags.map((tag, index) => (
          <ProfileTag
            key={index}
            label={tag}
            selected={currentSelectedTags.includes(tag)}
            onClick={() => toggleTag(tag)}
          />
        ))}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ProfileInterestsComponent;
