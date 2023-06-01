// need to convert to typescript

import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
document.body.style.color = "black";

const Footer = () => {
  return (
    <Box>
      <h1 style={{ color: "#1db272", 
                   textAlign: "start", 
                   marginTop: "-50px" }}>
        LetsMesh
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading><u>General</u></Heading>
            <FooterLink href="https://open.spotify.com/">•   Home</FooterLink>
            <FooterLink href="https://www.reddit.com/">•   About</FooterLink>
            <FooterLink href="https://store.steampowered.com/">•   Sign Up</FooterLink>
            <FooterLink href="https://www.linkedin.com/">•   Login</FooterLink>
          </Column>
          <Column>
            <Heading><u>Contact Us</u></Heading>
            <FooterLink href="https://duckduckgo.com/?va=b&t=hc&gclid=EAIaIQobChMIiLqC9fSi_wIVHDjUAR2UkwflEAAYASAAEgLdkfD_BwE">•   Organization</FooterLink>
            <FooterLink href="https://github.com/LetsMesh/Site">•   Project Site</FooterLink>
            <FooterLink href="https://discord.com/">•   Discord Invite</FooterLink>
            <FooterLink href="https://www.youtube.com/">•   Report Bug</FooterLink>
          </Column>
          <Column>
            <Heading><u>Related Links</u></Heading>
            <FooterLink href="https://issilksongout.com/">•   Reviews</FooterLink>
            <FooterLink href="https://www.youtube.com/watch?v=oHg5SJYRHA0">•   Hotline</FooterLink>
            <FooterLink href="https://www.google.com/">•   FAQS</FooterLink>
            <FooterLink href="https://stackoverflow.com/">•   Help</FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;