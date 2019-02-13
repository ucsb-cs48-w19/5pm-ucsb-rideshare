const express = require("express");
const router = express.Router();
const models = require("../models/index.js");
const authCheck = require("../authCheck.js");

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
		user: request.user
	});
});

router.post("/add", authCheck, function(request, response) {
	let {name, contact_email, origin, destination, date, time, number_of_seats, price, message} = request.body
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

});


module.exports = router;
