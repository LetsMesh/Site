import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreFilled from "@mui/icons-material/ExpandMore";
import ProfileAccordionTextField from "./ProfileAccordionTextfield";
import { ProfileAccordionComboBox, option } from "./ProfileAccordionCombobox";
import {
  groupAccordionState,
  setGroupAccordionState,
} from "./ProfileGroupAccordion";
import {
  Box,
  Container,
  Grid,
  Modal,
  Stack,
  Button,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Delete } from "@mui/icons-material";
/**
 * A React Component that returns an accordion with two comboboxes and a description textfield.
 * Provides editing capabilities for these inputs.
 *
 * Used in Profile Group Accordion (src/profile/ProfileGroupAccordion.tsx)
 *
 * @param props - Properties of the component
 * @param {string} props.accordionId - number representing ID of this accordion
 * @param {string} props.comboOneVal - value for the first combobox within the accordion, passed down from group state array data
 * @param {string} props.comboTwoVal - value for the second combobox within the accordion, passed down from group state array data
 * @param {string} props.descPlaceholder - placeholder for description textfield
 * @param {string} props.descText - value for description textfield, passed down from group state array data
 * @param {string} props.comboOneValPlaceholder - placeholder for comboOneVal combobox
 * @param {string} props.comboTwoValPlaceholder - placeholder for comboTwoVal combobox
 * @param {Array<string>} props.comboOneValOptions - list of options to be provided to comboOneVal combobox
 * @param {Array<string>} props.comboTwoValOptions - list of options to be provided to comboTwoVal combobox
 * @param {Array<function>} props.comboOneValErrValidations - an array of functions to evaluate the first combo box value for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 * @param {Array<function>} props.comboTwoValErrValidations - an array of functions to evaluate the second combobox value for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 * @param {Array<function>} props.descErrValidations - an array of functions to evaluate the description text value for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 * @param {Function} props.editTaskHandler = handler function that takes in an accordion's id and returns a function for editing on backend
 * @param {Function} props.deleteTaskHandler - handler function that takes in an accordion's id and returns a function that deletes on both backend and locally
 *  @param {groupState} props.groupState - the group accordion state data for all accordions
 * @param {setGroupState} props.setGroupState - the group accordion state setter method
 * @param {boolean} props.alwaysOpen - if this is set true, then the accordion will be permanently open and the expand icon will disappear
 * @param {Function} props.editHandler - function for saving edit on backend (is optional since this component can be used for adding or editing/deleting accordion)
 * @param {Function} props.deleteHandler - function for deleting on backend (is optional since this component can be used for adding or editing/deleting accordion)
 
*/
export default function ProfileAccordion(props: {
  comboOneVal: string;
  comboTwoVal: string;
  descPlaceholder: string;
  descText: string;
  accordionId: number;
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
  editHandler?: Function;
  deleteHandler?: Function;
}) {
  //controls whether accordion is expanded to show description or not
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const toggleExpand = () => setExpanded(!expanded);

  //controls edit mode and toggling
  const [editMode, setEditMode] = useState(false);
  const handleEditClick = () => {
    setEditMode(true);
  };

  //also handles saving edit on backend, if the handler exists
  const handleSaveClick = () => {
    setEditMode(false);
    if (props.editHandler) {
      props.editHandler();
    }
  };

  //Delete Confirmation
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const openDeleteConfirmModal = () => setDeleteConfirmOpen(true);
  const closeDeleteConfirmModal = () => setDeleteConfirmOpen(false);

  const deleteIconClickHandler = () => {
    //pops up delete confirmation modal
    openDeleteConfirmModal();
  };

  //when user confirms they want to delete
  const confirmDeleteHandler = () => {
    if (props.deleteHandler) {
      props.deleteHandler();
    }
    closeDeleteConfirmModal();
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
      groupState.map((profileAccordion) => {
        if (profileAccordion.accordionId === props.accordionId) {
          return {
            accordionId: props.accordionId,
            comboOneVal: newValue ? newValue : "",
            comboTwoVal: profileAccordion.comboTwoVal,
            descText: profileAccordion.descText,
          };
        }
        return {
          accordionId: profileAccordion.accordionId,
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
      groupState.map((profileAccordion) => {
        if (profileAccordion.accordionId === props.accordionId) {
          return {
            accordionId: props.accordionId,
            comboOneVal: profileAccordion.comboOneVal,
            comboTwoVal: newValue ? newValue : "",
            descText: profileAccordion.descText,
          };
        }
        return {
          accordionId: profileAccordion.accordionId,
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
      groupState.map((profileAccordion) => {
        if (profileAccordion.accordionId === props.accordionId) {
          return {
            accordionId: props.accordionId,
            comboOneVal: profileAccordion.comboOneVal,
            comboTwoVal: profileAccordion.comboTwoVal,
            descText: newValue,
          };
        }
        return {
          accordionId: profileAccordion.accordionId,
          comboOneVal: profileAccordion.comboOneVal,
          comboTwoVal: profileAccordion.comboTwoVal,
          descText: profileAccordion.descText,
        };
      })
    );
  };

  return (
    <>
      {/*Modal for confirming deletion*/}
      <Modal
        open={deleteConfirmOpen}
        onClose={closeDeleteConfirmModal}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Stack
          sx={{
            width: "300px",
            padding: 3,
            borderRadius: 5,
            backgroundColor: "cardBackground.main",
            gap: "20px",
          }}
        >
          <Typography
            variant="body1"
            sx={{ textAlign: "center", color: "text.main" }}
          >
            Are you sure you want to delete this?
          </Typography>
          <Container sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              variant="contained"
              onClick={confirmDeleteHandler}
              sx={{ backgroundColor: "buttonBackground.main" }}
            >
              <Typography
                variant="button"
                sx={{
                  fontWeight: "600",
                  color:"white"
                }}
              >
                Yes
              </Typography>
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={closeDeleteConfirmModal}
            >
              <Typography variant="button" sx={{ fontWeight: "600", color:"white" }}>
                No
              </Typography>
            </Button>
          </Container>
        </Stack>
      </Modal>
      {/*Accordion*/}
      <Accordion
        expanded={props.alwaysOpen ? props.alwaysOpen : expanded}
        sx={{
          "&.MuiAccordion-root": {
            margin: 0,
            backgroundColor: "cardBackground.main",
            backgroundImage: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            props.alwaysOpen ? null : (
              <ExpandMoreFilled onClick={toggleExpand} />
            )
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
            sx={{ marginRight: "8px", color: "text.disabled" }}
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

            {props.deleteHandler ? (
              <Delete
                onClick={deleteIconClickHandler}
                sx={{
                  "&:hover": {
                    color: "error.main",
                  },
                  cursor: "pointer",
                  transition: "color 0.15s ease-in-out",
                }}
              />
            ) : null}
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          {/*Description Text Field */}
          <ProfileAccordionTextField
            label={"Description"}
            placeholder={props.descPlaceholder}
            text={props.descText}
            errValidations={props.descErrValidations}
            onChange={descOnChange}
            editHandler={props.editHandler}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
