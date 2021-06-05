const request = require('supertest');
const app = require('../main')
var farUser = request.agent('http://localhost:3000');
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

        test("user does not have FAR privileges. reponse status code of 500", async () => {
            response = await farUser.post("/far/matchAssignmentAlgorithm").send({
                leagueId:217,
                season:'2017/2018',
                policy: {numOfRounds: 10}
            });
            expect(response.statusCode).toBe(500)
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
                leagueId:217,
                season:'2017/2018',
                policy: {}
            });
            expect(response.statusCode).toBe(400);
        }, 30000)
    
})
})