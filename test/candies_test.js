var should = require('chai').should(),
expect = require('chai').expect,
supertest = require('supertest'),
api = supertest('http://localhost:3000');

describe('GET /candies', function(){
  it('should return a 200 response', function(done){
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('should return an array', function(done){
    api.get('/candies')
    .set('Accept', 'application/json')
    .end(function(err, response){
      expect(response.body).to.be.an('array');
      done();
    });
  });
  it("should return an object that has a field called 'name'", function(done){
    api.get('/candies').set('Accept', 'application/json')
    .end(function(err, response){
      expect(response.body[0]).to.have.property('name');
      done();
    });
  });
});
