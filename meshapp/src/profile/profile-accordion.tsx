import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreFilled from "@mui/icons-material/ExpandMore";
import ProfileAccordionTextField from "./profile-accordion-textfield";
import { ProfileAccordionComboBox, option } from "./profile-accordion-combobox";
import { useGroupAccordContext } from "./profile-group_accordion";
import { Box, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

/**
 * A React Component that returns an accordion with two comboboxes and a description textfield.
 * Provides editing capabilities for these inputs.
 *
 * Used in Profile Group Accordion (src/profile/profile-group_accordion.tsx)
 *
 * @param props - Properties of the component
 * @param {string} headerOne - value for combobox of this accordion's headerOne, passed down from group state array data
 * @param {string} headerTwo - value for combobox of this accordion's headerTwo, passed down from group state array data
 * @param {string} descPlaceholder - placeholder for description textfield
 * @param {string} descText - value for description textfield, passed down from group state array data
 * @param {number} charLimit - character limit for description textfield
 * @param {number} accordionIndex - index of this accordion within the group state array
 * @param {string} headerOnePlaceholder - placeholder for headerOne combobox
 * @param {string} headerTwoPlaceholder - placeholder for headerTwo combobox
 * @param {Array<string>} headerOneOptions - list of options to be provided to headerOne combobox
 * @param {Array<string>} headerTwoOptions - list of options to be provided to headerTwo combobox
 */
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
  //controls whether accordion is expanded to show description or not
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const toggleExpand = () => setExpanded(!expanded);

  //controls edit mode and toggling
  const [editMode, setEditMode] = useState(false);
  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleSaveClick = () => {
    setEditMode(false);
  };

  //grabs context for state array of profile accordion data and function to set that state array
  const GroupAccordContext = useGroupAccordContext();
  const groupState = GroupAccordContext.groupState;
  const setGroupState = GroupAccordContext.setGroupState;

  //test error validation functions
  const doesntHaveCar = (val: string) => {
    return val === "car" || "doesn't have car";
  };
  const doesntHaveB = (val: string) => {
    return (
      (val.length > 0 && val[val.length - 1] === "B") || "doesn't have B end"
    );
  };

  let errValid = [(val: string) => val.length > 0 || "needs to be empty"];

  //onChange handler for header one
  const headerOneOnChange = (
    event: React.SyntheticEvent<Element, Event>,
    val: string | option | null
  ) => {
    //type handling
    let newValue: string;
    if (val === null) {
      newValue = "";
    } else if (typeof val === "string") {
      newValue = val;
    } else {
      newValue = val.value;
    }
    //edit the header one for the specific accordion, copy everything else
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
  };

  //onChange handler for header two
  const headerTwoOnChange = (
    event: React.SyntheticEvent<Element, Event>,
    val: string | option | null
  ) => {
    //type handling
    let newValue: string;
    if (val === null) {
      newValue = "";
    } else if (typeof val === "string") {
      newValue = val;
    } else {
      newValue = val.value;
    }
    //edit the header two for the specific accordion, copy everything else
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
            onChange={headerOneOnChange}
            errValidations={errValid}
          />
        </Box>
        <ProfileAccordionComboBox
          value={props.headerTwo}
          disabled={!editMode}
          placeholderText={props.headerTwoPlaceholder}
          options={props.headerTwoOptions}
          onChange={headerTwoOnChange}
          errValidations={errValid}
        />
        <Grid
          xs={0.5}
          display="flex"
          flexDirection="row"
          alignItems={"center"}
          color={editMode ? "#0b7d66" : "#00000061"}
          sx={{ marginRight: "8px" }}
        >
          {
            //conditional rendering for edit/save icons based on edit mode
            editMode ? (
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
            )
          }
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <ProfileAccordionTextField
          label={"Description"}
          placeholder={props.descPlaceholder}
          text={props.descText}
          charLimit={100}
          accordionIndex={props.accordionIndex}
          errorValidation={errValid}
        />
      </AccordionDetails>
    </Accordion>
  );
}
