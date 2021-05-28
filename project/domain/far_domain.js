const far_utils = require("../utils/far_utils");

async function checkFarIsValid(userId){
    //chek if farId in FAR table
        return await far_utils.checkIfFarIsValid(userId)
}

async function addMatch(match){
    //change
    far_utils.addMatchToDB(match)
}

exports.addMatch = addMatch;
exports.checkFarIsValid = checkFarIsValid;