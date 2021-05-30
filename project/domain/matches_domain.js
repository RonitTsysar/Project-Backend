const matches_utils = require("../utils/matches_utils");

async function checkSufficientTeams(leagueId){
    const numOfTeams = await matches_utils.checkSufficientTeamsUtils(leagueId);
    if (numOfTeams < 2){
        return false;
    }
    return true;
}

async function assignMatches(leagueId, seasonId, numOfRounds){
    const validTeams = await matches_utils.getValidTeamsByLeagueId(leagueId);

    let x = 5;
}

exports.assignMatches = assignMatches
exports.checkSufficientTeams = checkSufficientTeams