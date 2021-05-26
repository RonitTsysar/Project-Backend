var express = require("express");
var router = express.Router();
const matches_utils = require("../utils/matches_utils");

//route for search of a past games by stage
router.get("/searchMatches", async (req, res, next) => {
    try{
        let Matches = {};
        Matches = await matches_utils.getMatchesByStage();
        res.send(Matches);

    } catch(error){
        next(error);
    }
})

//route for search of a past games by stage
router.get("/searchMatchEventLog/:matchId", async (req, res, next) => {
    try{
        let events = {};
        events = await matches_utils.getMatchEventByMatch(req.params.matchId);
        res.send(events);
        
    } catch(error){
        next(error);
    }
})
module.exports = router;