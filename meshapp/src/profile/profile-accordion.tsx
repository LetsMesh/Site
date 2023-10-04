import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreFilled from "@mui/icons-material/ExpandMore";
import ProfileAccordionTextField from "./profile-accordion-textfield";
import { ProfileAccordionComboBox, option } from "./profile-accordion-combobox";
import {
  groupAccordionState,
  setGroupAccordionState,
} from "./profile-group_accordion";
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
 * @param {string} props.headerOne - value for combobox of this accordion's headerOne, passed down from group state array data
 * @param {string} props.headerTwo - value for combobox of this accordion's headerTwo, passed down from group state array data
 * @param {string} props.descPlaceholder - placeholder for description textfield
 * @param {string} props.descText - value for description textfield, passed down from group state array data
 * @param {number} props.accordionIndex - index of this accordion within the group state array
 * @param {string} props.headerOnePlaceholder - placeholder for headerOne combobox
 * @param {string} props.headerTwoPlaceholder - placeholder for headerTwo combobox
 * @param {Array<string>} props.headerOneOptions - list of options to be provided to headerOne combobox
 * @param {Array<string>} props.headerTwoOptions - list of options to be provided to headerTwo combobox
 * @param {Array<function>} props.headerOneErrValidations - an array of functions to evaluate the header one value for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 * @param {Array<function>} props.headerTwoErrValidations - an array of functions to evaluate the header two value for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 * @param {Array<function>} props.descErrValidations - an array of functions to evaluate the description text value for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 * @param {groupState} props.groupState - the group accordion state data for all accordions
 * @param {setGroupState} props.setGroupState - the group accordion state setter method
 * @param {boolean} alwaysOpen - if this is set true, then the accordion will be permanently open and the expand icon will disappear
 */
export default function ProfileAccordion(props: {
  headerOne: string;
  headerTwo: string;
  descPlaceholder: string;
  descText: string;
  accordionIndex: number;
  headerOnePlaceholder: string;
  headerTwoPlaceholder: string;
  headerOneOptions: Array<string>;
  headerTwoOptions: Array<string>;
  headerOneErrValidations: Array<(value: string) => boolean | string>;
  headerTwoErrValidations: Array<(value: string) => boolean | string>;
  descErrValidations: Array<(value: string) => boolean | string>;
  groupState: groupAccordionState;
  setGroupState: setGroupAccordionState;
  alwaysOpen?: boolean;
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

  const groupState = props.groupState;
  const setGroupState = props.setGroupState;

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
  };

  //onChange handler for description
  const descOnChange = (newValue: string) => {
    setGroupState(
      groupState.map((profileAccordion, index) => {
        if (index === props.accordionIndex) {
          return {
            headerOne: profileAccordion.headerOne,
            headerTwo: profileAccordion.headerTwo,
            descText: newValue,
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
      expanded={props.alwaysOpen ? props.alwaysOpen : expanded}
      sx={{
        "&.MuiAccordion-root": {
          margin: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          props.alwaysOpen ? null : <ExpandMoreFilled onClick={toggleExpand} />
        }
      >
        {/*Header One Combo Box */}
        <Box sx={{ width: "33%", flexShrink: 0 }}>
          <ProfileAccordionComboBox
            value={props.headerOne}
            disabled={!editMode}
            placeholderText={props.headerOnePlaceholder}
            options={props.headerOneOptions}
            onChange={headerOneOnChange}
            errValidations={props.headerOneErrValidations}
          />
        </Box>
        {/*Header Two Combo Box */}
        <ProfileAccordionComboBox
          value={props.headerTwo}
          disabled={!editMode}
          placeholderText={props.headerTwoPlaceholder}
          options={props.headerTwoOptions}
          onChange={headerTwoOnChange}
          errValidations={props.headerTwoErrValidations}
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
        {/*Description Text Field */}
        <ProfileAccordionTextField
          label={"Description"}
          placeholder={props.descPlaceholder}
          text={props.descText}
          accordionIndex={props.accordionIndex}
          errValidations={props.descErrValidations}
          onChange={descOnChange}
        />
      </AccordionDetails>
    </Accordion>
  );
}
