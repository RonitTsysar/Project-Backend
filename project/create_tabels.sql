-- IF OBJECT_ID('dbo.users', 'U') IS NOT NULL
-- DROP TABLE dbo.users
-- GO
-- CREATE TABLE dbo.users
-- (
--     userId INTEGER IDENTITY(1,1) NOT NULL,
--     username VARCHAR(50) NOT NULL,
--     firstname VARCHAR(50)  NOT NULL,
--     lastname VARCHAR(50)  NOT NULL,
--     country VARCHAR(50)  NOT NULL,
--     password varchar(255) NOT NULL,
--     email varchar(255) NOT NULL,
--     image varchar(255),
--     PRIMARY KEY (userId)
-- );
-- GO

-- DROP table eventlog
-- drop table matches

-- IF OBJECT_ID('dbo.matches', 'U') IS NOT NULL
-- DROP TABLE dbo.matches
-- GO
-- CREATE TABLE dbo.matches
-- (
--     matchId INTEGER IDENTITY(1,1) NOT NULL, -- primary key column
--     stage INT NOT NULL,
--     matchDate DATE NOT NULL,
--     matchHour VARCHAR(50) NOT NULL,
--     hostTeam VARCHAR(50)  NOT NULL,
--     guestTeam VARCHAR(50)  NOT NULL,
--     stadium VARCHAR(50) NOT NULL,
--     refereeId INT NOT NULL,
--     score VARCHAR(50),
--     PRIMARY KEY (matchId)
-- );
-- GO

-- IF OBJECT_ID('dbo.eventLog', 'U') IS NOT NULL
-- DROP TABLE dbo.eventLog
-- GO
-- CREATE TABLE dbo.eventLog
-- (   
--     matchId INT NOT NULL,
--     eventId INT IDENTITY(1,1) NOT NULL, 
--     event_type VARCHAR (20) NOT NULL CHECK (event_type IN('Goal', 'Offside', 'Fault', 'YellowCard', 'RedCard', 'Injury', 'Sub')),
--     eventDate DATE NOT NULL,
--     eventHour VARCHAR(50) NOT NULL,
--     minuteInGame INT NOT NULL,
--     eventDescription VARCHAR(200) NOT NULL,
--     CONSTRAINT matchId FOREIGN KEY (matchId)
--     REFERENCES dbo.matches(matchId),
--     CONSTRAINT PK_matchId_hour PRIMARY KEY (matchId, eventId)
-- );
-- GO

-- IF OBJECT_ID('dbo.FavoriteMatches', 'U') IS NOT NULL
-- DROP TABLE dbo.FavoriteMatches
-- GO
-- CREATE TABLE dbo.FavoriteMatches
-- (
--     userId INT NOT NULL, 
--     matchId INT NOT NULL,
--     PRIMARY KEY (userId, matchId)
-- );
-- GO

--------------------------------------------------PROJECT SECTION------------------------------------------------------

-- -- PROJECT - create League table --
-- IF OBJECT_ID('dbo.League', 'U') IS NOT NULL
-- DROP TABLE dbo.leagues
-- GO
-- CREATE TABLE dbo.leagues
-- (
--     leagueId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
--     leagueName VARCHAR (50) NOT NULL, 
--     country VARCHAR (50) NOT NULL
-- );
-- GO

-- -- PROJECT - create REFEREE table --
-- IF OBJECT_ID('dbo.referees', 'U') IS NOT NULL
-- DROP TABLE dbo.referees
-- GO
-- CREATE TABLE dbo.referees
-- (
--     refereeId INT FOREIGN KEY REFERENCES dbo.users(userId) NOT NULL PRIMARY KEY,
--     qualification VARCHAR(50) NOT NULL CHECK(qualification IN ('Basic', 'Advanced', 'Pro')),
--     leagueId INT FOREIGN KEY REFERENCES dbo.leagues(leagueId) NOT NULL
-- );
-- GO

-- PROJECT - create FAR table --
-- IF OBJECT_ID('dbo.FARs', 'U') IS NOT NULL
-- DROP TABLE dbo.FARs
-- GO
-- CREATE TABLE dbo.FARs
-- (
--     FARId INT FOREIGN KEY REFERENCES dbo.users(userId) NOT NULL PRIMARY KEY
-- );
-- GO

-------------------------------------------insertion section------------------------------------------------------------
-- INSERT INTO dbo.matches ( stage, matchDate, matchHour , hostTeam , guestTeam , stadium , refereeID, score)
-- VALUES (10, '01/01/2021','19:00', 'Charlton Athletic', 'Sunderland', 'Metropolitano', 6, '0-3');

-- INSERT INTO dbo.matches (matchDate, stage, matchHour , hostTeam , guestTeam , staduim , refereeID, score)
-- VALUES (10, '02/01/2021', '21:00', 'Blackburn Rovers', 'West Ham United', 'Teddy', 7, '2-1');

-- INSERT INTO dbo.matches (stage, matchDate, matchHour , hostTeam , guestTeam , staduim , refereeID)
-- VALUES (10, '10/07/2021', '19:00', 'West Ham United', 'Charlton Athletic', 'Camp Nou', 8);

-- INSERT INTO dbo.matches (stage, matchDate, matchHour , hostTeam , guestTeam , staduim , refereeID)
-- VALUES (10, '10/07/2021', '20:00', 'Sunderland', 'Blackburn Rovers', 'Maracana', 9);

-- UPDATE dbo.matches
-- SET stage = 10;


-- -- INSERT INTO dbo.eventLog (eventId, event_type, eventDate , eventHour ,minuteInGame, eventDescription)
-- -- VALUES (1,'Goal' , '12/12/2021','17:05', 78,'Goal Ronaldo');

-- INSERT INTO dbo.eventLog (matchId, eventDate , eventHour , eventDescription)
-- VALUES (1,'12/12/2021','17:05','Goal Ronaldo');


-- INSERT INTO dbo.eventLog (matchId, eventDate , eventHour , eventDescription)
-- VALUES (10,'01/01/2021','21:58','Goal Jarrod Bowen');
