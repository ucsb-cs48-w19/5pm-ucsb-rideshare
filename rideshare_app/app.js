const express = require("express");
const expHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

// Initialize the express variable for routes
const app = express();

// Setting up the template engine
app.engine("handlebars", expHandlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// // Setting static folder for css and images
app.use(express.static(path.join(__dirname, "static")));

// Middleware for bodyparser
app.use(bodyParser.urlencoded({extended: false}));


// Home route
app.get("/", function(request, response) {
	response.render("index");
});


// Setting routes for rides
app.use("/rides", require("./routes/rides"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
	console.log(`Server started on port ${PORT}`);
});