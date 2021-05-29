'use strict';
const
    expect = require('chai').expect,
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../routes.js'),
    mocha = require('mocha'),
    describe = mocha.describe,
    it = mocha.it;

chai.use(chaiHttp);

// Default userId
const userId = 1;

describe('user management operations', () => {

    describe("POST /user/register", () => {
        it('It should register a user', (done) => {
            const mockData = {
                name: 'Mahima Gupta',
                password: 'mahima',
                phone_number: '8588936316',
                address: 'rohini'
            };
            chai.request(server)
                .post("/user/register")
                .send(mockData)
                .end((err, response) => {
                    expect(response.status).to.equal(200);
                    expect(response.text).to.equal("User Signup Successful");
                    done();
                })
        });
    })


    describe("POST /user/signIn", () => {
        it('It should allow user to login user', (done) => {
            const mockData = {
                password: 'mahima',
                phone_number: '8588936316'
            };
            chai.request(server)
                .post("/user/signIn")
                .send(mockData)
                .end((err, response) => {
                    expect(response.status).to.equal(200);
                    expect(response.text).to.equal("Authentication Successful.");
                    done();
                })
        });
    })


    describe("GET user details /users/userId", () => {
        it('It should return the details of the user for a given id', (done) => {
            chai.request(server)
                .get(`/users/${userId}`)
                .end((err, response) => {
                    expect(response.status).to.equal(200)
                    expect(JSON.parse(response.text).phone_number).to.equal("8588936316")
                    done();
                })
        });
    })

    describe("POST submit new lead /leads/userId", () => {
        it('It should allows user to submit new lead', (done) => {
            const mockData = {
                name: 'Jay1',
                phone_number: '9191919190',
                address: 'USA'
            };
            chai.request(server)
                .post(`/leads/${userId}`)
                .send(mockData)
                .end((err, response) => {
                    console.log("res::", response);
                    expect(response.status).to.equal(200)
                    expect(response.text).to.equal("Lead submitted successfully!");
                    done();
                })
        });
    })

    describe("GET /users/userId/rewards Retrieve list of rewards received", () => {
        it('It should return a list of rewards per lead for a given id', (done) => {
            chai.request(server)
                .get(`/users/${userId}/rewards`)
                .end((err, response) => {
                    expect(response.status).to.equal(200)
                    expect(JSON.parse(response.text)).to.be.a("array");
                    done();
                })
        });
    })

    describe("GET /users/userId/leads Retrieve list of leads submitted", () => {
        it('It should return all the leads submitted by a user', (done) => {
            chai.request(server)
                .get(`/users/${userId}/leads`)
                .end((err, response) => {
                    expect(response.status).to.equal(200)
                    expect(JSON.parse(response.text)[0]).to.have.property("status");
                    done();
                })
        });
    })

    describe("GET /users/userId/rewards Retrieve list of leads submitted between two certain dates", () => {
        it('It should return all the leads submitted between two given dates', (done) => {
            chai.request(server)
                .get(`/users/${userId}/leads?startDate='2021-05-28'&endDate='2021-08-28'`)
                .end((err, response) => {
                    console.log("res::", response)
                    expect(response.status).to.equal(200)
                    expect(JSON.parse(response.text)).to.be.a("array");
                    done();
                })
        });
    })
});