const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
// const TEAM_ID = "85";

async function getPlayerIdsByTeam(team_id) {
  let player_ids_list = [];
  const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "squad",
      api_token: process.env.api_token,
    },
  });
  team.data.data.squad.data.map((player) =>
    player_ids_list.push(player.player_id)
  );
  return player_ids_list;
}

async function getPlayersInfo(players_ids_list, teamSearch=false) {
  let promises = [];
  players_ids_list.map((id) =>
    promises.push(
      axios.get(`${api_domain}/players/${id}`, {
        params: {
          api_token: process.env.api_token,
          include: "team",
        },
      })
    )
  );
  let players_info = await Promise.all(promises);
  if(teamSearch){
    return extractRelevantPlayerPartialData(players_info)
  }
  return extractRelevantPlayerFullData(players_info);
}

async function getPlayerByName(playerName){
  let players_info = await axios.get(`${api_domain}/players/search/${playerName}`, {
    params: {
      api_token: process.env.api_token,
      include: "team",
    },
    })
  
  return extractRelevantPlayerSearchData(players_info)
}

//when team is displayed, all players are displayed as well - but with PARTIAL data
function extractRelevantPlayerPartialData(players_info) {
  return players_info.map((player_info) => {
    const {player_id, fullname, image_path, position_id} = player_info.data.data;
    const { name } = player_info.data.data.team.data;
    return {
      player_id: player_id,
      name: fullname,
      image: image_path,
      position: position_id,
      team_name: name,
      };
  });
}

// differs from extractRelevantPlayerPartialData because of the structure apears in "players_info".
function extractRelevantPlayerSearchData(players_info) {
  return players_info.data.data.map((player_info) => {
    if (typeof player_info.team !== 'undefined'){
      const {player_id, fullname, image_path, position_id} = player_info;
      const { name } = player_info.team.data;
      return {
      player_id: player_id,
      name: fullname,
      image: image_path,
      position: position_id,
      team_name: name,
      };
    }
  });
}

// for later use. if a user presses a player pic/name, full details will be displayed.
function extractRelevantPlayerFullData(players_info) {
  return players_info.map((player_info) => {
    const {player_id, fullname, image_path, position_id, birthdate, birthcountry, height, weight, common_name, nationality} = player_info.data.data;
    const { name } = player_info.data.data.team.data;
    return {
      player_id: player_id,
      name: fullname,
      common_name: common_name,
      image: image_path,
      position: position_id,
      team_name: name,
      birth_date: birthdate,
      birth_country: birthcountry,
      height: height,
      weight: weight, // may be null      
      nationality: nationality
    };
  });
}

async function getPlayersByTeam(team_id) {
  let player_ids_list = await getPlayerIdsByTeam(team_id);
  let players_info = await getPlayersInfo(player_ids_list, true);
  return players_info;
}

exports.getPlayersByTeam = getPlayersByTeam;
exports.getPlayersInfo = getPlayersInfo;
exports.getPlayerByName = getPlayerByName;
