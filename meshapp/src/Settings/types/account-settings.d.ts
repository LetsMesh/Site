export type AccountSettings = {
    accountID: number;
    isVerified: boolean;
    verificationToken: string;
    hasContentFilterEnabled: boolean; 
    displayTheme: number; 
    is2FAEnabled: boolean;
};