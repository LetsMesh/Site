CREATE TABLE IF NOT EXISTS Settings(
    accountID INT,
    isVerified BOOLEAN NOT NULL DEFAULT 0,
    hasContentFilterEnabled BOOLEAN NOT NULL DEFAULT 0,
    displayTheme ENUM("light","dark") NOT NULL DEFAULT "light",
    is2FAEnabled BOOLEAN NOT NULL DEFAULT 0,
    phoneNum VARCHAR(15),

    FOREIGN KEY (accountID) REFERENCES Account(accountID)
);