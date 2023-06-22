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
};

export const exampleProfile2: Profile = {
  name: "John Doe",
  pronouns: "he/him",
  image: "https://picsum.photos/200/300",
  isMentor: true,
  isMentee: false,
  occupationTitle: "Construction Worker",
  occupationBusiness: "Updog",
  biography:
    "The best construction worker in the world. I have been working in construction for 90 years. I also took down Dr. Doofenshmirtz on February 2.",
};
