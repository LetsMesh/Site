import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreFilled from "@mui/icons-material/ExpandMore";
import ProfileAccordionTextField from "./profile-accordion-textfield";
import ProfileAccordionComboBox from "./profile-accordion-combobox";
import { useGroupAccordContext } from "./profile-group_accordion";
import { Box, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

export default function ProfileAccordion(props: {
  headerOne: string;
  headerTwo: string;
  descPlaceholder: string;
  descText: string;
  charLimit: number;
  accordionIndex: number;
  headerOnePlaceholder: string;
  headerTwoPlaceholder: string;
  headerOneOptions: Array<string>;
  headerTwoOptions: Array<string>;
}) {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const toggleExpand = () => setExpanded(!expanded);

  const [editMode, setEditMode] = useState(false);

  const GroupAccordContext = useGroupAccordContext();
  const groupState = GroupAccordContext.groupState;
  const setGroupState = GroupAccordContext.setGroupState;

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  return (
    <Accordion
      expanded={expanded}
      sx={{
        "&.MuiAccordion-root": {
          margin: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreFilled onClick={toggleExpand} />}
      >
        <Box sx={{ width: "33%", flexShrink: 0 }}>
          <ProfileAccordionComboBox
            value={props.headerOne}
            disabled={!editMode}
            placeholderText={props.headerOnePlaceholder}
            options={props.headerOneOptions}
            onChange={(event, newValue) => {
              setGroupState(
                groupState.map((profileAccordion, index) => {
                  if (index === props.accordionIndex) {
                    return {
                      headerOne: newValue ? newValue : "",
                      headerTwo: profileAccordion.headerTwo,
                      descText: profileAccordion.descText,
                    };
                  }
                  return {
                    headerOne: profileAccordion.headerOne,
                    headerTwo: profileAccordion.headerTwo,
                    descText: profileAccordion.descText,
                  };
                })
              );
            }}
          />
        </Box>
        <ProfileAccordionComboBox
          value={props.headerTwo}
          disabled={!editMode}
          placeholderText={props.headerTwoPlaceholder}
          options={props.headerTwoOptions}
          onChange={(event, newValue) => {
            setGroupState(
              groupState.map((profileAccordion, index) => {
                if (index === props.accordionIndex) {
                  return {
                    headerOne: profileAccordion.headerOne,
                    headerTwo: newValue ? newValue : "",
                    descText: profileAccordion.descText,
                  };
                }
                return {
                  headerOne: profileAccordion.headerOne,
                  headerTwo: profileAccordion.headerTwo,
                  descText: profileAccordion.descText,
                };
              })
            );
          }}
        />
        <Grid
          xs={0.5}
          display="flex"
          flexDirection="row"
          alignItems={"center"}
          color={editMode ? "#0b7d66" : "#00000061"}
          sx={{ marginRight: "8px" }}
        >
          {editMode ? (
            <SaveIcon
              onClick={(event) => {
                event.stopPropagation();
                handleSaveClick();
              }}
              sx={{
                "&:hover": {
                  color: "#0A6B57",
                },
                cursor: "pointer",
                transition: "color 0.15s ease-in-out",
              }}
            />
          ) : (
            <EditIcon
              onClick={(event) => {
                event.stopPropagation();
                handleEditClick();
              }}
              sx={{
                "&:hover": {
                  color: "#0b7d66",
                },
                cursor: "pointer",
                transition: "color 0.15s ease-in-out",
              }}
            />
          )}
        </Grid>
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
