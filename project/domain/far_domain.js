const DButils = require("../utils/DButils");

async function addMatch(match){
    await DButils.execQuery(
        `INSERT INTO matches (stage, matchDate, matchHour , hostTeam , guestTeam , stadium , refereeId, score) VALUES (${match.stage}, N'${match.matchDate}', N'${match.matchHour}', N'${match.hostTeam}', N'${match.guestTeam}', N'${match.stadium}', ${match.refereeId}, N'${match.score}')`
    )
}

exports.addMatch = addMatch;