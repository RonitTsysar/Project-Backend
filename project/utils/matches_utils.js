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

async function getMatchById(matchId) {
  const matches = await DButils.execQuery(
    `select * from matches where matches.matchId=${matchId}`
    
  );

  console.log(matches)
  return matches;
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

exports.addMatchToDB = addMatchToDB
exports.getMatchesByStage = getMatchesByStage;
exports.getMatchById = getMatchById;
exports.getMatchEventByMatch = getMatchEventByMatch;
exports.getAllMatchesByIds = getAllMatchesByIds;
exports.checkSufficientTeamsUtils = checkSufficientTeamsUtils;
exports.getValidTeamsByLeagueId = getValidTeamsByLeagueId;
