
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import React from 'react';
import { Grid, Typography, Box, Stack } from "@mui/material";

export default function reviewsSection() {

    const title = "See What Our Users Say About Mesh"
    const reviewMessages = ["\"Mesh has been a game-changer in my career. I found an amazing mentor who guided me through every step. Highly recommended!\"",
        "\"As a mentor on Mesh, I have had the opportunity to make a real impact on the lives of aspiring professionals. It's an incredible platform!\"",
        "\"Mesh is a game-changer for mentorship. It connects professionals from different backgrounds, enabling them to share their knowledge and shape the future of their industries. I'm proud to be part of this community.\"",
        "\"I had the privilege of being a mentor on Mesh, and it has been an incredibly rewarding experience. Guiding and empowering the next generation of professionals is truly fulfilling.\" "

    ]
    const reviewers = ["- John Doe,", "- Jane Smith,", "- Rachel Patel,", "- Michael Ramirez,"];
    const positions = ["Software Engineer", "Marketing Manager", "Business Consultant", "Financial Advisor"]
    const numStars = [5, 4.5, 4, 5];

    function rowStars(starNum: number) {
        const stars = [];

        //put in whole stars

        let numWholeStars = Math.floor(starNum);

        for (let i = 0; i < numWholeStars; i++) {
            stars.push(<StarIcon sx={{ color: "#FFB400" }} />);
        }
        //put in half stars

        let numHalfStars = (starNum % 1) > 0 ? 1 : 0;

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


    const reviewColumns = reviewMessages.map((message, index) => {

        let stars = rowStars(numStars[index]);
        return (
            <Stack alignItems={"center"} p={5} rowGap={3}>

                <Box width="135px" height="120px" borderRadius="50%" sx={{ background: "#D9D9D9" }}>
                    <img src=""></img>
                </Box>

                <Stack direction={"row"}>
                    {stars}
                </Stack>

                <Stack>
                    <Typography color="#26383A" fontSize={"16px"} lineHeight={"21.47px"} textAlign={'center'} width={"180px"}>
                        {message}
                    </Typography>
                    <Typography color="#26383A" fontSize={"16px"} lineHeight={"21.47px"} textAlign={'center'} width={"180px"}>
                        {reviewers[index]}
                    </Typography>
                    <Typography color="#26383A" fontSize={"16px"} lineHeight={"21.47px"} textAlign={'center'} width={"180px"}>
                        {positions[index]}
                    </Typography>
                </Stack>
            </Stack>

        )
    })



    return (

        <Grid container item direction="column" xs={12} p={3} sx={{ background: "#F2E8DE" }}>

            <Grid item xs={12}>
                <Typography variant="h2" fontWeight={600} fontSize={'32px'} lineHeight={'32px'} textAlign={'center'}>{title}</Typography>
                <Grid item container alignItems={"flex-start"} justifyContent={"space-evenly"} xs={12} >
                    {reviewColumns}
                </Grid>
            </Grid>
        </Grid>
    )
}
