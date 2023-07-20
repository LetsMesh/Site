import {
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Avatar,
  Button,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useFormContext } from "react-hook-form";
import { IFormInput } from "./SignUp";
import React, { useState } from "react";
import StandardTextField from "./inputs/StandardTextField";

const interests = ["MLP", "Software"];

export default function StepThree() {
  return (
    <Grid container bgcolor={"cardBackground.main"}>
      <Grid
        container
        justifyContent="center"
        color={"text.main"}
        marginTop={10}
        marginBottom={10}
        alignItems={"center"}
        rowSpacing={4}
      >
        {/*profile picture*/}
        <Grid item sm={4}>
          <ProfilePictureAndUploadButton />
        </Grid>
        <Grid item xs={11} sm={7} md={6}>
          {/*start profile form title*/}
          <Grid container justifyContent="center" marginBottom={2}>
            <Grid item xs={12}>
              <Typography textAlign="center" variant="h2">
                Start Your Profile!
              </Typography>
            </Grid>
          </Grid>

          {/*start profile form*/}
          <Grid
            container
            justifyContent={"center"}
            p={3}
            sx={{
              backgroundColor: "#D9D9D9",

              //on the figma the form box is basically the same as it would be in light mode
              //if the main theme file is eventually adapted to return a function returning the theme based on the desired mode,
              //we can reduce some bloat here by removing this css and wrapping the form box with the Light Mode theme using the function
              ".MuiOutlinedInput-notchedOutline , .MuiInput-root:before": {
                borderColor: "black",
              },
              ".MuiFormLabel-root": {
                color: "#00000099",
              },
              ".MuiInputBase-input , .MuiChip-label": {
                color: "black",
              },
              ".MuiChip-root": {
                backgroundColor: "#00000014",
              },
              ".MuiChip-root .MuiChip-deleteIcon": {
                color: "#00000042",
              },
              ".MuiChip-root .MuiChip-deleteIcon:hover , .MuiAutocomplete-clearIndicator , .MuiAutocomplete-popupIndicator":
                {
                  color: "#0000008F",
                },
            }}
          >
            {/*inner form container*/}
            <Grid container xs={10} rowSpacing={1}>
              {/* name input*/}
              <Grid container xs={12}>
                <Name />
              </Grid>

              {/*location and title input*/}
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={12} sm={5.5}>
                  <Location />
                </Grid>
                <Grid item xs={12} sm={5.5}>
                  <Title />
                </Grid>
              </Grid>

              {/*interests input*/}
              <Grid item xs={12}>
                <Interests />
              </Grid>

              {/*Label input */}
              <Grid item xs={12}>
                <Label />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
//---------------------------------------INPUTS-----------------------------------------------------------
//name text field

function Name() {
  return (
    <StandardTextField
      id="name"
      label="Name"
      fieldName="name"
      required={true}
    />
  );
}

//Location text field
function Location() {
  return (
    <StandardTextField
      id="location"
      label="Location"
      fieldName="location"
      required={true}
    />
  );
}

//Title text field
function Title() {
  return (
    <StandardTextField
      id="title"
      label="Title"
      fieldName="title"
      required={true}
    />
  );
}

//Interest Tag AutoComplete
function Interests() {
  const props = useFormContext<IFormInput>();

  //keep track of interests chosen if we were to go back to the previous step and then come back
  const [chosenInterests, setChosenInterests] = useState(
    props.getValues("interests") || []
  );

  return (
    <Grid item sx={{ position: "relative" }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={interests}
        defaultValue={chosenInterests}
        {...props.register("interests")}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Interests" />
        )}
        onChange={(event, data) => {
          props.setValue("interests", data);
          setChosenInterests(data);
        }}
      />
      {props.formState.errors.interests && (
        <Tooltip
          disableFocusListener
          disableTouchListener
          arrow
          title={props.formState.errors.interests?.message}
          sx={{
            position: "absolute",
            top: "0px",
            left: "-13px",
          }}
        >
          <ErrorIcon color="error" />
        </Tooltip>
      )}
    </Grid>
  );
}

//Label text field
function Label() {
  return (
    <StandardTextField
      id="label"
      label="Label"
      fieldName="label"
      required={true}
      multiline={true}
      maxRows={10}
      defaultValue="This here could be your bio if you had one. Set one up as soon as you can to tell everyone about yourself. Bios help others learn about you."
    />
  );
}
//Profile Picture and Upload Button
function ProfilePictureAndUploadButton() {
  const props = useFormContext<IFormInput>();

  //start image with default profile picture OR the chosen image if we have already gotten it
  const [image, setImage] = useState(
    props.getValues("picture")
      ? URL.createObjectURL(props.getValues("picture"))
      : "DefaultProfile.png"
  );
  const [showError, setShowError] = useState(false);

  //trigger file input
  const handleEditPicture = (event: React.MouseEvent) => {
    event.stopPropagation();
    const fileInput = document.getElementById("fileInput");
    fileInput?.click();
  };

  //handle file change, if valid image then set image as the input and form value,, otherwise display the error
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      console.log(file);
      console.log(url);
      setImage(url);
      setShowError(false);
      props.setValue("picture", file);
    } else {
      setShowError(true);
    }
  };

  //styling for error
  const tooltipErrorTheme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#f44336",
            color: "#ffffff",
          },
          arrow: {
            color: "#f44336",
          },
        },
      },
    },
  });

  //upload picture button
  const UploadButton = () => (
    <Grid item>
      <Button
        variant="contained"
        endIcon={<CollectionsIcon />}
        sx={{ padding: "10px" }}
        onClick={handleEditPicture}
      >
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={onFileChange}
        />
        <Typography>UPLOAD PICTURE</Typography>

        {/* show error tooltip if there is an error */}
        {showError ? (
          <ThemeProvider theme={tooltipErrorTheme}>
            <Tooltip
              disableFocusListener
              disableTouchListener
              arrow
              title={"Invalid file! Please upload an image."}
              placement="top"
              sx={{
                position: "absolute",
                top: "-13px",
                left: "-13px",
              }}
            >
              <ErrorIcon color="error" />
            </Tooltip>
          </ThemeProvider>
        ) : null}
      </Button>
    </Grid>
  );

  //profile picture
  const ProfilePicture = () => (
    <Grid item>
      <Avatar
        alt="Profile Picture"
        src={image}
        sx={{
          width: 300,
          height: 300,
          bgcolor: "#D9D9D9",
          "@media(max-width:1000px)": {
            width: 250,
            height: 250,
          },
          "@media(max-width:900px)": {
            width: 200,
            height: 200,
          },
          "@media(max-width:700px)": {
            width: 175,
            height: 175,
          },
        }}
      />
    </Grid>
  );

  return (
    <Grid container direction="column" alignItems="center" rowSpacing={2}>
      <ProfilePicture />
      <UploadButton />
    </Grid>
  );
}
