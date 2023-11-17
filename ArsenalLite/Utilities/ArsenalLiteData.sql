IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'ArsenalLite')
  BEGIN
    CREATE DATABASE [ArsenalLite]
END
GO

USE [ArsenalLite]
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Players' and xtype='U')
BEGIN
    CREATE TABLE [Players] (
        [PlayerID] INT PRIMARY KEY IDENTITY (1, 1),
        [PlayerName] VARCHAR(100) NOT NULL,
		[Position] VARCHAR(20) NOT NULL,
		[JerseyNumber] INT NOT NULL UNIQUE,
		[GoalsScored] INT NOT NULL
    )
END
GO

INSERT INTO [Players]
	([PlayerName], [Position], [JerseyNumber], [GoalsScored])
VALUES
	-- GOALKEEPERS
	('Aaron Ramsdale', 'Goalkeeper', 1, 0),
	('David Raya', 'Goalkeeper', 22, 0),
	('Karl Hein', 'Goalkeeper', 31, 0),

	-- DEFENDERS
	('William Saliba', 'Defender', 2, 1),
	('Ben White', 'Defender', 4, 1),
	('Gabriel Magalhães', 'Defender', 6, 0),
	('Jurriën Timber', 'Defender', 12, 0),
	('Jakub Kiwior', 'Defender', 15, 0),
	('Takehiro Tomiyasu', 'Defender', 18, 1),
	('Cédric Soares', 'Defender', 17, 0),
	('Oleksandr Zinchenko', 'Defender', 35, 1),
	('Reuell Walters', 'Defender', 76, 0),

	--MIDFIELDERS
	('Thomas Partey', 'Midfielder', 5, 0),
	('Martin Odegaard', 'Midfielder', 8, 5),
	('Emile Smith Rowe', 'Midfielder', 10, 0),
	('Jorginho', 'Midfielder', 20, 0),
	('Fábio Vieira', 'Midfielder', 21, 1),
	('Mohamed Elneny', 'Midfielder', 25, 0),
	('Kai Havertz', 'Midfielder', 29, 1),
	('Declan Rice', 'Midfielder', 41, 2),
	('Amario Cozier-Duberry', 'Midfielder', 45, 0),
	('James Sweet', 'Midfielder', 73, 0),

	--FORWARDS
	('Bukayo Saka', 'Forward', 7, 6),
	('Gabriel Jesus', 'Forward', 9, 4),
	('Gabriel Martinelli', 'Forward', 11, 2),
	('Eddie Nketiah', 'Forward', 14, 5),
	('Leandro Trossard', 'Forward', 19, 6),
	('Reiss Nelson', 'Forward', 24, 1),
	('Charles Sagoe', 'Forward', 71, 0)

GO