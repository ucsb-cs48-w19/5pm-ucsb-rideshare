const express = require("express");
const router = express.Router();

// Since we're using router the / refers to /rides
router.get("/", function(request, response) {
	response.render("rides");
});

router.get("/add", function(request, response) {
	response.render("add_rides");
});

router.post("/add", function(request, response) {
	// Add code to handle POST request here. 
	console.log("Database isn't set up yet");
	response.redirect("/rides");
});


module.exports = router;
