import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreFilled from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import ProfileAccordionTextField from "./profile-accordion-textfield";
import ProfileAccordionComboBox from "./profile-accordion-combobox";
import { useState } from "react";
import { useGroupAccordContext } from "./profile-group_accordion";

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

  const GroupAccordContext = useGroupAccordContext();
  const groupState = GroupAccordContext.groupState;
  const setGroupState = GroupAccordContext.setGroupState;

  return (
    <Accordion
      expanded={expanded}
      onChange={toggleExpand}
      sx={{
        "&.MuiAccordion-root": {
          margin: 0,
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreFilled />}>
        {/* <Typography sx={{ width: "33%", flexShrink: 0 }}>
          {props.text1}
        </Typography>
          
        <Typography>{props.text2}</Typography> */}
        <ProfileAccordionComboBox
          value={props.text1}
          disabled={false}
          placeholderText={"text1 here"}
          options={["car", "dog", "ball"]}
          onChange={(event, newValue) => {
            setGroupState(
              groupState.map((profileAccordion, index) => {
                if (index === props.accordionIndex) {
                  return {
                    text1: newValue ? newValue : "",
                    text2: profileAccordion.text2,
                    descText: profileAccordion.descText,
                  };
                }
                return {
                  text1: profileAccordion.text1,
                  text2: profileAccordion.text2,
                  descText: profileAccordion.descText,
                };
              })
            );
          }}
        />
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
