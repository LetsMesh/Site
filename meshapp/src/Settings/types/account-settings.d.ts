export type AccountSettings = {
    accountID: number;
    isVerified: boolean;
    verificationToken: string;
    hasContentFilterEnabled: boolean; 
    displayTheme: char; 
    is2FAEnabled: boolean;
};