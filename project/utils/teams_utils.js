const DButils = require("./DButils");
const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
// const TEAM_ID = "85";

async function getCoachByTeam(team_id) {
const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
        include: "coach",
        api_token: process.env.api_token,
    },
    });
    const coach_id = team.data.data.coach.data.coach_id
    console.log(`coach_id ${coach_id}`);

    const coach = await axios.get(`${api_domain}/coaches/${coach_id}`, {
        params: {
            api_token: process.env.api_token,
        },
        });
    
    return coach.data.data
}

async function getTeamNameById(teamId){
    let team = await axios.get(`${api_domain}/teams/${teamId}`, {
        params: {
            api_token: process.env.api_token,
        },
        });
    
    teamName = team.data.data.name;
    return teamName
}

async function getTeamMatchesByName(teamName){
    const matches = await DButils.execQuery(
        `select * from matches where matches.hostTeam=N'${teamName}' OR matches.guestTeam=N'${teamName}'`
      );
      return matches;
}

async function getTeamByName(teamName) {
    let teams_info = await axios.get(`${api_domain}/teams/search/${teamName}`, {
        params: {
            api_token: process.env.api_token,
        },
        });
return extractRelevantTeamSearchData(teams_info)
}

function extractRelevantTeamSearchData(teams_info){
    return teams_info.data.data.map((team_info) => {
        const {id, name, logo_path} = team_info;
        return {
          team_id: id,
          team_name: name,
          logo: logo_path,          
        };
      });
}

exports.getCoachByTeam = getCoachByTeam;
exports.getTeamByName = getTeamByName;
exports.getTeamNameById = getTeamNameById;
exports.getTeamMatchesByName = getTeamMatchesByName;

