var assert = require('assert');
const Sequelize = require('sequelize');
var sortingFunc

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
     
describe('Testing sorting method', function() {
	it('should sort two different items', function(){
		const sortingFunctions = require("../sorting.js");
		var list=[];
		var first = '01 Jan 2018 00:00:00 GMT';
		var second = '04 Dec 2019 00:12:00 GMT';
		var firstdate={date: first};
		var seconddate={date: second};
		list.push(firstdate);
		list.push(seconddate);
		list.sort(sortingFunctions.sortByDateTimePrice);
		assert.equal(0,list.indexOf(firstdate));
	});
});