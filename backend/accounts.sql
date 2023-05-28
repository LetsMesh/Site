-- @block 
CREATE TABLE IF NOT EXISTS account (
    accountID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    encryptedPass VARCHAR(255) NOT NULL,
    displayTheme int NOT NULl,
    phoneNum VARCHAR(20),
    enable2Factor BOOLEAN,
    isMentee BOOLEAN NOT NULL,
    isMentor BOOLEAN NOT NULL

);

