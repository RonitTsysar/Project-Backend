const DButils = require("./DButils");

async function addRefereeToDB(referee){
    try {
        await DButils.execQuery(
            `INSERT INTO dbo.referees (refereeId, qualification) 
             VALUES 
            (${referee.refereeId}, N'${referee.qualification}');`
          );
    }
    catch (error) {
        throw(error);
      }
}

async function checkIsValidReferee(refereeId){
  if(refereeId === undefined){
      return false;
  }
  const referee = await DButils.execQuery(
      `select * from referees where refereeId=${refereeId}`
  )
  if(referee[0] === undefined){
      return false;
  }
  return true;
}

exports.checkIsValidReferee = checkIsValidReferee;
exports.addRefereeToDB = addRefereeToDB;
