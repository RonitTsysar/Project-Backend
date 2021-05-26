const DButils = require("./DButils");

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

exports.markMatchAsFavorite = markMatchAsFavorite;
exports.getFavoriteMatches = getFavoriteMatches;
