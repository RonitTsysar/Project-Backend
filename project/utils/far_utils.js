const DButils = require("../utils/DButils");

async function checkIfFarIsValid(userId){
    if(userId === undefined){
        return false;
    }

    const referee = await DButils.execQuery(
        // `select ifnull((select refereeId from referees where refereeId=${userId}), No Result Found)`
        `select * from FARs where FARId=${userId}`
    )
    if(referee[0] === undefined){
        return false;
    }
    
    return true;
}

async function addMatchToDB(match){
    await DButils.execQuery(
        `INSERT INTO matches (stage, matchDate, matchHour , hostTeam , guestTeam , stadium , refereeId, score) VALUES (${match.stage}, N'${match.matchDate}', N'${match.matchHour}', N'${match.hostTeam}', N'${match.guestTeam}', N'${match.stadium}', ${match.refereeId}, N'${match.score}')`
    )
}

exports.addMatchToDB = addMatchToDB
exports.checkIfFarIsValid = checkIfFarIsValid