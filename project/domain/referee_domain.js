const referee_utils = require("../utils/referee_utils");

async function checkIsValidReferee(refereeId){
    return await referee_utils.checkIsValidReferee(refereeId)
}

exports.checkIsValidReferee = checkIsValidReferee
