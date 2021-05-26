var express = require("express");
var router = express.Router();
const url = require('url');
const league_utils = require("../utils/league_utils");

router.get("/getLeagueDetails", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    
    //TODO: add next game to league_details from games_db.
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
