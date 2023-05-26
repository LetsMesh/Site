CREATE TABLE Messages (
    messageID INT PRIMARY KEY,
    fromAccountID INT,
    toAccountID INT,
    message TEXT,
    timestamp TIMESTAMP,
    FOREIGN KEY (fromAccountID) REFERENCES Accounts(accountID),
    FOREIGN KEY (toAccountID) REFERENCES Accounts(accountID)
);
vsv