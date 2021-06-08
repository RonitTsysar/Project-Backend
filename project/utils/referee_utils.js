const DButils = require("./DButils");

async function addRefereeToDB(referee){
    try {

      const referees = await DButils.execQuery(
        "SELECT refereeId FROM dbo.referees;"
      );
  
      if (referees.find((x) => x.refereeId === referee.refereeId))
        throw { status: 409, message: "refereeId already exist" };

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

async function getRefereesIds(){
  try {
    const ids = await DButils.execQuery(
        `SELECT refereeId from referees`
      );

    return ids
}
catch (error) {
    throw(error);
  }
}

exports.addRefereeToDB = addRefereeToDB;
exports.getRefereesIds = getRefereesIds;
exports.checkIsValidReferee = checkIsValidReferee;
