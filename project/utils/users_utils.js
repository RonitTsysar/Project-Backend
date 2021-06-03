const DButils = require("./DButils");
const bcrypt = require("bcryptjs");

// async function markPlayerAsFavorite(userId, player_id) {
//   await DButils.execQuery(
//     `insert into FavoritePlayers values ('${userId}',${player_id})`
//   );
// }

// async function getFavoritePlayers(userId) {
//   const player_ids = await DButils.execQuery(
//     `select player_id from FavoritePlayers where userId='${userId}'`
//   );
//   return player_ids;
// }

async function getUserId(username) {
  return await DButils.execQuery(`SELECT userId FROM dbo.users WHERE username=N'${username}'`)
}

async function addUserToDB(user){
  try {
    const users = await DButils.execQuery(
      "SELECT username FROM dbo.users;"
    );

    if (users.find((x) => x.username === user.username))
      throw { status: 409, message: "Username taken" };

    //hash the password
    let hash_password = bcrypt.hashSync(
      user.password,
      parseInt(process.env.bcrypt_saltRounds)
    );
    user.password = hash_password;

    await DButils.execQuery(
      `INSERT INTO dbo.users (username, firstname, lastname, country, password, email, image) 
       VALUES 
      (N'${user.username}', N'${user.firstname}', N'${user.lastname}', N'${user.country}', N'${hash_password}', N'${user.email}', N'${user.image}');`
    );
  } catch (error) {
    throw (error);
  }
}

async function markMatchAsFavorite(userId, matchId) {
  await DButils.execQuery(
    `insert into FavoriteMatches values ('${userId}',${matchId})`
  );
}

async function getFavoriteMatches(userId) {
  const playerIds = await DButils.execQuery(
    `select matchId from FavoriteMatches where userId=${userId}`
  );
  return playerIds;
}

exports.getUserId = getUserId;
exports.addUserToDB = addUserToDB;
exports.markMatchAsFavorite = markMatchAsFavorite;
exports.getFavoriteMatches = getFavoriteMatches;