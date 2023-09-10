import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreFilled from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import ProfileAccordionTextField from "./profile-accordion-textfield";

export default function ProfileAccordion(props: {
  text1: string;
  text2: string;
  descPlaceholder: string;
  descText: string;
  charLimit: number;
  accordionIndex: number;
}) {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const toggleExpand = () => setExpanded(!expanded);
  return (
    <Accordion expanded={expanded} onChange={toggleExpand} sx={{
      "&.MuiAccordion-root":{
        margin: 0
      }
    }}>
      <AccordionSummary expandIcon={<ExpandMoreFilled />}>
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          {props.text1}
        </Typography>
        <Typography>{props.text2}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ProfileAccordionTextField
          label={"Description"}
          placeholder={props.descPlaceholder}
          text={props.descText}
          charLimit={100}
          accordionIndex={props.accordionIndex}
        />
      </AccordionDetails>
    </Accordion>
  );
}

