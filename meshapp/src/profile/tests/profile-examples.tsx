import { Profile } from "../types/profile";

export const exampleProfile: Profile = {
  name: "Bob Yomom",
  pronouns: "she/her",
  image: "https://picsum.photos/200/300",
  isMentor: true,
  isMentee: true,
  occupationTitle: "Animal Petter",
  occupationBusiness: "Self-Employed",
  biography:
    "Self proclaimed narcissist and professional animal petter. A vampire with many years behind me, I have been petting animals for a bagillion years.",
  education: [
    {
      degree: "High School Diploma",
      school: "Generic High School",
      description: "a really boring high school",
    },
    {
      degree: "Clown Degree",
      school: "Clown University",
      description: "very clown",
    },
  ],
};

export const exampleProfile2: Profile = {
  name: "Lysander Maximilian Bartholomew Fitzwilliam III Esquire IV",
  pronouns: "he/he",
  image: "https://picsum.photos/200/300",
  isMentor: true,
  isMentee: false,
  occupationTitle: "Valiant Swordmaster of the Empire",
  occupationBusiness: "Walmart",
  biography:
    "Trained in the art of the blade since being in the womb, became a swordmaster at the age of 3 months, and slayed approximately 4 rats throughout my perilous adventures. Also known as Michael Jackson.",
  education: [
    {
      degree: "High School Diploma",
      school: "Generic High School",
      description: "a really boring high school",
    },
  ],
};
