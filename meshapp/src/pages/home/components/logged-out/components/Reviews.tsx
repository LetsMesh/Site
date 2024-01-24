import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import React from "react";
import { Grid, Typography, Box, Stack } from "@mui/material";
import { GridItem } from "../../../../../components/resuables/Grids";

//contains the reviews section
const ReviewsSection = () => {
  //has the title, reviews, ratings, and their corresponding reviewer names and positions

  const reviewMessages = [
    '"Mesh has been a game-changer in my career. I found an amazing mentor who guided me through every step. Highly recommended!"',
    '"As a mentor on Mesh, I have had the opportunity to make a real impact on the lives of aspiring professionals. It\'s an incredible platform!"',
    '"Mesh is a game-changer for mentorship. It connects professionals from different backgrounds, enabling them to share their knowledge and shape the future of their industries. I\'m proud to be part of this community."',
    '"I had the privilege of being a mentor on Mesh, and it has been an incredibly rewarding experience. Guiding and empowering the next generation of professionals is truly fulfilling." ',
  ];
  const reviewers = [
    "- John Doe,",
    "- Jane Smith,",
    "- Rachel Patel,",
    "- Michael Ramirez,",
  ];
  const positions = [
    "Software Engineer",
    "Marketing Manager",
    "Business Consultant",
    "Financial Advisor",
  ];
  const numStars = [5, 4.5, 4, 5];

  //contains array holding the rating of each review formatted into stars in a row
  function rowStars(starNum: number) {
    const stars = [];

    //put in whole stars

    let numWholeStars = Math.floor(starNum);

    for (let i = 0; i < numWholeStars; i++) {
      stars.push(<StarIcon sx={{ color: "#FFB400" }} />);
    }
    //put in half stars

    let numHalfStars = starNum % 1 > 0 ? 1 : 0;

    if (numHalfStars > 0) {
      stars.push(<StarHalfIcon sx={{ color: "#FFB400" }} />);
    }
    //put in empty stars
    let numEmptyStars = 5 - Math.ceil(starNum);
    for (let i = 0; i < numEmptyStars; i++) {
      stars.push(<StarOutlineIcon sx={{ color: "#FFB400" }} />);
    }

    return stars;
  }

  //contains array of the columns of each review
  const reviewColumns = reviewMessages.map((message, index) => {
    //get the star row for the current rating
    let stars = rowStars(numStars[index]);
    return (
      //holds the review, stacks it vertically
      <Stack
        alignItems={"center"}
        p={5}
        rowGap={3}
        width={"30%"}
        sx={{
          "@media (min-width:900px)": {
            width: "10%",
          },
          "@media (min-width: 1100px": {
            width: "40%",
          },
        }}
      >
        {/*grey circle container for the reviewer image*/}
        <Box
          width="135px"
          height="120px"
          borderRadius="50%"
          sx={{ background: "#D9D9D9" }}
        >
          <img src="" alt=""></img>
        </Box>

        {/*stars*/}
        <Stack direction={"row"}>{stars}</Stack>

        {/*stacks the review, reviewer's name, and their position*/}

        <Stack width={"100%"}>
          <Typography variant="body2" textAlign={"center"}>
            {message}
          </Typography>
          <Typography variant="body2" textAlign={"center"}>
            {reviewers[index]}
          </Typography>
          <Typography variant="body2" textAlign={"center"}>
            {positions[index]}
          </Typography>
        </Stack>
      </Stack>
    );
  });

  //returns the title of the section and the review container vertically stacked on each other

  return (
    <GridItem
      container
      direction="column"
      xs={12}
      p={3}
      sx={{ backgroundColor: "secondary.main" }}
    >
      <GridItem color="text.primary">
        <GridItem>
          <Typography
            textAlign={"center"}
            sx={{ fontSize: "2em", fontWeight: 700, fontFamily: "cocogoose" }}
          >
            See What Our Users Say About Mesh 🌱
          </Typography>
        </GridItem>
        <GridItem
          container
          alignItems={"flex-start"}
          justifyContent={"space-evenly"}
          xs={12}
        >
          {reviewColumns}
        </GridItem>
      </GridItem>
    </GridItem>
  );
};

export default ReviewsSection;
