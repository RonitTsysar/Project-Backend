const DButils = require("../utils/DButils");
const bcrypt = require("bcryptjs");
const auth_utils = require("../utils/auth_utils");

/*
params: username, password
return: boolean
*/

async function loginUser(username, password){
  //Sending request to the Data Layer
  const user = await auth_utils.getUser(username);
  // check that username exists & the password is correct
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return null;
  }
  return user;
}

// let user = loginUser('danaKlim', 'dana123');
// console.log(user);

exports.loginUser = loginUser;