import * as mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Mockgoose } from 'mockgoose';
let mockgoose = new Mockgoose(mongoose);
import configDatabase from '../src/config/database';

let should = chai.should();
chai.use(chaiHttp);

import '../src/app';

describe("Auth", () => {

  describe("Get token fails", () => {
    it('it should retorn invalid token and 401 error', (done) => {
      chai.request('localhost:3000')
        .get('/api/v1/auth')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it return invalid login', (done) => {
      chai.request('localhost:3000')
        .post('/api/v1/auth')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe("Get token sucess", () => {
    let user = {
      mobile: "1111111111",
      password: "batata"
    }

    it('it should retorn valid token and 200 code', (done) => {
      chai.request('localhost:3000')
        .post('/api/v1/auth')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          done();
        });
    });
  });

});
