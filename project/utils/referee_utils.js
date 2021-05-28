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

exports.addRefereeToDB = addRefereeToDB;
