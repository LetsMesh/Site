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
 * @param {string} props.comboOneVal - value for the first combobox within the accordion, passed down from group state array data
 * @param {string} props.comboTwoVal - value for the second combobox within the accordion, passed down from group state array data
 * @param {string} props.descPlaceholder - placeholder for description textfield
 * @param {string} props.descText - value for description textfield, passed down from group state array data
 * @param {number} props.accordionIndex - index of this accordion within the group state array
 * @param {string} props.comboOneValPlaceholder - placeholder for comboOneVal combobox
 * @param {string} props.comboTwoValPlaceholder - placeholder for comboTwoVal combobox
 * @param {Array<string>} props.comboOneValOptions - list of options to be provided to comboOneVal combobox
 * @param {Array<string>} props.comboTwoValOptions - list of options to be provided to comboTwoVal combobox
 * @param {Array<function>} props.comboOneValErrValidations - an array of functions to evaluate the first combo box value for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 * @param {Array<function>} props.comboTwoValErrValidations - an array of functions to evaluate the second combobox value for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 * @param {Array<function>} props.descErrValidations - an array of functions to evaluate the description text value for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 * @param {groupState} props.groupState - the group accordion state data for all accordions
 * @param {setGroupState} props.setGroupState - the group accordion state setter method
 * @param {boolean} props.alwaysOpen - if this is set true, then the accordion will be permanently open and the expand icon will disappear
 */
export default function ProfileAccordion(props: {
  comboOneVal: string;
  comboTwoVal: string;
  descPlaceholder: string;
  descText: string;
  accordionIndex: number;
  comboOneValPlaceholder: string;
  comboTwoValPlaceholder: string;
  comboOneValOptions: Array<string>;
  comboTwoValOptions: Array<string>;
  comboOneValErrValidations: Array<(value: string) => boolean | string>;
  comboTwoValErrValidations: Array<(value: string) => boolean | string>;
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

  //onChange handler for first combo box
  const comboOneValOnChange = (
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
    //edit the first combo box value for the specific accordion, copy everything else
    setGroupState(
      groupState.map((profileAccordion, index) => {
        if (index === props.accordionIndex) {
          return {
            comboOneVal: newValue ? newValue : "",
            comboTwoVal: profileAccordion.comboTwoVal,
            descText: profileAccordion.descText,
          };
        }
        return {
          comboOneVal: profileAccordion.comboOneVal,
          comboTwoVal: profileAccordion.comboTwoVal,
          descText: profileAccordion.descText,
        };
      })
    );
  };

  //onChange handler for second combobox
  const comboTwoValOnChange = (
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
    //edit the second combobox value for the specific accordion, copy everything else
    setGroupState(
      groupState.map((profileAccordion, index) => {
        if (index === props.accordionIndex) {
          return {
            comboOneVal: profileAccordion.comboOneVal,
            comboTwoVal: newValue ? newValue : "",
            descText: profileAccordion.descText,
          };
        }
        return {
          comboOneVal: profileAccordion.comboOneVal,
          comboTwoVal: profileAccordion.comboTwoVal,
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
            comboOneVal: profileAccordion.comboOneVal,
            comboTwoVal: profileAccordion.comboTwoVal,
            descText: newValue,
          };
        }
        return {
          comboOneVal: profileAccordion.comboOneVal,
          comboTwoVal: profileAccordion.comboTwoVal,
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
        {/*First combobox */}
        <Box sx={{ width: "33%", flexShrink: 0 }}>
          <ProfileAccordionComboBox
            value={props.comboOneVal}
            disabled={!editMode}
            placeholderText={props.comboOneValPlaceholder}
            options={props.comboOneValOptions}
            onChange={comboOneValOnChange}
            errValidations={props.comboOneValErrValidations}
          />
        </Box>
        {/*Second combobox */}
        <ProfileAccordionComboBox
          value={props.comboTwoVal}
          disabled={!editMode}
          placeholderText={props.comboTwoValPlaceholder}
          options={props.comboTwoValOptions}
          onChange={comboTwoValOnChange}
          errValidations={props.comboTwoValErrValidations}
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
