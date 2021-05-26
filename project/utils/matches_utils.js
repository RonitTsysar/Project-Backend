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


  exports.getMatchesByStage = getMatchesByStage;
  exports.getMatchById = getMatchById;
  exports.getMatchEventByMatch = getMatchEventByMatch;
  exports.getAllMatchesByIds = getAllMatchesByIds;

  // `select matches.matchId ,matches.matchDate ,matches.matchHour ,matches.hostTeam , matches.guestTeam, matches.staduim ,matches.coachID ,matches.score ,eventLog.eventHour as Time,eventLog.eventDescription as Description from matches left join eventLog on matches.matchId = eventLog.matchId`