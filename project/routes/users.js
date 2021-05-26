var express = require("express");
var router = express.Router();
const DButils = require("../utils/DButils");
const users_utils = require("../utils/users_utils");
const matches_utils = require("../utils/matches_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.userId) {
    DButils.execQuery("SELECT userId FROM users")
      .then((users) => {
        if (users.find((x) => x.userId === req.session.userId)) {
          req.userId = req.session.userId;
          next();
        }
      })
      .catch((err) => next(err));
  } else {
    res.sendStatus(401);
  }
});

router.post("/favoriteMatches", async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const matchId = req.body.matchId;
    await users_utils.markMatchAsFavorite(userId, matchId);
    res.status(201).send("The match successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});


/**
 * This path returns the favorites matches that were saved by the logged-in user
 */
router.get("/favoriteMatches", async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const matchIds = await users_utils.getFavoriteMatches(userId);
    const matches_info = await matches_utils.getAllMatchesByIds(matchIds);   
    res.status(200).send(matches_info);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

/**
 * This path gets body with playerId and save this player in the favorites list of the logged-in user
 */
// router.post("/favoritePlayers", async (req, res, next) => {
//   try {
//     const userId = req.session.userId;
//     const player_id = req.body.playerId;
//     await users_utils.markPlayerAsFavorite(userId, player_id);
//     res.status(201).send("The player successfully saved as favorite");
//   } catch (error) {
//     next(error);
//   }
// });
// 
// /**
//  * This path returns the favorites players that were saved by the logged-in user
//  */
// router.get("/favoritePlayers", async (req, res, next) => {
//   try {
//     const userId = req.session.userId;
//     let favorite_players = {};
//     const player_ids = await users_utils.getFavoritePlayers(userId);
//     let player_ids_array = [];
//     player_ids.map((element) => player_ids_array.push(element.player_id)); //extracting the players ids into array
//     const results = await players_utils.getPlayersInfo(player_ids_array);
//     res.status(200).send(results);
//   } catch (error) {
//     next(error);
//   }
// });