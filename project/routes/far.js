var express = require("express");
var router = express.Router();
const far_domain = require("../domain/far_domain");
const matches_domain = require("../domain/matches_domain");
const referee_domain = require("../domain/referee_domain");

router.use("/", async (req, res, next) => {
    try{
        //check if user has FAR access
        const isValid = await far_domain.checkFarIsValid(req.session.userId);        
        if(!isValid){
            throw{status: 500, message: "User must have FAR privileges"};
        }
        
        next();
        
    } catch(error){
        next(error);
    }
})

router.post("/addMatch", async (req, res, next) => {
    try{
        if(!('stage' in req.body) || 
        !('matchDate' in req.body) ||
        !('matchHour' in req.body) ||
        !('hostTeam' in req.body) ||
        !('guestTeam' in req.body) ||
        !('stadium' in req.body) ||
        !('refereeId' in req.body)){
            throw{status: 400,message: "wrong object keys supplied"}
        }

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
        res.status(200).send("Match added successfully");

    } catch(error){
        next(error);
    }
})

/*
request should contain:
{leagueId:271,
season:'2017/2018',
policy: {numOfRounds: 10}}

add route to api and delete /far/addMatch route
*/
router.post("/matchAssignmentAlgorithm", async (req, res, next) => {
    try{      
        
        if(!('leagueId' in req.body) ||
        !('season' in req.body) ||
        !('policy' in req.body) ||
        !(/\d\d\d\d\/\d\d\d\d/.test(req.body.season))){
            throw{status: 400,message: "wrong input parameters."}
        }

        if(!('numOfRounds' in req.body.policy)){
            throw{status: 400, message: "policy is expected."}
        }

        const isValid = matches_domain.checkSufficientTeams(req.body.leagueId)
        if(!isValid){
            throw{status: 409,message: "2 teams of the same league are required in the DB."}
        }

        await matches_domain.assignMatches(req.body.leagueId, req.body.season, req.body.policy.numOfRounds);
        res.status(200).send("Matches table created");

    } catch(error){
        next(error);
    }
})

router.post("/addReferee", async (req, res, next) => {
    try {
        if(!checkValidParamsAddReferee(req.body)){
            throw {status: 400, message: "Bad Request. Wrong Input Parameters"};
        }
        
        const{username, firstname, lastname, country, password, email, image_url, qualification} = req.body
        result = await far_domain.addReferee(
            {
                username: username, 
                firstname: firstname, 
                lastname: lastname,
                country: country, 
                password: password,
                email: email, 
                image: image_url
            },
            {
                qualification: qualification
            }
        )
        res.status(201).send(result);
    } catch (error) {
        next(error);
      }
})

router.use("/scheduleReferee", async (req, res, next) => {
    try{
        isValidRef = await referee_domain.checkIsValidReferee(req.body.refereeId);
        isValidMatch = await matches_domain.checkIsValidMatch(req.body.matchId);

        if (isValidRef && isValidMatch) {
            next();
        } 
        else {
            throw{status: 500, message: "refereeId does not exist or matchId does not exist"}
        }
    } catch(error){
        next(error);
    }
})

router.post("/scheduleReferee", async (req, res, next) => {
    try {
        if(!checkValidParamsScheduleReferee(req.body)){
            throw {status: 400, message: "Bad Request. Wrong Input Parameters"};
        }
        
        const{refereeId, matchId} = req.body
        await matches_domain.assignReferee(matchId, refereeId);
        res.status(200).send("referee successfully assigned to a match");

    } catch (error) {
        next(error);
      }
})

function checkValidParamsAddReferee(body){
    if (!'username' in body){return false;}
    if (!'firstname' in body){return false;}
    if (!'lastname' in body){return false;}
    if (!'country' in body){return false;}
    if (!'password' in body){return false;}
    if (!'email' in body){return false;}
    if (!'image_url' in body){return false;}
    if (!'qualification' in body){return false;}
    return true;
}

function checkValidParamsScheduleReferee(body){
    if (!'refereeId' in body){return false;}
    if (!'matchId' in body){return false;}
    return true;
}
module.exports = router;