const express = require("express");
const expHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
// The require below ensures that passport.js runs and the auth strategies are defined
const passportSetup = require("./config/passport.js");
const passport = require ("passport");
const session = require("express-session");
const models = require("./models/index");
if(!process.env.DATABASE_URL) {
	//We are running on local host and must use the information in a file called
	// keys.js in the config directory (see the readme about how to create the
	// keys.js file).
	var keys = require("./config/keys");
}


// Checking the database for connection/errors
models.db.authenticate()
	.then(function() {
		console.log("Connected to database");
	})
	.catch(function(err) {
		console.log("Database Error: " + err);
	})


// Initialize the express variable for routes
const app = express();



// // Setting static folder for css and images
app.use(express.static(path.join(__dirname, "static")));


// Redirecting bootstrap and jquery files from node_modules directory to static
// Redirect bootstrap js
app.use("/static/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
// Redirect jquery js
app.use("/static/js", express.static(path.join(__dirname, "node_modules/jquery/dist")));
// Redirect bootstrap css
app.use("/static/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
// Redirect font-awesome css
app.use("/static/css", express.static(path.join(__dirname, "node_modules/font-awesome/css")));


// Middleware for bodyparser
app.use(bodyParser.urlencoded({extended: false}));

// Middleware to enagle sessions
app.use(session({
	secret: process.env.SESSION_SECRET || keys.sessionSecret.secret,
	maxAge: 24 * 60 * 60 * 1000,
	resave: false,
	saveUninitialized: true
	 }));
app.use(passport.initialize());
app.use(passport.session());





// Home route
app.get("/", function(request, response) {
	response.render("index", {
		user: request.user
	});
});


// Setting routes for rides
app.use("/rides", require("./routes/rides"));

// Setting routes for authorization
app.use("/auth", require("./routes/auth"));

// Setting routes for profile
app.use("/profile", require("./routes/profile"));

var hbs = expHandlebars.create({
	defaultLayout: 'main',
	helpers: {
		shortDate: function(myDate){
			// Ensures that myDate is of type date (myDate may enter this function as a string
			// in some instances).
			myDate = new Date(myDate)
			return myDate.toDateString();
		},
		shortTime: function(myTime){
			// Check if myTime is already formatted. If it does do nothing.
			if(myTime.match("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9] am|pm$")) {
  				return myTime;
			} else {
				var min = myTime.slice(3,5);
				var hour = parseInt(myTime.slice(0,2));
				if(hour == 0) {
					hour = 12;
					min+=" am";
				} else if (hour == 12) {
					min += " pm";
				} else if (hour>12){
					hour=hour-12;
					min+=" pm";
				}else{
					min+=" am";
				}
				return hour+":"+min;
			}
		},
		select: function(selected, options) {
			return options.fn(this).replace(
				new RegExp("value=\"" + selected + "\""),
				'$& selected="selected"'
				);
		},
	}
});

// Setting up the template engine
//app.engine("handlebars", expHandlebars({defaultLayout: "main"}));
app.engine('handlebars', hbs.engine);
app.set("view engine", "handlebars");

app.get('/', function (req, res, next) {
    res.render('rides', {
        showTitle: true,

        // Override `foo` helper only for this rendering.
        helpers: {
            foo: function () { return 'foo.'; }
        }
    });
});


const PORT = process.env.PORT || 5000;

models.db.sync().then(function() {
	app.listen(PORT, function() {
		console.log(`Server started on port ${PORT}`);
	});
});







