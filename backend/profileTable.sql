-- @block
CREATE TABLE IF NOT EXISTS Profiles(
    accountID INT ,
    userName VARCHAR(255) NOT NULL,
    preferredName VARCHAR(255),
    preferredPronuns VARCHAR(40),
    biography TEXT(500),
    linkToprofilePicture VARCHAR(255) NOT NULL,

    FOREIGN KEY (accountID) references account(accountID),
    PRIMARY KEY(accountID)
    
);

