import { useContext, useState } from "react";
import ProfileAccordion from "./profile-accordion";
import { createContext } from "react";
import { Box, Button, Grid, IconButton, Modal } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import React from "react";

//type of group accordion state
type groupAccordionState = Array<{
  headerOne: string;
  headerTwo: string;
  descText: string;
}>;

//type of group accordion state setter
type setGroupAccordionState = (newState: groupAccordionState) => void;

//type of the group accordion context
type GroupAccordionContextType = {
  groupState: groupAccordionState;
  setGroupState: setGroupAccordionState;
};

//default value of context (real value will be passed in the provider so default doesn't matter)
const GroupAccordContext = createContext<GroupAccordionContextType>({
  groupState: [{ headerOne: "", headerTwo: "", descText: "" }],
  setGroupState: (prevGroupState?: groupAccordionState) => undefined,
});

//hook to be used in accordion components to access group accordion context
export const useGroupAccordContext = () => {
  //return useContext hook to be used
  return useContext(GroupAccordContext);
};


/**
 * A React component that renders a group of profile accordions.
 * Includes a button that provides for adding a new accordion.
 *
 * Used in the Profile Page (src/profile/profile-page.tsx).
 *
 * @param props - Properties of the component
 * @param {groupAccordionState} props.groupAccordArgs - The array containing data for each accordion
 * @param {string} props.descPlaceholder - the placeholder for the description textfield
 * @param {number} props.charLimit - the character limit for the description textfield
 * @param {string} props.headerOnePlaceholder - the placeholder for the header one combobox in each accordion
 * @param {string} props.headerTwoPlaceholder - the placeholder for the header two combobox in each accordion
 * @param {Array<string>} props.headerOneOptions - the array of strings containing options for the first combobox
 * @param {Array<string>} props.headerTwoOptions - the array of strings containing options for the second combobox
 * @param {Array<function>} props.headerOneErrValidations - an array of functions to evaluate the header one value for each accordion for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 * @param {Array<function>} props.headerTwoErrValidations - an array of functions to evaluate the header two value for each accordion for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 * @param {Array<function>} props.descErrValidations - an array of functions to evaluate the description text value for each accordion for errors (takes in the string value as a parameter, returns True if there was no error or the error message if there is)
 */
export default function ProfileGroupAccordion(props: {
  groupAccordArgs: groupAccordionState;
  descPlaceholder: string;
  charLimit: number;
  headerOnePlaceholder: string;
  headerTwoPlaceholder: string;
  headerOneOptions: Array<string>;
  headerTwoOptions: Array<string>;
  headerOneErrValidations: Array<(value: string) => boolean | string>;
  headerTwoErrValidations: Array<(value: string) => boolean | string>;
  descErrValidations: Array<(value: string) => boolean | string>;
}) {
  //group accordion data state with set state method
  const [GroupAccordState, setGroupAccordState] = useState(
    props.groupAccordArgs.map((accord) => {
      return {
        headerOne: accord.headerOne,
        headerTwo: accord.headerTwo,
        descText: accord.descText,
      };
    })
  );

  //real context value
  const value: GroupAccordionContextType = {
    groupState: GroupAccordState,
    setGroupState: setGroupAccordState,
  };


//   //state to control whether new accordion modal is open or not
//   const [addOpen, setAddOpen] = useState(false);
//   const showModal = () => setAddOpen(true);
//   const hideModal = () => setAddOpen(false);
//  //function for opening modal and adding empty accordion to state group array
//  function startAdding(){
//   setGroupAccordState([...GroupAccordState, {headerOne:"", headerTwo:"", descText:""}])
//   showModal()
// }
// //function to close modal and erasing the new accordion
// function quitAdding(){
//   GroupAccordState.pop();
//   setGroupAccordState( GroupAccordState )
//   hideModal();
// }


// //function for evaluation of new accordion data and adding if it is valid data
// function addNewAccordion(){


//   //grab the data for the current new accordion
//   let newAccordionData = GroupAccordState[GroupAccordState.length-1];
//   let headerOneVal = newAccordionData.headerOne;
//   let headerTwoVal = newAccordionData.headerTwo;
//   let descVal = newAccordionData.descText;

//   //check if there are any errors
//   let hasHeadOneErr = props.headerOneErrValidations.some((currErrVal) =>  typeof currErrVal(headerOneVal)  === "string")
//   let hasHeadTwoErr = props.headerTwoErrValidations.some((currErrVal) =>  typeof currErrVal(headerTwoVal)  === "string")
//   let hasDescErr = props.descErrValidations.some((currErrVal) =>  typeof currErrVal(descVal)  === "string")

//   //if there are no errors, save the new accordion
//   if(!hasHeadOneErr && !hasHeadTwoErr && !hasDescErr){
//    hideModal()
//    setGroupAccordState([...GroupAccordState])
//   } else{
//     alert("there's errors")
//   }

// }

  return (
    <GroupAccordContext.Provider
      value={value}
      children={
        <Grid xs={12} container flexDirection={"column"} alignItems={"center"}>
          <Grid container flexDirection={"column"}>
            {GroupAccordState.map((accordArgs, accordIndex) => {
              return (
                <ProfileAccordion
                  accordionIndex={accordIndex}
                  headerOne={accordArgs.headerOne}
                  headerTwo={accordArgs.headerTwo}
                  descPlaceholder={props.descPlaceholder}
                  descText={accordArgs.descText}
                  charLimit={props.charLimit}
                  headerOnePlaceholder={props.headerOnePlaceholder}
                  headerTwoPlaceholder={props.headerTwoPlaceholder}
                  headerOneOptions={props.headerOneOptions}
                  headerTwoOptions={props.headerTwoOptions}
                  headerOneErrValidations={props.headerOneErrValidations}
                  headerTwoErrValidations={props.headerTwoErrValidations}
                  descErrValidations={props.descErrValidations}
                />
              );
            })}
          </Grid>
          {/* <IconButton
            children={
              <ControlPointIcon sx={{ fontSize: "30px", marginTop: "10px" }} />
            }
            onClick={startAdding}
          /> */}
          {/* <NewAccordionModal hideModal={hideModal} showModal={showModal} headerOneErrValidations={props.headerOneErrValidations} headerTwoErrValidations={props.headerTwoErrValidations} descErrValidations={props.descErrValidations} addOpen={addOpen} descPlaceholder={props.descPlaceholder}
          charLimit={props.charLimit}
          headerOnePlaceholder= {props.headerOnePlaceholder}
          headerTwoPlaceholder= {props.headerTwoPlaceholder}
          headerOneOptions = {props.headerOneOptions}
          headerTwoOptions= {props.headerTwoOptions}
          quitAdding ={quitAdding}
          addNewAccordion= {addNewAccordion}
          /> */}
        </Grid>
      }
    />
  );

}


// function NewAccordionModal(props:{
//   hideModal : () => void;
//   showModal: () => void;
//   headerOneErrValidations: Array<(value: string) => boolean | string>;
//   headerTwoErrValidations: Array<(value: string) => boolean | string>;
//   descErrValidations: Array<(value: string) => boolean | string>;
//   addOpen: boolean;
//   descPlaceholder: string;
//   charLimit: number;
//   headerOnePlaceholder: string;
//   headerTwoPlaceholder: string;
//   headerOneOptions: Array<string>;
//   headerTwoOptions: Array<string>;
//   quitAdding : () => void;
//   addNewAccordion: () => void;
// }){
//   //grab context
//     const GroupAccordContext = useGroupAccordContext();
//     const groupState = GroupAccordContext.groupState;
//   //grab the data for the current new accordion
//   let newAccordionData = groupState[groupState.length-1];
//   let headerOneVal = newAccordionData.headerOne;
//   let headerTwoVal = newAccordionData.headerTwo;
//   let descVal = newAccordionData.descText;

  
  
//     //need to add an empty accordion to state group array for now
//     //if user clicks off modal without saving, that accordion will be removed
//     //otherwise it will be saved (provided there are no errors)
  
   

// return(
//  <Modal open={props.addOpen} onClose={props.quitAdding}>
//    <Box sx={{width: "700px", height: "300px", position: "absolute", top: 0, bottom: 0, left: 0, right: 0, margin: "auto", border: "1px solid white"}}>

//      <Box sx={{width: "400px"}} onClick={() => console.log(groupState)}>

//         <ProfileAccordion accordionIndex={groupState.length-1} headerOne={headerOneVal} headerTwo={headerTwoVal} descPlaceholder={props.descPlaceholder} descText={descVal} charLimit={props.charLimit} headerOnePlaceholder={props.headerOnePlaceholder} headerTwoPlaceholder={props.headerTwoPlaceholder} headerOneOptions={props.headerOneOptions} headerTwoOptions={props.headerTwoOptions}     headerOneErrValidations={props.headerOneErrValidations} headerTwoErrValidations={props.headerTwoErrValidations} descErrValidations={props.descErrValidations}/>

//      </Box>
       
//      <Button onClick={props.addNewAccordion}>
//        Save Button
//      </Button>
//      </Box>
//  </Modal>
 
// )


// }