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
  details: string[]
) {
  const interestChips = interests.map((interest) => {
    return <Chip label={interest} />;
  });

  const icons = [<WorkIcon />, <FolderIcon />, <GroupIcon />];

  const detailListItems = [];
  for (let i = 0; i < (details.length < 3 ? details.length : 3); i++) {
    detailListItems.push(
      <ListItem>
        <ListItemIcon>{icons[i]}</ListItemIcon>
        <ListItemText>{details[i]}</ListItemText>
      </ListItem>
    );
  }

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
        position: "absolute",
        width: "40vw",
        overflow: "hidden",
        background: "white",
        borderRadius: "30px",
        border: "15px solid #D9D9D9",
      }}
    >
      <CardHeader
        avatar={<Avatar src={image} variant="square"></Avatar>}
        title={name}
        subheader={job}
      />
      <CardContent>
        <TextField
          label="Biography"
          variant="outlined"
          multiline
          maxRows={4}
          disabled
          fullWidth
          defaultValue={biography}
          sx={{
            ".Mui-disabled textarea": {
              WebkitTextFillColor: "black",
              color: "black",
            },
          }}
        />

        <Grid container direction="column" alignItems={"flex-start"} p={1}>
          <Grid item>
            <Typography>Interests</Typography>
          </Grid>
          <Grid container sm={11.5} alignSelf="flex-end" p={1} columnGap={1}>
            {interestChips}
          </Grid>
        </Grid>

        <List>{detailListItems}</List>
      </CardContent>

      <CardActions
        sx={{
          background: "#F1E8DF",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-around",
          alignItems: "center",
          p: 4,
          marginTop: "50px",
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
            background: "#74D194",
            padding: "15px 20px",
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
    </Card>
  );
}

export default ProfileCard;
