import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CollectionsIcon from "@mui/icons-material/Collections";

import { UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { IFormInput } from "./SignUp";

const interests = [{ title: "MLP" }, { title: "Software" }];

export default function StepThree(props: {
  register: UseFormRegister<IFormInput>;
}) {
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
          <Grid container direction="column" alignItems="center" rowSpacing={2}>
            <Grid item>
              <Avatar
                alt="Default Profile Picture"
                src="DefaultProfile.png"
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
            <Grid item>
              <Button
                variant="contained"
                endIcon={<CollectionsIcon />}
                sx={{ padding: "10px" }}
              >
                <Typography>UPLOAD PICTURE</Typography>
              </Button>
            </Grid>
          </Grid>
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
                <TextField
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...props.register("name", { required: true })}
                  id="standard-basic"
                  label="Name"
                  variant="standard"
                />
              </Grid>

              {/*location and title input*/}
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={12} sm={5.5}>
                  <TextField
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...props.register("location", { required: true })}
                    id="standard-basic"
                    label="Location"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={5.5}>
                  <TextField
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...props.register("title", { required: true })}
                    id="standard-basic"
                    label="Title"
                    variant="standard"
                  />
                </Grid>
              </Grid>

              {/*interests input*/}
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={interests}
                  getOptionLabel={(option) => option.title}
                  defaultValue={[interests[0]]}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Interests"
                    />
                  )}
                />
              </Grid>

              {/*Label input */}
              <Grid item xs={12}>
                <Box component="form" noValidate>
                  <TextField
                    margin="normal"
                    fullWidth
                    multiline
                    maxRows={10}
                    id="outlined-multiline-static"
                    label="Label"
                    defaultValue="This here could be your bio if you had one. Set one up as soon as you can to tell everyone about yourself. Bios help others learn about you."
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
