import { useContext, useState } from "react";
import ProfileAccordion from "./profile-accordion";
import { createContext } from "react";

//type of group accordion state
type groupAccordionState = Array<{
  text1: string;
  text2: string;
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
  groupState: [{ text1: "", text2: "", descText: "" }],
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
}) {
  //group accordion data state with set state method
  const [GroupAccordState, setGroupAccordState] = useState(
    props.groupAccordArgs.map((accord) => {
      return {
        text1: accord.text1,
        text2: accord.text2,
        descText: accord.descText,
      };
    })
  );

  //real context value
  const value: GroupAccordionContextType = {
    groupState: GroupAccordState,
    setGroupState: setGroupAccordState,
  };


  return (
    <GroupAccordContext.Provider
      value={value}
      children={GroupAccordState.map((accordArgs, accordIndex) => {
        return (
          <ProfileAccordion
            accordionIndex={accordIndex}
            text1={accordArgs.text1}
            text2={accordArgs.text2}
            descPlaceholder={props.descPlaceholder}
            descText={accordArgs.descText}
            charLimit={props.charLimit}
          />
        );
      })}
    />
  );
}
