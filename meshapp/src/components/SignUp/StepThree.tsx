import { Grid, Typography, Avatar, Button, Tooltip } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useFormContext } from "react-hook-form";
import { IFormInput } from "./SignUp";
import React, { useState } from "react";
import CustomStandardTextField from "./inputs/CustomStandardTextField";
import CustomAutoComplete from "./inputs/CustomAutoComplete";
import CustomSelect from "./inputs/CustomSelect";

//dummy data for interests autocomplete
const interests = ["MLP", "Software"];

export default function StepThree() {
  return (
    <Grid container bgcolor={"cardBackground.main"}>
      <Grid
        container
        justifyContent="center"
        color={"text.primary"}
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

              //form box should be in light mode across both modes, can reduce css bloat here eventually by wrapping the form box in light mode theme
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
              ".MuiChip-root .MuiChip-deleteIcon:hover , .MuiAutocomplete-clearIndicator , .MuiAutocomplete-popupIndicator , .MuiSelect-icon":
                {
                  color: "#0000008F",
                },
            }}
          >
            {/*inner form container*/}
            <Grid container xs={10} rowSpacing={1} alignContent={"center"}>
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

              {/*Pronouns and User Type*/}
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={12} sm={5.5}>
                  <Pronouns />
                </Grid>
                <Grid item xs={12} sm={5.5}>
                  <UserType />
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

//error messages
const INVALID_USER_TYPE = "This is not a valid user type.";

//name text field
function Name() {
  return (
    <CustomStandardTextField
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
    <CustomStandardTextField
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
    <CustomStandardTextField
      id="title"
      label="Title"
      fieldName="title"
      required={true}
    />
  );
}

//pronouns text field

function Pronouns() {
  return (
    <CustomStandardTextField
      id="pronouns"
      label="Pronouns"
      fieldName="pronouns"
    />
  );
}

//valid user types
const userTypes = ["Mentee", "Mentor", "Educator"];
//user type select
function UserType() {
  return (
    <CustomSelect
      id="user-type"
      label="User Type"
      fieldName="userType"
      required={true}
      options={userTypes}
      validators={{
        isValidType: (type) => {
          let isValid = userTypes.includes(type);
          return isValid || INVALID_USER_TYPE;
        },
      }}
    />
  );
}
//Interest Tag AutoComplete
function Interests() {
  return (
    <CustomAutoComplete
      required={true}
      label="Interests"
      id="interests"
      fieldName="interests"
      options={interests}
      //demonstrate validation
      // validators={{
      //   bob: (arr) => {return arr.includes("bob") || "WHERE IS BOB"}
      // }}
    />
  );
}

//Label text field
function Label() {
  return (
    <CustomStandardTextField
      id="label"
      label="Label"
      fieldName="label"
      required={true}
      multiline={true}
      maxRows={10}
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
      : "meshpfp.png"
  );
  const [showError, setShowError] = useState(false);

  //trigger file input
  const handleEditPicture = (event: React.MouseEvent) => {
    event.stopPropagation();
    const fileInput = document.getElementById("fileInput");
    fileInput?.click();
  };

  //handle file change, if valid image then set image as the input and form value, otherwise display the error
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
