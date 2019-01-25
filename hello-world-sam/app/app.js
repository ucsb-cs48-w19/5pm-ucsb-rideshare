// Import express module. 
const express = require("express");
const path = require("path");

// Create the express variable so that routes can be made.   
const app = express();

// Loading views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Creating a route for the homepage 
app.get("/", function(request, response) {
	response.render("index.pug", {
		message: "Hello World"
	});
});

// Start the server
app.listen(3000, function() {
	console.log("Server listening on port 3000");
});