CREATE TABLE TagsBridge(
    tagID INT NOT NULL AUTO_INCREMENT,
    accountID INT NOT NULL,
    PRIMARY KEY (accountID, tagID),
    FOREIGN KEY (accountID) REFERENCES Profiles (AccountID),
    FOREIGN KEY (tagID) REFERENCES Tags (tagID)
);