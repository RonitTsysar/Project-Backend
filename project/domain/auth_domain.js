const DButils = require("../utils/DButils");
const bcrypt = require("bcryptjs");

/*
params: username, password
return: boolean
*/

async function loginUser(username, password){
    const user = (
        await DButils.execQuery(
          `SELECT * FROM dbo.users WHERE username = '${username}'`
        )
      )[0];
      // user = user[0];
  
      // check that username exists & the password is correct
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return null;
      }

      return user;
}

exports.loginUser = loginUser