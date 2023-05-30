-- @block 
CREATE TABLE IF NOT EXISTS Accounts (
    accountID INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(254) NOT NULL,
    encryptedPass VARCHAR(255) NOT NULL,
    displayTheme ENUM("light","dark") NOT NULL,
    phoneNum VARCHAR(15),
    is2FAEnabled BOOLEAN DEFAULT 0,
    isMentee BOOLEAN NOT NULL,
    isMentor BOOLEAN NOT NULL

);
