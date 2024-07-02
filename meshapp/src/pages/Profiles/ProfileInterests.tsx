import { useState } from "react";
import {
  Box,
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

import { ProfileInterests } from "src/models/profile";
import "./styling/ProfilePage.css";

// TODO: Fix the vertical center of edit icon respective to tag
// TODO: Update styling to fit with global themes

// NOTE: The rendering order of the tags is dependent on the selection order - might be better if forced alphabetical?

/**
 * Displays the user's interest tags and supports editing them.
 *
 * @param {string[]} props.currentTags - User's current tags
 * @param {string[]} props.recommendedTags - Recommended tags from backend
 * @param {function} props.setTags - Callback to save edit-mode changes
 */
const ProfileInterestsComponent = (props: ProfileInterests) => {
  const [open, setOpen] = useState(false);

  return (
    <Box className="profile-page-interests-body">
      {props.currentTags.map((tag: any, index: any) => (
        <ProfileTag key={index} label={tag} />
      ))}
      <EditIcon
        onClick={() => {
          setOpen(true);
        }}
        sx={{
          color: "text.disabled",
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
  );
};

/**
 * Component for a profile interest tag.
 *
 * @param {string} props.label - Label of tag
 * @param {boolean} props.selected - Whether the tag is selected
 * @param {function} props.onClick - Callback to handle tag clicks
 */
const ProfileTag = (props: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}) => {
  const selectedStyle = {
    backgroundColor: "#0b7d66",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#087a59",
    },
  };

  const unselectedStyle = {
    "&:hover": {
      filter: "brightness(85%)",
    },
  };

  return (
    <Chip
      label={props.label}
      onClick={props.onClick}
      sx={{
        height: "28px",
        mb: "5px",
        mr: "8px",
        ...(props.selected ? selectedStyle : unselectedStyle),
      }}
    />
  );
};

/**
 * Displays a dialog for editing the user's interest tags.
 *
 * @param {boolean} props.open - Whether the dialog is open
 * @param {function} props.onClose - Callback to close the dialog
 * @param {string[]} props.recommendedTags - Recommended tags from backend
 * @param {function} props.onSelectedTagsChange - Callback to save changes
 * @param {string[]} props.currentSelectedTags - User's current tags
 */
const ProfileInterestsEdit = (props: {
  open: boolean;
  onClose: () => void;
  recommendedTags: string[];
  onSelectedTagsChange: (tags: string[]) => void;
  currentSelectedTags: string[];
}) => {
  const recommendedTags = props.recommendedTags;
  const [currentSelectedTags, setCurrentSelectedTags] = useState<string[]>(
    props.currentSelectedTags
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    props.currentSelectedTags
  );
  const [searchText, setSearchText] = useState<string | null>("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const addTag = (tag: string) => {
    if (!currentSelectedTags.includes(tag)) {
      setCurrentSelectedTags((prevTags) => [...prevTags, tag]);
      toggleTag(tag);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };
  const handleSave = () => {
    props.onClose();
    props.onSelectedTagsChange(selectedTags);
  };

  const handleClose = () => {
    props.onClose();
    setSelectedTags(props.currentSelectedTags);
    setSearchText("");
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const isCustomTag =
    searchText && !recommendedTags.includes(searchText) && searchText !== "";

  return (
    <Dialog open={props.open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ backgroundColor: "primary.main", pb: "8px" }}>
        <Typography
          sx={{
            fontFamily: "cocogoose",
            fontWeight: "bold",
            color: "text.main",
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
            startIcon={<AddIcon />}
            onClick={() => {
              if (isCustomTag) {
                addTag(searchText);
                setSearchText("");
              } else {
                searchText === ""
                  ? setAlertMessage("Invalid tag, try again!")
                  : setAlertMessage("Tag already exists!");
                setShowAlert(true);
              }
            }}
            sx={{
              color: "text.main",
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
            selected={selectedTags.includes(tag)}
            onClick={() => toggleTag(tag)}
          />
        ))}

        {currentSelectedTags
          .filter((tag) => !recommendedTags.includes(tag))
          .map((tag, index) => (
            <ProfileTag
              key={`a-${index}`}
              label={tag}
              selected={selectedTags.includes(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            color: "text.main",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          sx={{
            color: "text.main",
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ProfileInterestsComponent;
