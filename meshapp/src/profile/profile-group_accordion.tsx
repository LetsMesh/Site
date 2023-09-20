import { useContext, useState } from "react";
import ProfileAccordion from "./profile-accordion";
import { createContext } from "react";
import { Grid, IconButton } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

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

//default value of context, won't matter what we are putting here since we will be passing in real value later
const GroupAccordContext = createContext<GroupAccordionContextType>({
  groupState: [{ headerOne: "", headerTwo: "", descText: "" }],
  setGroupState: (prevGroupState?: groupAccordionState) => undefined,
});

//hook to be used in accordion components to access group accordion context
export const useGroupAccordContext = () => {
  //return useContext hook to be used
  return useContext(GroupAccordContext);
};

export default function ProfileGroupAccordion(props: {
  groupAccordArgs: groupAccordionState;
  descPlaceholder: string;
  charLimit: number;
  headerOnePlaceholder: string;
  headerTwoPlaceholder: string;
  headerOneOptions: Array<string>;
  headerTwoOptions: Array<string>;
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

  //function that adds new empty accordion
  const addAccordion = () => {
    let accordions = [
      ...GroupAccordState,
      { headerOne: "", headerTwo: "", descText: "" },
    ];
    setGroupAccordState(accordions);
  };

  return (
    <GroupAccordContext.Provider
      value={value}
      children={
        <Grid xs={12} container flexDirection={"column"} alignItems={"center"}  >
          <Grid container flexDirection={"column"} >
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
              />
            );
          })}
          </Grid>
          <IconButton children={<ControlPointIcon sx={{fontSize:"30px", marginTop: "10px"}} />} onClick={addAccordion} />
        </Grid>
      }
    />
  );
}
