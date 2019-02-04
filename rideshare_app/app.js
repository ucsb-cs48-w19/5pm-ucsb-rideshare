const express = require("express");
const expHandlebars = require("express-handlebars");
const path = require("path");

// Initialize the express variable for routes
const app = express();

// Setting up the template engine
app.engine("handlebars", expHandlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// // Setting static folder for css and images
app.use(express.static(path.join(__dirname, "static")));


// Home route
app.get("/", function(request, response) {
	response.render("index");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
	console.log(`Server started on port ${PORT}`);
});