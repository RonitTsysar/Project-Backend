var express = require("express");
var router = express.Router();
const players_utils = require("../utils/players_utils");
const teams_utils = require("../utils/teams_utils");

//route after user selects a specific team. show full details by teamId.
router.get("/teamFullDetails/:teamId", async (req, res, next) => {
   let players_details = [];
  try {
    // const players_details = await players_utils.getPlayersByTeam(
    //   req.params.teamId
    // );

    const teamName = await teams_utils.getTeamNameById(
      req.params.teamId
    );

    const matches = await teams_utils.getTeamMatchesByName(
      teamName
    );
    
    // const coach_details = await teams_utils.getCoachByTeam(
    //   req.params.teamId
    // );
    // TODO - add games history

    res.send({ id: req.params.teamId,
              teamName: teamName,
              players: players_details,
              teamMatches: matches
               });
  } catch (error) {
    next(error);
  }
});

//route for search a team by name. returns partial data.
router.get("/searchTeamByName/:teamName", async (req, res, next) => {
  try{
      let team = {};
      team = await teams_utils.getTeamByName(req.params.teamName);
      res.send(team);

  } catch(error){
      next(error);
  }
})

module.exports = router;
