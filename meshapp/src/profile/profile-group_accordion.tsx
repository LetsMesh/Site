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
 */
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
                />
              );
            })}
          </Grid>
          <IconButton
            children={
              <ControlPointIcon sx={{ fontSize: "30px", marginTop: "10px" }} />
            }
            onClick={addAccordion}
          />
        </Grid>
      }
    />
  );
}
