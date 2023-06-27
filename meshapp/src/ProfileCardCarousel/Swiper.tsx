import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Grid, IconButton } from "@mui/material";
import profileCard from "./ProfileCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const profiles = [
  {
    image: "https://media.tenor.com/cOvqBWFm4gIAAAAd/svod-thug-shaker.gif",
    name: "Joe Mrowgan",
    job: "podcast host",
    biography: "MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEEO MEW",
    interests: ["misinformation", "cats", "meow", "el gato", "kitty"],
    details: [
      "cat entertainer in training",
      "B.S in Milk Drinking",
      "Looking for a Mentor",
    ],
  },
  {
    image: "https://media.tenor.com/59a5ljZD-uMAAAAd/cat-shut-up.gif",
    name: "MEOWSTER",
    job: "milk guru",
    biography:
      "BARK BARK WOOF WOOF RUFF RUFF BARK WOOF RUFF RUFF WOOF GRRR BARK BARK RUFF RUFF GRR WOOF WOOF GRRRR MEOW GRRRR MEOW MEOW MEWWWWW WOOOF WOOF GRRR RUFF MEWO MEWO",
    interests: ["wire fraud", "cats", "meow", "el gato", "kitty"],
    details: [
      "cat scammer in training",
      "B.S in Milk Laundering",
      "Looking for a Mark",
    ],
  },
  {
    image:
      "https://www.wideopenpets.com/wp-content/uploads/sites/6/2018/02/AdobeStock_109255057.jpg",
    name: "Mr. Paws",
    job: "Cat Burgular",
    biography: "MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEEO MEW",
    interests: ["grand larceny", "cats", "meow", "el gato", "kitty"],
    details: [
      "cat burglar in training",
      "B.S in Milk Robbing",
      "Looking for a Mentor",
    ],
  },
  {
    image:
      "https://images.livemint.com/img/2021/09/08/1140x641/erik-jan-leusink-IbPxGLgJiMI-unsplash_1631079336162_1631079359671.jpg",
    name: "Mrowster Pawsident",
    job: "Pawsident",
    biography:
      "BARK BARK WOOF WOOF RUFF RUFF BARK WOOF RUFF RUFF WOOF GRRR BARK BARK RUFF RUFF GRR WOOF WOOF GRRRR MEOW GRRRR MEOW MEOW MEWWWWW WOOOF WOOF GRRR RUFF MEWO MEWO",
    interests: ["insider trading", "cats", "meow", "el gato", "kitty"],
    details: [
      "bureaucat in training",
      "B.S in Milk Peddling",
      "Looking for a Mentor",
    ],
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyFmpv3VDfx13aPqlY__oyW4Xpmi7VoEYo3cMcejNL9A&usqp=CAU&ec=48665698",
    name: "Alex Mrownes",
    job: "propagandist",
    biography: "MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEEO MEW",
    interests: ["cats", "meow", "fearmongering", "el gato", "kitty"],
    details: [
      "cat propagandist in training",
      "B.S in Milk Stockpiling",
      "Looking for a Mentor",
    ],
  },
];

function Swiper() {
  //keeps track of the current card we're on
  const [position, positionSet] = useState(0);

  //methods for moving to the next or previous card
  const [goRight, goLeft] = CardTraversal(
    profiles.length,
    position,
    positionSet
  );

  //allows mouse/touch swiping to traverse through cards
  const swipeHandler = useSwipeable({
    delta: 0,
    onSwipedLeft: () => goRight(),
    onSwipedRight: () => goLeft(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  //keeps track of window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    //keeps track of screen width
    function setWidth() {
      setWindowWidth(window.innerWidth);
    }
    //adds keyboard event listeners, goes to the right if arrow right or 'd' key, goes to left if arrow left or 'a' key
    function keyPress(e: KeyboardEvent) {
      let { key } = e;
      key = key.toLowerCase();
      if (key === "arrowright" || key === "d") {
        goRight();
      } else if (key === "arrowleft" || key === "a") {
        goLeft();
      }
    }
    window.addEventListener("resize", setWidth);
    window.addEventListener("keydown", keyPress);

    return () => {
      window.removeEventListener("resize", setWidth);
      window.removeEventListener("keydown", keyPress);
    };
  });

  //get the profile cards to insert them into the container
  let profileCards = ProfileCards(profiles, position, windowWidth);

  //container of the card swiper, and has the arrows buttons controlling the card swiping below
  return (
    <Grid
      container
      xs={12}
      justifyContent="center"
      alignItems="center"
      bgcolor="primary.main"
      sx={{
        minHeight: "100vh",
        padding: 0,
        margin: 0,
        overflowX: "hidden",
      }}
    >
      <Grid
        container
        sx={{
          position: "relative",
          width: "80vw",
          height: "70vh",
        }}
        {...swipeHandler}
      >
        {profileCards}
      </Grid>
      <Grid container xs={12} md={10} justifyContent={"space-between"}>
        <Grid item>
          <IconButton
            children={
              <ArrowBackIcon
                sx={{ fontSize: "50px", color: "action.active" }}
              />
            }
            onClick={goLeft}
          />
        </Grid>
        <Grid item>
          <IconButton
            children={
              <ArrowForwardIcon
                sx={{ fontSize: "50px", color: "action.active" }}
              />
            }
            onClick={goRight}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

//creates array of the profile cards based on profile info array, position of the current card, and the window width
function ProfileCards(
  profileArray: {
    image: string;
    name: string;
    job: string;
    biography: string;
    interests: string[];
    details: string[];
  }[],
  position: number,
  windowWidth: number
) {
  //array of all the user profile cards
  let profCards = profileArray.map(
    ({ image, name, job, biography, interests, details }, index: number) => {
      //controls which card shows up on top of the stack
      let onTop: number = 0;

      //controls the positioning of the cards depending on what index they are from the current position
      //if window width is lower than 700 it will stack the cards closer together

      const SMALL_WINDOW_WIDTH: number = 700;
      const LARGE_WINDOW_CARD_GAP = 15;
      const LARGE_WINDOW_CARD_CENTER = 14;
      const SMALL_WINDOW_CARD_GAP = 10;
      const SMALL_WINDOW_CARD_CENTER = 4.5;
      let leftPos: string =
        windowWidth > SMALL_WINDOW_WIDTH
          ? `${
              (index - position) * LARGE_WINDOW_CARD_GAP +
              LARGE_WINDOW_CARD_CENTER
            }vw`
          : `${
              (index - position) * SMALL_WINDOW_CARD_GAP +
              SMALL_WINDOW_CARD_CENTER
            }vw`;

      //controls whether card is visible or not
      let visible: number = 1;

      //if position matches index, it will be on top, otherwise it will be under
      if (position === index) {
        onTop = 1;
      } else {
        onTop = 0;
        //if the cards aren't right before or after the current card, they will not be visible
        if (index < position - 1 || index > position + 1) {
          visible = 0;
        }
      }

      let profile = profileCard(
        index,
        position,
        leftPos,
        onTop,
        visible,
        image,
        name,
        job,
        biography,
        interests,
        details,
        windowWidth
      );

      return profile;
    }
  );

  //return array of profile cards
  return profCards;
}

//creates and returns the methods for going to the pervious or next card, based on the length of the profile array, the index position of the current card, and the useState method for updating that position
function CardTraversal(
  cardArrayLength: number,
  position: number,
  positionSet: (position: number) => void
) {
  //moves to the next card if possible
  const goRight = () => {
    if (position < cardArrayLength - 1) {
      positionSet(position + 1);
    }
  };

  //moves to previous card if possible
  const goLeft = () => {
    if (position > 0) {
      positionSet(position - 1);
    }
  };

  return [goRight, goLeft];
}

export default Swiper;
