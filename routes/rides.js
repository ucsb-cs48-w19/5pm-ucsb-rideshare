const express = require("express");
const router = express.Router();
const models = require("../models/index.js");
const authCheck = require("../authCheck.js");
const Sequelize = require("sequelize");

// Since we're using router the / refers to /rides
router.get("/", function(request, response) {
	models.Ride.findAll() 
		.then(function(rides) {
			response.render("rides", {
				rides:rides,
				user: request.user
			});
		})
		.catch(function(err) {
			console.log(err);
		})
});

router.get("/add", authCheck, function(request, response) {
	response.render("add_rides", {
		user: request.user,
		contact_email:request.user.email,
		name:request.user.first_name,
	});
});

router.post("/add", authCheck, function(request, response) {
	let {name, contact_email, origin, destination, date, time, number_of_seats, price, message} = request.body
	let errors = [];

	if(!name) {
		errors.push({text: "Please add a name"});
	}
	if(!contact_email) {
		errors.push({text: "Please add an email"})
	}
	if(!origin) {
		errors.push({text: "Please add a start location"});
	}
	if(!destination) {
		errors.push({text: "Please add a destination"});
	}
	if(!date) {
		errors.push({text: "Please add a date"});
	}
	if(!time) {
		errors.push({text: "Please add a time"});
	}
	if(!number_of_seats) {
		errors.push({text: "Please add the number of seats"});
	}
	if(!price) {
		errors.push({text: "Please add the price"});
	}
	// Might be a good idea to also add type checks too. Especially for
	// dates and times.
	if(errors.length > 0) {
		response.render("add_rides", {
			user:request.user,
			errors:errors,
			name:name,
			contact_email:contact_email,
			origin:origin,
			destination:destination,
			date:date,
			time:time,
			number_of_seats:number_of_seats,
			price:price, 
			message:message
		});
	} else {
		models.Ride.create({
			name:name,
			contact_email:contact_email,
			origin:origin,
			destination:destination,
			date:date,
			time:time,
			number_of_seats:number_of_seats,
			price:price, 
			message:message
		})
		.then(function() {
			// Redirects don't need the request.user passed in but all renders do.
			response.redirect("/rides");
		})
		.catch(function(err) {
			console.log(err);
		})
	}

});


router.get("/my_rides", authCheck, function(request, response) {
	response.render("my_rides", {
		user:request.user,
	})
});


router.get("/search", function(request, response) {

	let {term} = request.query

	models.Ride.findAll( {where: {destination: { [Sequelize.Op.like]: "%" + term + "%" }}})
	.then(function(rides) {
		response.render("rides", {
			user:request.user,
			rides:rides,
		});
	})
	.catch(function(err) {
		console.log(err);
	})
});










module.exports = router;
