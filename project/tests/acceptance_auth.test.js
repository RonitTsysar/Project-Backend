const request = require('supertest');
const app = require('../main')
var user = request.agent('http://localhost:3000');
require("dotenv").config();


// *****************************************ACCEPTANCE TESTING - MATCHES ASSIGNMENT USE CASE 2 - LOGIN *******************************************************

describe("POST /Login", () =>{

    describe("Good Login request", () => {

        test("login a registered user.", async () => {
            response = await user.post("/Login").send({
                username: 'danaKlim',
                password: 'dana123'
            });
            expect(response.statusCode).toBe(200);
        }, 30000)
    })

    describe("request body contains bad params", () => {

        test("login a registered user - mistake in username param", async () => {
            response = await user.post("/Login").send({
                userName: 'danaKlim',
                password: 'dana123'
            });
            expect(response.statusCode).toBe(400);
        }, 30000)

        
        test("login a registered user - mistake in password param", async () => {
            response = await user.post("/Login").send({
                username: 'danaKlim',
                pass: 'dana123'
            });
            expect(response.statusCode).toBe(400);
        }, 30000)
    })

    describe("Failed Authentication", () => {

        test("Bad Login - wrong username", async () => {
            response = await user.post("/Login").send({
                username: 'danaKlimenko',
                password: 'dana123'
            });
            expect(response.statusCode).toBe(401);
        }, 30000)

        
        test("Bad Login - wrong password", async () => {
            response = await user.post("/Login").send({
                username: 'danaKlim',
                password: 'dana1234'
            });
            expect(response.statusCode).toBe(401);
        }, 30000)
    })
})