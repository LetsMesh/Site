
import { Grid, Typography, Box, Stack } from "@mui/material";
import React from "react";

import sprout1 from './sprout1.png'
import sprout2 from './sprout2.png'
import sprout3 from './sprout3.png'
import sprout4 from './sprout4.png'

export default function advertMessage() {
    const title = "Discover Your Path to Success with Mesh";
    const sproutImages = [sprout1, sprout2, sprout3, sprout4];
    const advertMessages = ["Connect with Experienced Mentors and Passionate Mentees across Various Career Disciplines",
        "Gain Valuable Insights, Guidance, and Support to Accelerate Your Professional Growth",
        "Foster Meaningful Relationships and Networks within Your Industry",
        "Empower Others by Sharing Your Knowledge and Expertise"];

    const rows = advertMessages.map((message, index) => {
        return (
            <Grid item container xs={12} flexBasis="content" gap={"20px"} alignItems="center" justifyContent="flex-start" direction={(index % 2 === 0) ? "row" : "row-reverse"}>
                <Box width={"215px"} height={"215px"} p={"0 0 10px 0"} borderRadius={"40px"} display={"flex"} alignItems="flex-end" justifyContent="center" sx={{ background: "#D9D9D9" }} >
                    <img src={sproutImages[index]} width={"160px"} />
                </Box>
                <Typography fontSize={"24px"} lineHeight={"32.21px"} textAlign={(index % 2 === 0) ? "left" : "right"} width="500px">{message}</Typography>

            </Grid>

        )
    })

    const advertContainer = (
        <Stack spacing={2} sx={{ padding: "0 20px" }}>
            {rows}
        </Stack>
    )




    return (
        <Grid container item direction="column" xs={12}>

            <Grid item xs={12} sx={{
                background: '#F2E8DE',
                padding: "20px 0"

            }}>
                <Typography variant="h2" fontWeight={600} fontSize={'32px'} lineHeight={'32px'} textAlign={'center'}>{title}</Typography>

            </Grid>


            <Grid container xs={12} rowSpacing={1} p={5} direction="column" alignItems="center" justifyContent="center" >
                {advertContainer}
            </Grid>
        </Grid>
    )


}
