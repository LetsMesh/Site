import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Card, CardMedia, CardTypeMap, Grid, IconButton, Paper } from "@mui/material";
import profileCard from "./ProfileCard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Slider() {
  const images = [
    "https://media.tenor.com/cOvqBWFm4gIAAAAd/svod-thug-shaker.gif",
    "https://www.wideopenpets.com/wp-content/uploads/sites/6/2018/02/AdobeStock_109255057.jpg",
    "https://images.livemint.com/img/2021/09/08/1140x641/erik-jan-leusink-IbPxGLgJiMI-unsplash_1631079336162_1631079359671.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyFmpv3VDfx13aPqlY__oyW4Xpmi7VoEYo3cMcejNL9A&usqp=CAU&ec=48665698",
    "https://www.wideopenpets.com/wp-content/uploads/sites/6/2018/02/AdobeStock_109255057.jpg",
    "https://images.livemint.com/img/2021/09/08/1140x641/erik-jan-leusink-IbPxGLgJiMI-unsplash_1631079336162_1631079359671.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyFmpv3VDfx13aPqlY__oyW4Xpmi7VoEYo3cMcejNL9A&usqp=CAU&ec=48665698",
  ];
  const [position, positionSet] = useState(0);

  const onRight = () => {
    if (position < images.length - 1) {
      positionSet(position + 1);
    }
  };
  const onLeft = () => {
    if (position > 0) {
      positionSet(position - 1);
    }
  };
  const handlers = useSwipeable({
    delta: 0,
    onSwipedLeft: () => onRight(),
    onSwipedRight: () => onLeft(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  let divs = images.map((image: string, index: number) => {
    let onTop: number = 0;
    let leftPos: string = `${(index - position) * 20 + 20 }vw`;
    let visible: number = 1;
    if (position === index) {
      onTop = 1;
    } else {
      onTop = 0;
      if (index < position - 1 || index > position + 1) {
        visible = 0;
      }
    }
    let profile = profileCard(index, position, leftPos, onTop, visible, image);

    return profile;
  });

  return (
    <Grid
      container
      xs={12}
      justifyContent="center"
      alignItems="center"
      sx={{
        background: "#0B7D66",
        minHeight: "100vh",
        overflowX:"hidden"
      }}
    >
      <Grid
        item
        sx={{
          position: "relative",
          width: "80vw",
          height: "50vh"
        }}
        {...handlers}
      >
        {divs}
      </Grid>
      <Grid container sm={10} justifyContent={"space-between"}>
        <Grid item>
          <IconButton  children={(<ArrowBackIcon sx={{fontSize: '50px'}} />)} onClick={onLeft}/>
        </Grid>
        <Grid item>
        <IconButton   children={(<ArrowForwardIcon sx={{fontSize: '50px'}}/>)} onClick={onRight}/>

        </Grid>
      </Grid>
    </Grid>
  );
}

export default Slider;
