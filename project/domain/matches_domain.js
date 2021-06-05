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

async function checkIsValidMatch(matchId){
    return await matches_utils.checkIsValidMatch(matchId)
}

async function assignReferee(matchId, refereeId){
    try{
        await matches_utils.assignReferee(matchId, refereeId);
    }
    catch (error) {
        throw (error);
      }
}

exports.assignReferee = assignReferee
exports.checkIsValidMatch = checkIsValidMatch
exports.assignMatches = assignMatches
exports.checkSufficientTeams = checkSufficientTeams