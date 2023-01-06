/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const mocha = require('mocha');
const jwt = require('jsonwebtoken');

const { describe } = mocha;
const chai = require('chai');
const chaiHttp = require('chai-http');
const base = require('./src/config/mongoConnection');

base.start();
const server = require('./src/server/server');

const { expect } = chai;

chai.use(chaiHttp);
const accessToken = jwt.sign({ password: '$2b$10$1JRotamVdfr9Txudy/bhnOr2aSO8gdBH0QarOTNijm6th0nQrfkS6' }, 'jfjfjfjfjfjfjfuuuuu', { expiresIn: '180000s' });

describe('/GET tasks', () => {
    it('it should GET all the tasks', (done) => {
        chai.request(server)
            .get('/v1/tasks/all')
            .auth(accessToken, { type: 'bearer' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.be.not.equal(1);
                done();
            });
    });
});
describe('/POST task', () => {
    it('it should  POST a task ', (done) => {
        const task = {
            title: 'Ira',
            assignee: '639cdc4585ae5fa4d627dfda',
            estimatedTime: 150,
            createdBy: 'UUU',
            description: 'jgshd',
        };

        chai.request(server)
            .post('/v1/task')
            .auth(accessToken, { type: 'bearer' })
            .send(task)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });
});
describe('/POST task without field', () => {
    it('it should POST a task ', (done) => {
        const task = {
            estimatedTime: '20',
            assignee: '639cdc4585ae5fa4d627dfda',
            createBy: 'I',
            description: 'Post task',
        };

        chai.request(server)
            .post('/v1/task')
            .auth(accessToken, { type: 'bearer' })
            .send(task)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('string');
                expect(res.body).to.be.equal('error');
                done();
            });
    });
});

describe('/Patch/:id task', () => {
    it('it should patch a task by the given id', (done) => {
        const change = {
            date: '40',
            _id: '63a5bb64f5b2c2e740032bbc',
        };

        chai.request(server)
            .patch('/v1/task/:id')
            .auth(accessToken, { type: 'bearer' })
            .send(change)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });
});
describe('/Get/ task', () => {
    it('it should patch a task by the given id', (done) => {
        chai.request(server)
            .get('/v1/task')
            .auth(accessToken, { type: 'bearer' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(Object.keys(res.body).length).to.be.not.equal(0);
                done();
            });
    });
});