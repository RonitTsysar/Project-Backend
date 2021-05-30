const DButils = require("../utils/DButils");

async function checkIfFarIsValid(userId){
    if(userId === undefined){
        return false;
    }

    const referee = await DButils.execQuery(
        // `select ifnull((select refereeId from referees where refereeId=${userId}), No Result Found)`
        `select * from FARs where FARId=${userId}`
    )
    if(referee[0] === undefined){
        return false;
    }

    return true;
} 

exports.checkIfFarIsValid = checkIfFarIsValid