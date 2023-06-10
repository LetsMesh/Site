CREATE TABLE IF NOT EXISTS AccountSettings(
	settingID INT PRIMARY KEY AUTO_INCREMENT,
    accountID INT,
    isVerified BOOL NOT NULL DEFAULT FALSE,
    enableContentFilter BOOL NOT NULL DEFAULT FALSE,
    displayTheme ENUM("light","dark") NOT NULL DEFAULT "light",
    is2FAEnabled BOOL NOT NULL DEFAULT FALSE,
    phoneNum VARCHAR(15),

    FOREIGN KEY (accountID) REFERENCES Accounts(accountID)
);