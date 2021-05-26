var express = require("express");
var router = express.Router();
const DButils = require("../utils/DButils");
const players_utils = require("../utils/players_utils");

//route after user selects a specific player. show full details by playerId.

router.get("/playerFullDetails/:playerId", async (req, res, next) => {
  try {
    let player_details = {};
    player_details = await players_utils.getPlayersInfo([req.params.playerId]);
    res.send(player_details);

  } catch (error) {
    next(error);
  }
});

//route for search a player by name. returns partial data
router.get("/searchPlayerByName/:playerName", async (req, res, next) => {
    try{
        let players = {};
        players = await players_utils.getPlayerByName(req.params.playerName);
        res.send(players);

    } catch(error){
        next(error);
    }
})

module.exports = router;
