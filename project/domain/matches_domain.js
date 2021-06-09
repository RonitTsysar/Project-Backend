const matches_utils = require("../utils/matches_utils");
const referee_utils = require("../utils/referee_utils");

async function checkSufficientTeams(leagueId){
    const numOfTeams = await matches_utils.checkSufficientTeamsUtils(leagueId);
    let count = numOfTeams['0']['']
    if (count < 2 || count % 2 == 1){
        return false;
    }
    return true;
}

async function checkValidSeason(season){
    const numOfTeams = await matches_utils.checkIfValidSeason(season);
    let count = numOfTeams['0']['']
    if (count == 0){
        return true;
    }
    return false;
}



//implement match assignment algorithm
async function assignMatches(leagueId, season, numOfRounds){
    try{    
        const validTeams = await matches_utils.getValidTeamsByLeagueId(leagueId);
        const teamPairs = makePairs(validTeams);    
        const stadiums = ['Metropolitano', 'Camp Nou', 'Maracana', 'Teddy'];
        const refereesIds = await referee_utils.getRefereesIds();
        const amountOfMatchesEachRound = teamPairs.length;
        const amountOfMatchesEachDay = validTeams.length / 2;
        const year = season.split("/")[0];
        const dates = makeDates(numOfRounds, year, amountOfMatchesEachRound, amountOfMatchesEachDay);
        let matches = [];
        let isReferees = true;

        if(refereesIds.length == 0){
            isReferees = false
        }
        
        for(let i = 0; i < numOfRounds * amountOfMatchesEachRound; i++){
            let match = {
                            league: leagueId,
                            season: season,
                            stage: Math.floor(i / amountOfMatchesEachRound) + 1,
                            matchDateTime: JSON.stringify(dates[i]),
                            hostTeam: teamPairs[i % teamPairs.length][0], 
                            guestTeam: teamPairs[i % teamPairs.length][1], 
                            stadium: stadiums[i % stadiums.length], 
                            refereeId: isReferees ? refereesIds[i % refereesIds.length].refereeId : -1
                        }
            matches.push(match)
        }
        
        for(let i = 0; i< matches.length; i++){
            await matches_utils.addMatchToDB(matches[i]);
        }
        return matches;
    }
    catch(error){
        throw error;
    }
}

/*
make all possible pairs of the teams.
then, order them in a way that no team will play twice in each stage.
no team will play against itself.
*/
function makePairs(validTeams){
    let pairs = [];
    let teamNames = [];
    
    for(let i = 0; i < validTeams.length; i++){
        teamNames.push(validTeams[i].name);
    }

    for (let i = 0; i < teamNames.length - 1; i++) {
        for (let j = i + 1; j < teamNames.length; j++) {
            pairs.push([teamNames[i], teamNames[j]]);
        }
    }

    let names = [...teamNames];
    let shuffledPairs = [];
    let index = 0;

    while(pairs.length != 0){
        let pair = pairs.find(element => (teamNames.includes(element[0]) && teamNames.includes(element[1])))
        if(teamNames.length == 0){
            teamNames = [...names];
            continue;
        }
        
        shuffledPairs.push(pair);
        let pairIndex = pairs.indexOf(pair);
        if (index !== -1) {
            pairs.splice(pairIndex, 1);
        }

        teamNames = teamNames.filter(val => val !== pair[0]);
        teamNames = teamNames.filter(val => val !== pair[1]);
    }
    
    return shuffledPairs;
    
}

/*
games start time: 14:00 to 20:00.
if passed, 20:00, the game will move to the next day.
each stage will be a week a part.
no team will play twice a day.
*/
function makeDates(numOfRounds, year, numOfMatchesEachRound, amountOfMatchesEachDay){
    let dates = [];
    let date = new Date(`October 1, ${year} 14:00:00`);
    const twoHours = 1000 * 60 * 60 * 2;
    let numOfDays = 7;
    dates.push(date);

    for(let i = 0; i < numOfRounds; i++){
        for(let j = 0; j < numOfMatchesEachRound; j++){
            date = new Date(date.getTime());
            date.setTime(date.getTime() + twoHours);
            
            if (date.getHours() == 22 || (j % amountOfMatchesEachDay == 0 && j != 0)){//no team will play twicw a day. or past the hour 22:00.
                date.setDate(date.getDate() + 1);
                date.setHours(14);
                numOfDays -= 1;
            }

            dates.push(date);
        }
        date = new Date(date.getTime());
        date.setDate(date.getDate() + numOfDays);
        date.setHours(12);
        numOfDays = 7;
    }
    dates.shift()
    return dates;

}

async function checkIsValidMatch(matchId){
    return await matches_utils.checkIsValidMatch(matchId)
}

async function assignReferee(matchId, refereeId){
    try{
        await matches_utils.assignReferee(matchId, refereeId);
    }
    catch (error) {
        throw (error);
      }
}

exports.assignReferee = assignReferee
exports.checkIsValidMatch = checkIsValidMatch
exports.assignMatches = assignMatches
exports.checkSufficientTeams = checkSufficientTeams
exports.makePairs = makePairs
exports.makeDates = makeDates
exports.checkValidSeason = checkValidSeason