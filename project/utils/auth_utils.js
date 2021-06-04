const axios = require("axios");
const DButils = require("./DButils");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
// const TEAM_ID = "85";
const LEAGUE_ID = 271;


async function getUser(username){
    //get user from DB
    const user = (
        await DButils.execQuery(
          `SELECT * FROM dbo.users WHERE username = '${username}'`
        )
      )[0];
 
    return user;
}


exports.getUser = getUser;