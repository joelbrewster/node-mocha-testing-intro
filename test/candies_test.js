// Super test is api
// chai is expect
var should = require('chai').should(),
expect = require('chai').expect,
supertest = require('supertest'),
api = supertest('http://localhost:3000');

describe('GET /candies', function(){
  it('Should return a 200 response', function(done){
    api
    .get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('Should return an array', function(done){
    api
    .get('/candies')
    .set('Accept', 'application/json')
    .end(function(err, response){
      expect(response.body).to.be.an('array');
      done();
    });
  });
  it("should return an object that has a field called 'name'", function(done){
    api
    .get('/candies').set('Accept', 'application/json')
    .end(function(err, response){
      expect(response.body[0]).to.have.property('name');
      done();
    });
  });
});

describe('POST /candies', function(){
  before(function(done){
    api
    .post('/candies')
    .set('Accept', 'application/json')
    .send({
      id: 5,
      name: 'Lollipoop',
      color: 'red'
      }).end(done);
    });

  it('Should add a candy object to the collection and return it', function(done){
    api
    .get('/candies').set('Accept', 'application/json')
    .end(function(err, response){
      expect(response.body.length).to.equal(5);
      done();
    });
  });
});



// Write a test that make sure the object returned when you call show with a specific ID contains the right fields.

describe('POST /candies/:id', function(){
    it("Should return the object with a specific ID that contains the right fields.", function(done){
      api
      .get('/candies/2').set('Accept', 'application/json')
      .end(function(err, response){
      expect(response.body.name).to.equal('Pez');
      done();
    });
  });
})

// Write a test that ensure an object is deleted from the array candies when you call delete.

// Write a test that ensure a property is updated when you call PUT /candies/:id
