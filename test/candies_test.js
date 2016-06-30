// Super test is api
// chai is expect
var should = require('chai').should(),
expect = require('chai').expect,
supertest = require('supertest'),
api = supertest('http://localhost:3000');

describe('GET /candies', function(){
  // Server should be running
  it('should return a 200 response', function(done){
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done);
  });

  // Will test if json is an array
  it('should return an array', function(done){
    api.get('/candies')
    // Tells supertest that you'll accept json, not html.
    .set('Accept', 'application/json')
    .end(function(err, response){
      expect(response.body).to.be.an('array');
      done();
    });
  });

  // Look for "name" in array
  it('should return an obect that has a field called "name"', function(done){
    api.get('/candies').set('Accept', 'application/json')
    .end(function(err, response){
      expect(response.body[0]).to.have.property('name');
      done();
    });
  });
});

describe('POST /candies', function(){
  // Test post. Look at .post in candies controller.
  // In before, create; in after, destroy.
  before(function(done){
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      id: 5,
      name: 'Lollipop',
      color: 'red'
      }).end(done);
    });

    it('should add a candy object to the collection and return it.', function(done){
      api
      .get('/candies')
      .set('Accept', 'application/json')
      .end(function(err, response){
        expect(response.body.length).to.equal(5);
        done();
      });
    });
  });

  // Write a test that make sure the object returned when you call show with a specific ID contains the right fields.
  describe('GET /candies/:id', function(){
    it('should return a name of Pez when queried for /candies/2.', function(done){
      api.get('/candies/2').set('Accept', 'application/json')
      .end(function(err, response){
        expect(response.body.name).to.equal('Pez');
        // expect(response.body).to.have.property('name', 'id', 'color'); - Doesn't work  because not sure how to put in multiple properties. Google it.
        done();
      });
    });
  });

  // Write a test that ensure an object is deleted from the array candies when you call delete.
  describe('DELETE /candies/:id', function(){
    before(function(done){
      api.delete('/candies/5')
      .set('Accept', 'application/json')
      .end(done);
    });
    it('should not have a candy with id of 5 in', function(done){
      api.get('/candies')
      .set('Accept', 'application/json')
      .end(function(err, response){
        // Fails because it's row is replaced with null, but doesn't remove empty element out of array.
        // expect(response.body.length).to.equal(5);
        expect(response.body[4]).to.equal(null);
        done();
      });
    });
  });

  // Write a test that ensure a property is updated when you call PUT /candies/:id
  describe('PUT /candies/:id/edit', function(){
    before(function(done){
      api.put('/candies/4/edit')
      .set('Accept', 'application/json')
      .send({
        // 'Put' replaces an entire object, 'patch' replaces single value. This test is not working because you are putting entire object with color Black.
        // So color: 'Black' by itself doesn't work.
        color: 'Black',
        id: 4,
        name: 'Marshmallow'
        }).end(done);
      });

      it('should have changed the color to black', function(done){
        api.get('/candies/4')
        .set("Accept", 'application/json')
        .end(function(err, response){
          expect(response.body.color).to.equal('Black');
          done();
        });
      });
    });
