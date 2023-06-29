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
};

// TODO: Include Experience, Education, and Interests props as they get implemented
//        Maybe separate these into their own types?
