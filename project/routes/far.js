var express = require("express");
var router = express.Router();
const far_domain = require("../domain/far_domain");

router.use("/addMatch", async (req, res, next) => {
    try{
        //check if user has FAR access
        const isValid = await far_domain.checkFarIsValid(req.session.userId);        
        isValid ? next() : res.status(500).send("user is not in FAR table");

    } catch(error){
        next(error);
    }
})

router.post("/addMatch", async (req, res, next) => {
    try{
        let score = null;
        if (req.body.score !== undefined){
            score = req.body.score
        }

        const{stage, matchDate, matchHour, hostTeam, guestTeam, stadium, refereeId} = req.body
        await far_domain.addMatch({
            stage: stage,
             matchDate: matchDate, 
             matchHour: matchHour, 
             hostTeam: hostTeam,
             guestTeam: guestTeam, 
             stadium: stadium,
             refereeId: refereeId, 
             score: score
        })
        res.send("Match added successfully");

    } catch(error){
        next(error);
    }
})

module.exports = router;