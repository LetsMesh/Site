export interface AccountSettings {
  isVerified: boolean;
  hasContentFilterEnabled: boolean;
  displayTheme: string;
  is2FAEnabled: boolean;
}

export interface Account {
  accountID: number;
  email: string;
  phoneNum: string;
  isMentor: boolean;
  isMentee: boolean;
  settings?: AccountSettings;
}
