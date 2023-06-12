CREATE TABLE IF NOT EXISTS BlockedAccountBridge(
    blockerAccountID INT,
    blockedAccountID INT,

    PRIMARY KEY (blockerAccountID, blockedAccountID),
    FOREIGN KEY (blockerAccountID) REFERENCES Account(accountID),
    FOREIGN KEY (blockedAccountID) REFERENCES Account(accountID)
);