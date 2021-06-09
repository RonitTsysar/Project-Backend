const matches_domain = require("../domain/matches_domain");
const matches_utils = require("../utils/matches_utils");

// *****************************************UNIT TESTING - MATCHES ASSIGNMENT USE CASE 10 AND 5*******************************************************

//mocking matches_utils.checkSufficientTeamsUtils
matches_utils.checkSufficientTeamsUtils = jest.fn(async (leagueId) => {
    var leaguesTeams = {271: 4,  //fake DB
        100: 1,
        50: 5}

    const numOfTeams = leaguesTeams[leagueId]
    if(numOfTeams === undefined){
        return {0:{'':0}}
    }
    
    const obj = {0:{'':numOfTeams}}
    console.log("mocking");
    return obj;
})

//mocking matches_utils.checkIfValidSeason
matches_utils.checkIfValidSeason = jest.fn(async (season) => {
    var seasons = {'2020/2021': 30} //fake DB
    if(season in seasons){
        return {0:{'':seasons[season]}};
    }
    return {0:{'':0}};
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

test('Check if existed matchId exsit', async () => {  
    const matchId = 1; 
    
    const isValid = await matches_domain.checkIsValidMatch(matchId);
    expect(isValid).toBe(true);
});

test('Check if wrong matchId not exsit', async () => {  
    const matchId = 0; 
    
    const isValid = await matches_domain.checkIsValidMatch(matchId);
    expect(isValid).toBe(false);
});

test('Check if undefined matchId not exsit', async () => {  
    const matchId = undefined; 
    
    const isValid = await matches_domain.checkIsValidMatch(matchId);
    expect(isValid).toBe(false);
});

test('Check if number of teams of a WRONG league id is GE to 2 OR, an even amount of teams exist. ', async () => {   
    const leagueId = -1; 
    const isValid = await matches_domain.checkSufficientTeams(leagueId);
    expect(isValid).toBe(false);
});

test('Check if number of teams of a CORRECT league id is GE to 2 OR, an even amount of teams exist. ', async () => {    
    const leagueId = 271;
    const isValid = await matches_domain.checkSufficientTeams(leagueId);
    expect(isValid).toBe(true);
});

test('Check if an exist season really exsits ', async () => {   
    const season = '2020/2021'; 
    const isValid = await matches_domain.checkValidSeason(season);
    expect(isValid).toBe(false);
});

test('Check if an UN existed season does not exsit ', async () => {   
    const season = '2019/2020'; 
    const isValid = await matches_domain.checkValidSeason(season);
    expect(isValid).toBe(true);
});

test('Check if the number of matches after applying team-pair combination of all teams equals (n choose 2)', async () => {    
    const teams = [{name: "a"},
                    {name: "b"},
                    {name: "c"},
                    {name: "d"},
                ];

    const numOfPairs = factorial(teams.length) / (factorial(teams.length - 2) * factorial(2))
    const matches = matches_domain.makePairs(teams);
    expect(matches.length).toEqual(numOfPairs);
});

function factorial(num){
    if (num == 1){
        return 1;
    }

    return num * factorial(num - 1);
}


// *****************************************INTEGRATION TESTING - MATCHES ASSIGNMENT USE CASE 10*******************************************************
test('Check if the number of dates created after applying matches_domain.makeDates() equals (n choose 2)', async () => {    
    
    const teams = [{name: "a"},
    {name: "b"},
    {name: "c"},
    {name: "d"},];
    const matches = matches_domain.makePairs(teams);

    const numOfRounds = 3;
    const year = 2021;
    const numOfMatchesEachRound = matches.length;
    const amountOfMatchesEachDay = teams.length / 2; 

    const dates = matches_domain.makeDates(numOfRounds, year, numOfMatchesEachRound, amountOfMatchesEachDay);
    expect(matches.length * numOfRounds).toEqual(dates.length);
});