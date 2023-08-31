import ProfileAccordion from "./profile-accordion";

export default function ProfileGroupAccordion(props: {
  groupAccordArgs: Array<{
    text1: string;
    text2: string;
    descPlaceholder: string;
    descText: string;
    charLimit: number;
  }>;
}) {

  return (
    <>
      {props.groupAccordArgs.map((accordArgs) => {
        return (
          <ProfileAccordion
            text1={accordArgs.text1}
            text2={accordArgs.text2}
            descPlaceholder={accordArgs.descPlaceholder}
            descText={accordArgs.descText}
            charLimit={accordArgs.charLimit}
          />
        );
      })}
    </>
  );
}
