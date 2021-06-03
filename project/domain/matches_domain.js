const matches_utils = require("../utils/matches_utils");

async function checkSufficientTeams(leagueId){
    const numOfTeams = await matches_utils.checkSufficientTeamsUtils(leagueId);
    if (numOfTeams < 2){
        return false;
    }
    return true;
}

//implement match assignment algorithm
async function assignMatches(leagueId, seasonId, numOfRounds){
    const validTeams = await matches_utils.getValidTeamsByLeagueId(leagueId);

    ///implement algorithm down here

    return validTeams;
}

exports.assignMatches = assignMatches
exports.checkSufficientTeams = checkSufficientTeams