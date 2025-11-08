CREATE DATABASE ExpenseTrackerDB;
GO
USE ExpenseTrackerDB;

CREATE TABLE Categories (
    CategoryId INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(100) NOT NULL
);

-- Table: Expenses
CREATE TABLE Expenses (
    ExpenseId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,
    Date DATETIME NOT NULL DEFAULT GETDATE(),
    CategoryId INT,
    Notes NVARCHAR(255),
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
);
