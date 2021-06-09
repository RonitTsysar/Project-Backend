
const referee_utils = require("../utils/referee_utils");
const matches_utils = require("../utils/matches_utils");
const referee_domain = require("../domain/referee_domain");

// MOCKING
referee_utils.checkIsValidReferee = jest.fn(async (refereeId) => {
    if(refereeId === undefined){
        return false;
    }

    const referees = [{
            refereeId:1,
            qualification:"basic",
            leagueId:null
        }]
    
    const referee = [referees.find(x => x.refereeId === refereeId)];

    if(referee[0] === undefined){
        return false;
    }
    return true;
})

matches_utils.checkIsValidMatch = jest.fn(async (matchId) => {
    if(matchId === undefined){
        return false;
    }
    matches = [{matchId:1}, {matchId:2}]

    const match = [matches.find(x => x.matchId === matchId)];

    if(match[0] === undefined){
        return false;
    }
    return true;
})


// *****************************************INTEGRATION TESTING - REFEREE ASSIGNMENT USE CASE 5*******************************************************
test('check if 2 validations works together - scheduleValidation', async () => {    
    
    const req = {
        body: {
            "refereeId": 1,
            "matchId": 2
        }
    }

    const isValid = await referee_domain.scheduleValidation(req);
    expect(isValid).toBe(true);
});

test('check if 2 validations works together (invalid) - scheduleValidation', async () => {    
    
    try {
        const req = {
            body: {
                "refereeId": 3,
                "matchId": 2
            }
        }
    
        const isValid = await referee_domain.scheduleValidation(req);
    } catch (e) {
        expect(e.status).toBe(500);
    }
});