const request = require('supertest');
const app = require('../main')
var farUser = request.agent(app);
require("dotenv").config();

// *****************************************ACCEPTANCE TESTING - MATCHES ASSIGNMENT USE CASE 10 *******************************************************

describe("POST /far/matchAssignmentAlgorithm", () =>{

    describe("request body does not contain all args.", () => {

        test("login NOT a far user.", async () => {
            response = await farUser.post("/Login").send({
                username: 'danaKlim',
                password: 'dana123'
            });
            expect(response.statusCode).toBe(200);
        }, 30000)

        test("user does not have FAR privileges.", async () => {
            response = await farUser.post("/far/matchAssignmentAlgorithm").send({
                leagueId:271,
                season:'2017/2018',
                policy: {numOfRounds: 10}
            });
            expect(response.statusCode).toBe(401)
        }, 30000)
    })

    describe("request body does not contain all args. far user is authenticated", () => {

        test("login a far user.", async () => {
            response = await farUser.post("/Login").send({
                username: 'ladygaga',
                password: 'lady@56'
            });
            expect(response.statusCode).toBe(200);
        }, 30000)

        test("request body does not contain LEAGUEID. reponse status code of 400.", async () => {      
            response = await farUser.post("/far/matchAssignmentAlgorithm").send({
                season:'2017/2018',
                policy: {numOfRounds: 10}
            });
            expect(response.statusCode).toBe(400);
        }, 30000)

        test("request body does not contain policy.numOfRounds. reponse status code of 400.", async () => {
            response = await farUser.post("/far/matchAssignmentAlgorithm").send({
                leagueId:271,
                season:'2017/2018',
                policy: {}
            });
            expect(response.statusCode).toBe(400);
        }, 30000);    
    })

    describe("incorrect parameters in request boddy", () => {

        test("login a far user.", async () => {
            response = await farUser.post("/Login").send({
                username: 'ladygaga',
                password: 'lady@56'
            });
            expect(response.statusCode).toBe(200);
        }, 30000)

        test("request body dcontains a season that alrady exist in the system.. reponse status code of 409.", async () => {      
            response = await farUser.post("/far/matchAssignmentAlgorithm").send({
                leagueId:271,
                season:'2019/2020',
                policy: {numOfRounds: 10}
            });
            expect(response.statusCode).toBe(409);
        }, 30000)

        test("request body dcontains a league with less then 2 teams. reponse status code of 409.", async () => {      
            response = await farUser.post("/far/matchAssignmentAlgorithm").send({
                leagueId:100,
                season:'2021/2022',
                policy: {numOfRounds: 10}
            });
            expect(response.statusCode).toBe(409);
        }, 30000)
    })

    describe("correct request body, correct FAR userId", () => {

        test("login a far user.", async () => {
            response = await farUser.post("/Login").send({
                username: 'ladygaga',
                password: 'lady@56'
            });
            expect(response.statusCode).toBe(200);
        }, 30000)})

        test("success. reponse status code of 200.", async () => {      
            response = await farUser.post("/far/matchAssignmentAlgorithm").send({
                leagueId:271,
                season:'2021/2022',
                policy: {numOfRounds: 5}
            });
            expect(response.statusCode).toBe(200);
        }, 30000)

})

// *****************************************ACCEPTANCE TESTING - REFEREES ASSIGNMENT USE CASE 5 *******************************************************

///////// IMPORTANT ////////////
// TODO - clean the DB before running the tests
describe("POST /far/addReferee", () =>{ 

    test("login as a far.", async () => {
        response = await farUser.post("/Login").send({
            username: 'ladygaga',
            password: 'lady@56'
        });
        expect(response.statusCode).toBe(200);
    }, 30000)

    test("valid request structure", async () => {
        response = await farUser.post("/far/addReferee").send({
            username:"nabut",
            firstname:"nir",
            lastname:"klinger",
            country:"israel",
            password:"loveGuy",
            email:"nirKling@gmail.com",
            image_url:"null",
            qualification:"basic"
        });
        expect(response.statusCode).toBe(200)
    }, 30000)

    test("invalid request structure", async () => {
        response = await farUser.post("/far/addReferee").send({
            user:"nabut",
            firstname:"nir",
            lastname:"klinger",
            country:"israel",
            password:"loveGuy",
            email:"nirKling@gmail.com",
            image_url:"null",
            qualification:"basic"
        });
        expect(response.statusCode).toBe(400)
    }, 30000)

    test("taken username", async () => {
        response = await farUser.post("/far/addReferee").send({
            username:"nabut",
            firstname:"roy",
            lastname:"dor",
            country:"israel",
            password:"loveGuy",
            email:"nirKling@gmail.com",
            image_url:"null",
            qualification:"basic"
        });
        expect(response.statusCode).toBe(409)
    }, 30000)

    test("logout.", async () => {
        response = await farUser.post("/Logout").send();
        expect(response.statusCode).toBe(200);
    }, 30000)

    test("not a FAR", async () => {
        response = await farUser.post("/far/addReferee").send({
            username:"nabut",
            firstname:"roy",
            lastname:"dor",
            country:"israel",
            password:"loveGuy",
            email:"nirKling@gmail.com",
            image_url:"null",
            qualification:"basic"
        });
        expect(response.statusCode).toBe(401)
    }, 30000)
})

// TODO - check AND CHANGE refereeId before running the tests
describe("POST /far/scheduleReferee", () =>{ 

    test("login as a far.", async () => {
        response = await farUser.post("/Login").send({
            username: 'ladygaga',
            password: 'lady@56'
        });
        expect(response.statusCode).toBe(200);
    }, 30000)
    test("valid request structure", async () => {
        response = await farUser.post("/far/scheduleReferee").send({
            "refereeId": 45,
            "matchId": 70
        });
        expect(response.statusCode).toBe(200)
    }, 30000)
})