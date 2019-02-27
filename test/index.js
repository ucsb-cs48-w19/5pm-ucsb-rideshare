var assert = require('assert');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('travis_ci_test','postgres',' ',{
	dialect: 'postgres'
})

describe('HelloWorld Module', function() {
  it('should return -1 when "Hello" is missing', function() {
    assert.equal(-1, "Hallo World".indexOf("Hello"));
  });
  it('should return 0 when sentence starts with Hello', function() {
    assert.equal(0, "Hello World, how are you?".indexOf("Hello"));
  });
});

describe('Connect to database', function() {
  it('should connect successfully', function(done){
	 sequelize.authenticate().then(()=>done()).catch(err=>done(err));
  });
});
     
