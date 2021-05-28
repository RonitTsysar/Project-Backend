var express = require("express");
var router = express.Router();
const far_domain = require("../domain/far_domain");

router.use("/", async (req, res, next) => {
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