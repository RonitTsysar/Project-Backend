const {checkFarIsValid} = require("../domain/far_domain");
const far_domain = require("../domain/far_domain");
const far_utils = require("../utils/far_utils");
const referee_utils = require("../utils/referee_utils");
const users_utils = require("../utils/users_utils");
const matches_utils = require("../utils/matches_utils");

//mocking far_utils.checkIfFarIsValid
far_utils.checkIfFarIsValid = jest.fn(async (userId) => { 
        var far = {0:2} //fake DB.

        if(userId === undefined){
            return false;
        }    
    
        const refereeId = far[0];
    
        if(userId != refereeId){
            return false;
        }
        console.log("mocking");
        return true;
    })

users_utils.addUserToDB = jest.fn(async (user) => {
    try {
        const users = [
            {
                userId:1,
                username:"ronit123",
                firstname:"ronit",
                lastname:"tsysar",
                country:"israel",
                password:"123",
                email:"tsysar@post.bgu.ac.il",
                image:null
            }
        ]
    
        if (users.find((x) => x.username === user.username))
            throw { status: 409, message: "Username taken" };
    
        } catch (error) {
        throw (error);
        }
})

users_utils.getUserId = jest.fn(async (username) => { return [{userId:2}]; })

referee_utils.addRefereeToDB = jest.fn(async (referee) => {
    const referees = [
        {
            refereeId:1,
            qualification:"basic",
            leagueId:null
        }
    ]
    if (referees.find((x) => x.refereeId === referee.refereeId))
        throw { status: 409, message: "refereeId already exist" };
    })

matches_utils.getAllMatches = jest.fn(async (user) => {
    return [{
        eventDateTime:'"2020-10-01T13:00:00.000Z"',
        guestTeam:'NY Cosmos',
        hostTeam:'SønderjyskE',
        league:271,
        matchId:70,
        refereeId:24,
        score:null,
        season:'2020/2021',
        stadium:'Metropolitano',
        stage:1,
    }]})

// *****************************************UNIT TESTING - MATCHES ASSIGNMENT USE CASE 10 AND 5 *******************************************************

test('Check if unvalid far id belongs to a valid far user', async () => {
    const isValid = await checkFarIsValid(3);
    expect(isValid).toEqual(false);
});

test('Check if valid far id belongs to a valid far user', async () => {   
    const isValid = await checkFarIsValid(2);
    expect(isValid).toEqual(true);
});

test('Check if undefined far id belongs to a valid far user', async () => {  
    const isValid = await checkFarIsValid(undefined);
    expect(isValid).toEqual(false);
    
});

test('Check valid referee params insertion', async () => {

    const res = await far_domain.addReferee(
        {
            username: "guy123", 
            firstname: "guy", 
            lastname: "klinger",
            country: "israel", 
            password: "guy1234",
            email: "guykling@post.bgu.ac.il", 
            image: null
        },
        {
            qualification: "basic"
        }
    )
    expect(res.refereeId).toEqual(2);
});

test('Check invalid referee params insertion', async () => {
try {
    const res = await far_domain.addReferee(
        {
            username: "ronit123", 
            firstname: "guy", 
            lastname: "klinger",
            country: "israel", 
            password: "guy1234",
            email: "guykling@post.bgu.ac.il", 
            image: null
        },
        {
            qualification: "basic"
        }
    )
} catch (e) {
    expect(e.message).toBe("Username taken");
}
});



