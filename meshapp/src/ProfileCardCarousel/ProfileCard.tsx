import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import FolderIcon from "@mui/icons-material/Folder";
import GroupIcon from "@mui/icons-material/Group";

import CloseIcon from "@mui/icons-material/Close";
import HeartIcon from "@mui/icons-material/Favorite";

import { motion } from "framer-motion";
import React from "react";

function ProfileCard(
  index: number,
  position: number,
  leftPos: string,
  onTop: number,
  visible: number,
  image: string,
  name: string,
  job: string,
  biography: string,
  interests: string[],
  details: string[],
  windowWidth: number
) {
  //if window goes below 700 pixels card takes up 70vw, otherwise 50vw
  let cardWidth = windowWidth > 700 ? "50vw" : "70vw";
  return (
    <Card
      component={motion.div}
      key={index}
      initial={{ opacity: 0 }}
      animate={
        {
          scale: index === position ? 1 : 0.8,
          left: leftPos,
          zIndex: onTop,
          opacity: visible,
        } as any
      }
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      sx={{
        backgroundColor: "cardBackground.main",
        position: "absolute",
        width: `${cardWidth}`,
        overflow: "hidden",
        borderRadius: "30px",
        border: "1vw solid #D9D9D9",
      }}
    >
      {ProfileHeader(image, name, job)}
      <CardContent>
        {Biography(biography)}
        {InterestsSection(interests)}
        {detailsSection(details)}
      </CardContent>

      {Actions(position, index)}
    </Card>
  );
}

//header of profile card containing user image, name, and job
function ProfileHeader(image: string, name: string, job: string) {
  return (
    <CardHeader
      avatar={<Avatar src={image} variant="square"></Avatar>}
      title={name}
      subheader={job}
    />
  );
}

//textfield containing biography of user
function Biography(biography: string) {
  return (
    <TextField
      label="Biography"
      variant="outlined"
      multiline
      maxRows={2}
      inputProps={{ readOnly: true }}
      focused={false}
      fullWidth
      defaultValue={biography}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& > fieldset": {
            borderColor: "input.outlined.enabledBorder",
          },
        },
        "& .MuiOutlinedInput-root:hover": {
          "& > fieldset": {
            borderColor: "input.outlined.enabledBorder",
          },
        },
      }}
    />
  );
}

//contains the listed interests of the user
function InterestsSection(interests: String[]) {
  const interestChips: React.JSX.Element[] = [];

  for (
    let interestIndex = 0;
    interestIndex < interests.length;
    interestIndex++
  ) {
    if (interestIndex < 3) {
      interestChips.push(
        <Chip
          label={interests[interestIndex]}
          sx={{ backgroundColor: "chipBackground.main" }}
        />
      );
    } else {
      interestChips.push(
        <Typography alignSelf="flex-end" color="text.disabled">
          ...
        </Typography>
      );
      break;
    }
  }

  return (
    <Grid container direction="column" alignItems={"flex-start"} p={1}>
      <Grid item>
        <Typography>Interests</Typography>
      </Grid>
      <Grid
        container
        sm={12}
        alignSelf="flex-end"
        p={1}
        columnGap={1}
        rowGap={1}
        sx={{
          "@media(max-height: 630px), (max-width: 500px)": {
            margin: 0,
            padding: 0,
            rowGap: 0,
          },
        }}
      >
        {interestChips}
      </Grid>
    </Grid>
  );
}

//contains the details about the user's occupation, education, and what they're looking for on the meshapp
function detailsSection(details: String[]) {
  const icons = [
    <WorkIcon sx={{ fontSize: "40px" }} />,
    <FolderIcon sx={{ fontSize: "40px" }} />,
    <GroupIcon sx={{ fontSize: "40px" }} />,
  ];

  const detailListItems = [];
  for (let i = 0; i < (details.length < 3 ? details.length : 3); i++) {
    detailListItems.push(
      <ListItem
        sx={{
          "@media(max-height: 630px), (max-width: 500px)": {
            margin: 0,
            padding: 0,
          },
        }}
      >
        <ListItemIcon
          sx={{
            "@media(max-height: 630px), (max-width: 500px)": {
              margin: 0,
              padding: 0,
            },
          }}
        >
          {icons[i]}
        </ListItemIcon>
        <ListItemText
          sx={{
            "@media(max-height: 630px), (max-width: 500px)": {
              margin: 0,
              padding: 0,
            },
          }}
        >
          {details[i]}
        </ListItemText>
      </ListItem>
    );
  }

  return <List sx={{ margin: 0, padding: 0 }}>{detailListItems}</List>;
}

function Actions(position: number, index: number) {
  return (
    <CardActions
      sx={{
        backgroundColor: "secondary.main",
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-around",
        alignItems: "center",
        p: 2,
        margin: "20px 0",
        "@media(max-height: 630px), (max-width: 500px)": {
          margin: "5px 0",
          padding: 0,
        },
      }}
    >
      <IconButton
        disabled={position === index ? false : true}
        sx={{ color: "#FF00008F" }}
        children={<CloseIcon sx={{ fontSize: "50px" }} />}
      />

      <Button
        disabled={position === index ? false : true}
        variant="contained"
        sx={{
          backgroundColor: "buttonColor.main",
          padding: "10px 15px",
          color: "#F1E8DF",
          "&:hover": {
            backgroundColor: "#0e977b",
          },
        }}
      >
        See Full Profile
      </Button>

      <IconButton
        disabled={position === index ? false : true}
        sx={{ color: "#0094FF8F" }}
        children={<HeartIcon sx={{ fontSize: "50px" }} />}
      />
    </CardActions>
  );
}

export default ProfileCard;
