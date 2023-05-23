import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import sprout1 from './sprout1.png'
import sprout2 from './sprout2.png'
import sprout3 from './sprout3.png'
import sprout4 from './sprout4.png'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';

export default function LoggedOutPage() {
    return (

        <Grid container sx={{
            flexDirection: 'column'
            
        }}>

            {/*-------------------------HEADER-------------------------*/}
            <Grid item container direction="row" justifyContent="space-evenly" alignItems="center" xs={12} sx={{
                background: '#0B7D66',

            }}>

                {/*-------------------------------Welcome Message--------------------------------------*/}
                {welcomeMessage()}
                {/*-------------------------------Login Bubble--------------------------------------*/}

                <Grid item container xs={3}>



                </Grid>
            </Grid>


            {/*-----------------------Advertisement Section-------------------------------------*/}
            {advertMessage()}


            {/*----------------------------Review Section-----------------------------------------*/}
            {reviewsSection()}
        </Grid>
    )





}



function welcomeMessage() {

    return (
        <Grid item container xs={3} direction="column" p={5} rowGap={2} alignItems="center" color="#F2E8DE">
            <Typography variant="h1" fontWeight={600} fontSize={'36px'} lineHeight={'36px'} textAlign={'center'}>Find Your Perfect Mentor or Mentee with Mesh</Typography>
            <Typography fontWeight={250} fontSize={'24px'} lineHeight={'32px'} textAlign={'center'}>Unlock Your Potential with Expert Guidance and Support.</Typography>
            <Button variant="contained"
                sx={{
                    background: '#68D391',
                    textDecoration: 'uppercase',
                    padding: '6px 16px',
                    fontSize: '20px',
                    lineHeight: '24px',
                    minWidth: '250px',
                    height: '50px',
                    borderRadius: '15px'
                }}>Sign Up</Button>
        </Grid>
    )
}

function advertMessage() {
    const title = "Discover Your Path to Success with Mesh";
    const sproutImages = [sprout1, sprout2, sprout3, sprout4];
    const advertMessages = ["Connect with Experienced Mentors and Passionate Mentees across Various Career Disciplines",
        "Gain Valuable Insights, Guidance, and Support to Accelerate Your Professional Growth",
        "Foster Meaningful Relationships and Networks within Your Industry",
        "Empower Others by Sharing Your Knowledge and Expertise"];

    const rows = advertMessages.map((message, index) => {
        return(
        <Grid item container xs={12}  flexBasis="content" gap={"20px"} alignItems="center" justifyContent="flex-start" direction={(index % 2 === 0) ? "row" : "row-reverse" }>
            <Box width={"215px"} height={"215px"} p={"0 0 10px 0"}borderRadius={"40px"} display={"flex"} alignItems="flex-end" justifyContent="center" sx={{background:"#D9D9D9"}} >
                <img src={sproutImages[index]} width={"160px"}/>
            </Box>
            <Typography fontSize={"24px"} lineHeight={"32px"} textAlign={(index % 2 === 0) ? "left" : "right" } width="500px">{message}</Typography>
            
        </Grid>

        )
    })

    const advertContainer = (
        <Stack spacing={2} sx={{padding: "0 20px"}}>
            {rows}
        </Stack>
    )




    return (
        <Grid container item direction="column" xs={12}>

            <Grid item xs={12} sx={{
                background: '#F2E8DE',
                padding:"20px 0"

            }}>
                <Typography variant="h2" fontWeight={600} fontSize={'32px'} lineHeight={'32px'} textAlign={'center'}>{title}</Typography>

            </Grid>


            <Grid container xs={12} rowSpacing={1} p={5} direction="column" alignItems="center" justifyContent="center" >
                {advertContainer}
            </Grid>
        </Grid>
    )


}


function reviewsSection(){
    
    const title ="See What Our Users Say About Mesh"
    const reviewMessages =["\"Mesh has been a game-changer in my career. I found an amazing mentor who guided me through every step. Highly recommended!\"", 
    "\"As a mentor on Mesh, I have had the opportunity to make a real impact on the lives of aspiring professionals. It's an incredible platform!\"",
"\"Mesh is a game-changer for mentorship. It connects professionals from different backgrounds, enabling them to share their knowledge and shape the future of their industries. I'm proud to be part of this community.\"",
"\"I had the privilege of being a mentor on Mesh, and it has been an incredibly rewarding experience. Guiding and empowering the next generation of professionals is truly fulfilling.\" "

]
    const reviewers = ["- John Doe, Software Engineer","- Jane Smith, Marketing Manager","- Rachel Patel, Business Consultant", "- Michael Ramirez, Financial Advisor"];
    const numStars = [5, 4.5, 4, 5];

    function rowStars( starNum: number){
        const stars = [];

        //put in whole stars

        let numWholeStars = Math.floor(starNum);

        for(let i = 0; i < numWholeStars; i++){
            stars.push(<StarIcon sx={{color: "#FFB400"}}/>);
        }
        //put in half stars
        
        let numHalfStars = (starNum % 1) > 0 ? 1 : 0;

        if(numHalfStars > 0){
            stars.push(<StarHalfIcon sx={{color: "#FFB400"}}/>);
        }
        //put in empty stars
        let numEmptyStars = 5 - Math.ceil(starNum);
        for(let i = 0; i < numEmptyStars; i++){
            stars.push(<StarOutlineIcon sx={{color: "#FFB400"}}/>);
        }

     

        return stars;
    }


    const reviewColumns = reviewMessages.map( (message, index)=>{

        let stars = rowStars(numStars[index]);
        return (
        <Stack alignItems={"center"} p={5} rowGap={3}>

        <Box width="135px" height="120px" borderRadius="50%"  sx={{background:"#D9D9D9"}}>
            <img src=""></img>
        </Box>

        <Stack direction={"row"}>
            {stars}
        </Stack>

        <Typography color="#26383A" fontSize={"16px"} lineHeight={"22px"} textAlign={'center'} width={"180px"}>
            {message}
        </Typography>
        <Typography color="#26383A" fontSize={"16px"} lineHeight={"22px"} textAlign={'center'} width={"180px"}>
            {reviewers[index]}
        </Typography>
        </Stack>

        )
    })



    return (

        <Grid container item direction="column"  xs={12} p={3} sx={{background:"#F2E8DE"}}>

            <Grid item xs={12}>
            <Typography variant="h2" fontWeight={600} fontSize={'32px'} lineHeight={'32px'} textAlign={'center'}>{title}</Typography>
            <Grid item container alignItems={"flex-start"} justifyContent={"space-evenly"} xs={12} >
            {reviewColumns}
            </Grid>
            </Grid>
            </Grid>
    )
}
