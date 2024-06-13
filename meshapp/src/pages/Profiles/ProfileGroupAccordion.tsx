import { useState } from "react";
import ProfileAccordion from "./ProfileAccordion";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Snackbar,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

//type of group accordion state
export type groupAccordionState = Array<{
  accordionId: number;
  comboOneVal: string;
  comboTwoVal: string;
  descText: string;
}>;

//type of group accordion state setter
export type setGroupAccordionState = (newState: groupAccordionState) => void;

/**
 * A React component that renders a group of profile accordions.
 * Includes a button that provides for adding a new accordion.
 *
 * Used in the Profile Page (src/profile/profile-page.tsx).
 *
 * @param props - Properties of the component
 * @param {groupAccordionState} props.groupAccordState - the state array that contains the group accordion data
 * @param {setGroupAccordionState} props.setGroupAccordState - the state mutator method for the group accordion data
 * @param {Function} props.editAccordHandler = handler function that takes in an accordion's id and returns a function for editing on backend
 * @param {Function} props.deleteAccordHandler - handler function that takes in an accordion's id and returns a function that deletes on both backend and locally
 * @param {Function} props.addAccordHandler - handler function for adding an accord on the backend and locally
 * @param {string} props.descPlaceholder - the placeholder for the description textfield
 * @param {string} props.comboOneValPlaceholder - the placeholder for the first combobox combobox in each accordion
 * @param {string} props.comboTwoValPlaceholder - the placeholder for the second combobox combobox in each accordion
 * @param {Array<string>} props.comboOneValOptions - the array of strings containing options for the first combobox
 * @param {Array<string>} props.comboTwoValOptions - the array of strings containing options for the second combobox
 * @param {Array<function>} props.comboOneValErrValidations - an array of functions to evaluate the first combobox value for each accordion for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 * @param {Array<function>} props.comboTwoValErrValidations - an array of functions to evaluate the second combobox value for each accordion for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 * @param {Array<function>} props.descErrValidations - an array of functions to evaluate the description text value for each accordion for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 */
export function ProfileGroupAccordion(props: {
  groupAccordState: groupAccordionState;
  setGroupAccordState: setGroupAccordionState;
  editAccordHandler: Function;
  deleteAccordHandler: Function;
  descPlaceholder: string;
  comboOneValPlaceholder: string;
  comboTwoValPlaceholder: string;
  comboOneValOptions: Array<string>;
  comboTwoValOptions: Array<string>;
  comboOneValErrValidations: Array<(value: string) => boolean | string>;
  comboTwoValErrValidations: Array<(value: string) => boolean | string>;
  descErrValidations: Array<(value: string) => boolean | string>;
  addAccordHandler: Function;
}) {
  //state to control whether new accordion modal is open or not
  const [addOpen, setAddOpen] = useState(false);
  const showModal = () => setAddOpen(true);
  const hideModal = () => setAddOpen(false);

  //state to store data for the new accordion, id doesn't matter since it won't really be used
  const [newAccordionData, setNewAccordionData] = useState([
    { comboOneVal: "", comboTwoVal: "", descText: "", accordionId: 0 },
  ]);

  return (
    <Grid
      xs={12}
      container
      flexDirection={"column"}
      alignItems={"center"}
      // onClick={() => console.log(props.groupAccordState)}
    >
      <Grid container flexDirection={"column"}>
        {props.groupAccordState.map((accordArgs) => {
          return (
            <ProfileAccordion
              key={accordArgs.accordionId}
              accordionId={accordArgs.accordionId}
              comboOneVal={accordArgs.comboOneVal}
              comboTwoVal={accordArgs.comboTwoVal}
              descPlaceholder={props.descPlaceholder}
              descText={accordArgs.descText}
              comboOneValPlaceholder={props.comboOneValPlaceholder}
              comboTwoValPlaceholder={props.comboTwoValPlaceholder}
              comboOneValOptions={props.comboOneValOptions}
              comboTwoValOptions={props.comboTwoValOptions}
              comboOneValErrValidations={props.comboOneValErrValidations}
              comboTwoValErrValidations={props.comboTwoValErrValidations}
              descErrValidations={props.descErrValidations}
              groupState={props.groupAccordState}
              setGroupState={props.setGroupAccordState}
              editHandler={props.editAccordHandler(accordArgs.accordionId)}
              deleteHandler={props.deleteAccordHandler(accordArgs.accordionId)}
            />
          );
        })}
      </Grid>
      <IconButton
        children={
          <ControlPointIcon sx={{ fontSize: "30px", marginTop: "10px" }} />
        }
        onClick={showModal}
      />
      <NewAccordionModal
        addOpen={addOpen}
        hideModal={hideModal}
        showModal={showModal}
        newAccordData={newAccordionData}
        setAccordData={setNewAccordionData}
        groupState={props.groupAccordState}
        setGroupState={props.setGroupAccordState}
        comboOneValErrValidations={props.comboOneValErrValidations}
        comboTwoValErrValidations={props.comboTwoValErrValidations}
        descErrValidations={props.descErrValidations}
        descPlaceholder={props.descPlaceholder}
        comboOneValPlaceholder={props.comboOneValPlaceholder}
        comboTwoValPlaceholder={props.comboTwoValPlaceholder}
        comboOneValOptions={props.comboOneValOptions}
        comboTwoValOptions={props.comboTwoValOptions}
        addAccordHandler={props.addAccordHandler}
      />
    </Grid>
  );
}
/** A React component used within the Group Accordion to provide a pop up for the user to input data for adding a new accordion.
 * The new accordion will be added if the Save button is saved and there are no errors. Otherwise, it will not be added.
 * Shows snackbar containing error if there are any
 *
 * @param props  - Properties of the component
 * @param {boolean} props.addOpen -state boolean controlling whether modal is open or not
 * @param {function} props.hideModal -handles closing modal
 * @param {function} props.showModal - handles opening modal
 * @param {groupAccordionState} props.newAccordData - state data for new accordion
 * @param {setGroupAccordionState}props.setAccordData - setter method for new accordion state data
 * @param {groupAccordionState} props.groupState - state data for group accordion
 * @param {setGroupAccordionState} props.setGroupState - setter method for group accordion state data
 * @param {Array<function>} props.comboOneValErrValidations - array of error validation functions to evaluate first combobox value, returns True if no error or a string containing error message if there is
 * @param {Array<function>}props.comboTwoValErrValidations - array of error validation functions to evaluate second combobox value, returns True if no error or a string containing error message if there is
 * @param {Array<function>} props.descErrValidations - array of error validation functions to evaluate description, returns True if no error or a string containing error message if there is
 * @param {string} props.descPlaceholder - placeholder for description textfield
 * @param {string} props.comboOneValPlaceholder - placeholder for first combobox
 * @param {string} props.comboTwoValPlaceholder - placeholder for second combobox
 * @param {Array<string>} props.comboOneValOptions - list of options to be provided for first combobox
 * @param {Array<string>} props.comboTwoValOptions -list of options to be provided for second combobox
 * @param {Function} props.addAccordHandler - handler function for adding an accord on the backend and locally
 */
function NewAccordionModal(props: {
  addOpen: boolean;
  hideModal: () => void;
  showModal: () => void;
  newAccordData: groupAccordionState;
  setAccordData: setGroupAccordionState;
  groupState: groupAccordionState;
  setGroupState: setGroupAccordionState;
  comboOneValErrValidations: Array<(value: string) => boolean | string>;
  comboTwoValErrValidations: Array<(value: string) => boolean | string>;
  descErrValidations: Array<(value: string) => boolean | string>;
  descPlaceholder: string;
  comboOneValPlaceholder: string;
  comboTwoValPlaceholder: string;
  comboOneValOptions: Array<string>;
  comboTwoValOptions: Array<string>;
  addAccordHandler: Function;
}) {
  //grab the data for the current new accordion
  let newAccordData = props.newAccordData[0];
  let newComboOneVal = newAccordData.comboOneVal;
  let newComboTwoVal = newAccordData.comboTwoVal;
  let newDescVal = newAccordData.descText;

  //controls whether snackbar is open or not
  const [snackbar, setSnackbar] = useState(false);
  const handleOpenSnackbar = () => setSnackbar(true);
  const handleCloseSnackbar = () => setSnackbar(false);

  //stores the error message for the snack bar
  const [newAccordError, setNewAccordError] = useState("");

  return (
    <Modal open={props.addOpen} onClose={props.hideModal}>
      <Box
        sx={{
          width: "700px",
          height: "300px",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Box sx={{ width: "450px" }} onClick={() => console.log(newAccordData)}>
          <ProfileAccordion
            accordionId={0}
            comboOneVal={newComboOneVal}
            comboTwoVal={newComboTwoVal}
            descPlaceholder={props.descPlaceholder}
            descText={newDescVal}
            comboOneValPlaceholder={props.comboOneValPlaceholder}
            comboTwoValPlaceholder={props.comboTwoValPlaceholder}
            comboOneValOptions={props.comboOneValOptions}
            comboTwoValOptions={props.comboTwoValOptions}
            comboOneValErrValidations={props.comboOneValErrValidations}
            comboTwoValErrValidations={props.comboTwoValErrValidations}
            descErrValidations={props.descErrValidations}
            groupState={props.newAccordData}
            setGroupState={props.setAccordData}
            alwaysOpen={true}
          />
        </Box>

        <Button variant={"contained"} onClick={saveNewAccordion}>
          Save Button
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={snackbar}
          autoHideDuration={7000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            elevation={6}
            variant="filled"
            severity="error"
            onClose={handleCloseSnackbar}
          >
            {newAccordError}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );

  //function for evaluation of new accordion data and saving it as a new addition if it is valid data, and displaying errors if it isn't
  function saveNewAccordion() {
    //store values and their corresponding array of error validations into arrays at positions that correrspond to each other
    let errValidArr = [
      props.comboOneValErrValidations,
      props.comboTwoValErrValidations,
      props.descErrValidations,
    ];
    let values = [newComboOneVal, newComboTwoVal, newDescVal];

    //iterate through each value's array of error validations, determine the first error for the current value (or True if there are none), and store it
    let errResults = errValidArr.map((errValidations, index) => {
      return errValidations.reduce(
        (prevResult: boolean | string, curErrVal) => {
          if (prevResult && typeof prevResult !== "string") {
            return curErrVal(values[index]);
          } else {
            return prevResult;
          }
        },
        true
      );
    });

    //if there are no errors, hide the modal, add the new accordion data to real group accord data, and erase the modal accordion data
    if (errResults.every((err) => typeof err === "boolean")) {
      props.hideModal();
      props.addAccordHandler(newComboOneVal, newComboTwoVal, newDescVal);
      props.setAccordData([
        { accordionId: 0, comboOneVal: "", comboTwoVal: "", descText: "" },
      ]);
    }
    //otherwise, display the error, and don't erase modal accordion data
    else {
      for (let errResult of errResults) {
        if (typeof errResult === "string") {
          setNewAccordError(errResult);
          handleOpenSnackbar();
          break;
        }
      }
    }
  }
}
