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
  accountID: number;
};

export type ProfileInterests = {
  currentTags: string[];
  recommendedTags: string[];
  setTags: (tags: string[]) => void;
};

// TODO: Include Experience and Education props as they get implemented
//        Maybe separate these into their own types?
