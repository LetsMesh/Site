import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  List,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

function ProfileCard(
  index: number,
  position: number,
  leftPos: string,
  onTop: number,
  visible: number,
  image: string
) {
  const interests = [""];
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
        width: "30vw",
        height: "50vh",
        overflow: "hidden",
        background: "white",
        borderRadius: "30px",
      }}
    >
      <CardHeader
        avatar={<Avatar src={image}></Avatar>}
        title="THUG SHAKER"
        subheader="THE THUG SHAKER"
      />
      <CardContent>
        <TextField
          label="Biography"
          variant="outlined"
          multiline
          maxRows={4}
          disabled
          fullWidth
          defaultValue="I LOVE THUG SHAKING PLEASE SHOW ME MORE GIVE ME MORE THUG SHAKER"
          sx={{
            ".Mui-disabled textarea": {
              WebkitTextFillColor: "black",
              color: "black",
            },
          }}
        />

        <Grid container></Grid>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
