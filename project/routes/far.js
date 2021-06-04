var express = require("express");
var router = express.Router();
const far_domain = require("../domain/far_domain");
const matches_domain = require("../domain/matches_domain");

router.use("/", async (req, res, next) => {
    try{
        //check if user has FAR access
        const isValid = await far_domain.checkFarIsValid(req.session.userId);        
        isValid ? next() : (() => {throw{status: 500, message: "User must have FAR privilege"}})

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
            throw{
                status: 400,
                message: "wrong object keys supplied"
            }
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
{leagueId:217,
season:'2017/2018',
policy: {numOfRounds: 10}}

add route to api and delete /far/addMatch route
*/
router.post("/matchAssignmentAlgorithm", async (req, res, next) => {
    try{      
        
        if(!('leagueId' in req.body) ||
        !('season' in req.body) ||
        !('policy' in req.body)){
            throw{
                status: 400,
                message: "wrong input parameters."
            }
        }

        if(!('numOfRounds' in req.body.policy)){
            throw{
                status: 400,
                message: "policy is expected."
            }
        }

        const isValid = matches_domain.checkSufficientTeams(req.body.leagueId)
        if(!isValid){
            throw{
                status: 409,
                message: "2 teams of the same league and season are required in the DB."
            }
        }

        const matches = await matches_domain.assignMatches(req.body.leagueId, req.body.season, req.body.policy.numOfRounds);         
        

    } catch(error){
        next(error);
    }
})

router.post("/addReferee", async (req, res, next) => {
    try {
        if(!checkIfValidParamsExist(req.body)){
            throw {status: 400, message: "Bad Request. Wrong Input Parameters"};
        }
        
        const{username, firstname, lastname, country, password, email, image_url, qualification} = req.body
        await far_domain.addReferee(
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
        res.status(201).send("referee created");
    } catch (error) {
        next(error);
      }
})

function checkIfValidParamsExist(body){
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
module.exports = router;