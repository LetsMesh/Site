// TODO: Update order of fields to match order in the Profile schema
// NOTE: Add/modify/remove fields as needed, but consider what needs to be refactored in ../profile-page.tsx
export type Profile = {
  name: string;
  pronouns: string;
  occupationTitle: string;
  occupationBusiness: string;
  image: string;
  isMentor: boolean;
  isMentee: boolean;
  biography: string;
  education: Education;
};

// TODO: Include Experience, and Interests props as they get implemented
//        Maybe separate these into their own types?

export type Education = Array<{
  degree: string;
  school: string;
  description: string;
}>;
