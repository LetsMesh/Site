-- @block
CREATE TABLE IF NOT EXISTS profileTable(
    accountID INT NOT NULL,
    userName VARCHAR(255) NOT NULL,
    preferredName VARCHAR(255),
    preferredPronun VARCHAR(255),
    biography TEXT(500),
    profilePicture VARCHAR(255) NOT NULL,

    FOREIGN KEY (accountID) references account(accountID),
    PRIMARY KEY(accountID)
    
);

