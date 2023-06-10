CREATE TABLE IF NOT EXISTS BlockedAccountBridge(
	settingID INT,
    blockedAccountID INT,

    PRIMARY KEY (settingID, blockedAccountID),
    FOREIGN KEY (settingID) REFERENCES AccountSettings(settingID),
    FOREIGN KEY (blockedAccountID) REFERENCES Accounts(accountID)
);