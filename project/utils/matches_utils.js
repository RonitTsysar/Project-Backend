const { forEach } = require("async");
const DButils = require("./DButils");

// all matches are stage 10 for now.
async function getMatchesByStage() {
    const matches = await DButils.execQuery(
      `select * from matches where matches.stage=10`
    );
    return matches;
  }

async function getMatchEventByMatch(matchId) {
  const events = await DButils.execQuery(
    `select * from eventLog where eventLog.matchId = ${matchId}`
  );
  return events;
}

async function getMatchById(matchId) {
  const matches = await DButils.execQuery(
    `select * from matches where matches.matchId=${matchId}`
  );

  return matches;
}

async function getAllMatchesByIds(matchIds){
  let match_ids_array = [];
  matchIds.map((element) => match_ids_array.push(element.matchId)); //extracting the matches ids into array
  let results = [];
  match_ids_array.map((id) =>{
    results.push(getMatchById(id));      
    });
  let matches_info = await Promise.all(results);
  return matches_info
}

async function addMatchToDB(match){
  await DButils.execQuery(
      `INSERT INTO matches (stage, matchDate, matchHour , hostTeam , guestTeam , stadium , refereeId, score) VALUES (${match.stage}, N'${match.matchDate}', N'${match.matchHour}', N'${match.hostTeam}', N'${match.guestTeam}', N'${match.stadium}', ${match.refereeId}, N'${match.score}')`
  )
}

async function checkSufficientTeamsUtils(leagueId){
  return await DButils.execQuery(
    `SELECT COUNT(teamId) from teams where teams.leagueId=${leagueId}`)
}

async function getValidTeamsByLeagueId(leagueId){
  return await DButils.execQuery(
    `SELECT * from teams where teams.leagueId=${leagueId}`)
}

async function getAllMatches() {
  const matches = await DButils.execQuery(
    `select * from matches`
  );
  return matches;
}

async function checkIsValidMatch(matchId){
  if(matchId === undefined){
      return false;
  }

  const match = await DButils.execQuery(
      `select * from matches where matchId=${matchId}`
  )
  if(match[0] === undefined){
      return false;
  }
  return true;
}

async function assignReferee(matchId, refereeId){
  try {
    await DButils.execQuery(
      `UPDATE matches
      SET refereeId=${refereeId}
      WHERE matchId=${matchId}`);
  } catch (error) {
    throw (error);
  }
}

exports.assignReferee = assignReferee;
exports.checkIsValidMatch = checkIsValidMatch;
exports.getAllMatches = getAllMatches;
exports.addMatchToDB = addMatchToDB
exports.getMatchesByStage = getMatchesByStage;
exports.getMatchById = getMatchById;
exports.getMatchEventByMatch = getMatchEventByMatch;
exports.getAllMatchesByIds = getAllMatchesByIds;
exports.checkSufficientTeamsUtils = checkSufficientTeamsUtils;
exports.getValidTeamsByLeagueId = getValidTeamsByLeagueId;
