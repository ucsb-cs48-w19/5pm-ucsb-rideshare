const express = require("express");
const router = express.Router();
const db = require("../config/database.js");
const Ride = require("../models/Ride.js");

// Since we're using router the / refers to /rides
router.get("/", function(request, response) {
	Ride.findAll() 
		.then(function(rides) {
			response.render("rides", {
				rides:rides
			});
		})
		.catch(function(err) {
			console.log(err);
		})
});

router.get("/add", function(request, response) {
	response.render("add_rides");
});

router.post("/add", function(request, response) {
	let {name, contact_email, origin, destination, date, time, number_of_seats, price, message} = request.body
	Ride.create({
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
		response.redirect("/rides");
	})
	.catch(function(err) {
		console.log(err);
	})

});


module.exports = router;
