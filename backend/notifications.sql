CREATE TABLE Notifications(
    notificationID INT NOT NULL AUTO_INCREMENT,
    accountID INT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    notificationContextJson VARCHAR(255) NOT NULL,
    PRIMARY KEY (notificationID),
    FOREIGN KEY (accountID) REFERENCES Accounts(accountID)
);