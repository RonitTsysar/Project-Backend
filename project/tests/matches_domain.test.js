jest.mock('../utils/__mocks__/matches_utils');
const matches_domain = require("../domain/matches_domain");

// *****************************************UNIT TESTING - MATCHES ASSIGNMENT USE CASE 10 *******************************************************

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

