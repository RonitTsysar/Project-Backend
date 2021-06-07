const referee_utils = require("../utils/referee_utils");
const matches_domain = require("../domain/matches_domain");

async function checkIsValidReferee(refereeId){
    return await referee_utils.checkIsValidReferee(refereeId)
}

async function scheduleValidation(req){

    isValidRef = await this.checkIsValidReferee(req.body.refereeId);
    isValidMatch = await matches_domain.checkIsValidMatch(req.body.matchId);

    if (isValidRef && isValidMatch) {
        return true
    } 
    else {
        throw{status: 500, message: "refereeId does not exist or matchId does not exist"}
    }
}

exports.checkIsValidReferee = checkIsValidReferee
exports.scheduleValidation = scheduleValidation
