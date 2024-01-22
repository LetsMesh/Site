import { Grid, Typography, Box, Stack } from "@mui/material";
import sprout1 from "../../../../assets/media/sprout1.png";
import sprout2 from "../../../../assets/media/sprout2.png";
import sprout3 from "../../../../assets/media/sprout3.png";
import sprout4 from "../../../../assets/media/sprout4.png";
import {
  GridContainer,
  GridItem,
} from "../../../../components/resuables/Grids";

const AdvertisementSection = () => {
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
        // xs={12}
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
          borderRadius={"24px"}
          display={"flex"}
          alignItems="flex-end"
          justifyContent="center"
          sx={{
            // background: "#D9D9D9",
            "@media (min-width: 600px)": {
              minWidth: "215px",
              maxWidth: "215px",
              minHeight: "150px",
              maxHeight: "175px",
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
          sx={{ color: "text.main" }}
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
    // contains the section title and the advert container
    <>
      <GridContainer>
        <GridItem
          sx={{
            backgroundColor: "secondary.main",
            padding: "10px 0",
            margin: 0,
          }}
        >
          <Typography
            textAlign={"center"}
            sx={{ fontSize: "2em", fontFamily: "cocogoose" }}
          >
            Discover your path to success with{" "}
            <span
              style={{
                fontWeight: 700,
              }}
            >
              mesh 🌱
            </span>
          </Typography>
        </GridItem>

        <GridItem
          container
          rowSpacing={1}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ margin: "20px 0" }}
        >
          {advertContainer}
        </GridItem>
      </GridContainer>
    </>
  );
};

export default AdvertisementSection;
