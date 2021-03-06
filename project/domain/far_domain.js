const far_utils = require("../utils/far_utils");
const users_utils = require("../utils/users_utils");
const referee_utils = require("../utils/referee_utils");
const matches_utils = require("../utils/matches_utils");

async function checkFarIsValid(userId){
    //chek if farId in FAR table
        return await far_utils.checkIfFarIsValid(userId)
}
// not relevant
async function addMatch(match){    
    match_utils.addMatchToDB(match)
}

async function addReferee(user, referee) {
    try {
        await users_utils.addUserToDB(user);
        let userId = await users_utils.getUserId(user.username);
        referee.refereeId = userId[0].userId;
    
        await referee_utils.addRefereeToDB(referee);
        matches = await matches_utils.getAllMatches();

        res = {
            refereeId: referee.refereeId,
            matches: matches
        }
        return res
    }
    catch (error) {
        throw (error);
      }
}

exports.addReferee = addReferee;
exports.addMatch = addMatch;
exports.checkFarIsValid = checkFarIsValid;