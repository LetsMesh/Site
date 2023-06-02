import { Grid, Typography, Box, Stack } from "@mui/material";
import React from "react";

import sprout1 from "./sprout1.png";
import sprout2 from "./sprout2.png";
import sprout3 from "./sprout3.png";
import sprout4 from "./sprout4.png";

//contains the whole section for the advertising messages
export default function advertSection() {
  const title = "Discover Your Path to Success with Mesh";
  const sproutImages = [sprout1, sprout2, sprout3, sprout4];
  const advertMessages = [
    "Connect with Experienced Mentors and Passionate Mentees across Various Career Disciplines",
    "Gain Valuable Insights, Guidance, and Support to Accelerate Your Professional Growth",
    "Foster Meaningful Relationships and Networks within Your Industry",
    "Empower Others by Sharing Your Knowledge and Expertise",
  ];

  //formats each image and advertising message into a row, makes direction to the left or right depending on index
  const rows = advertMessages.map((message, index) => {
    return (
      <Grid
        item
        container
        xs={12}
        sm={8}
        flexBasis="content"
        gap={"20px"}
        alignItems="center"
        justifyContent="flex-start"
        flexWrap="nowrap"
        direction={index % 2 === 0 ? "row" : "row-reverse"}
      >
        {/* grey image container for the sprout images*/}
        <Box
          minHeight={"100px"}
          minWidth={"100px"}
          p={"0 0 10px 0"}
          borderRadius={"20%"}
          display={"flex"}
          alignItems="flex-end"
          justifyContent="center"
          sx={{
            background: "#D9D9D9",
            "@media (min-width: 600px)": {
              minWidth: "215px",
              minHeight: "215px",
              maxHeight: "215px",
              maxWidth: "215px",
            },
          }}
        >
          {/*sprout image*/}

          <img src={sproutImages[index]} width={"80%"} alt="sprout" />
        </Box>
        {/*advert message*/}
        <Typography
          variant="body1"
          textAlign={index % 2 === 0 ? "left" : "right"}
        >
          {message}
        </Typography>
      </Grid>
    );
  });

  //stacks the reviews
  const advertContainer = (
    <Stack spacing={2} alignItems="center">
      {rows}
    </Stack>
  );

  return (
    //contains the section title and the advert container
    <Grid container item direction="column" xs={12}>
      <Grid
        item
        xs={12}
        sx={{
          background: "#F2E8DE",
          padding: "20px 0",
        }}
      >
        <Typography variant="h3" textAlign={"center"}>
          {title}
        </Typography>
      </Grid>

      <Grid
        container
        xs={12}
        rowSpacing={1}
        p={5}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {advertContainer}
      </Grid>
    </Grid>
  );
}
