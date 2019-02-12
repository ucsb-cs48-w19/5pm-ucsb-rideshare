const express = require("express");
const router = express.Router();
const passport = require("passport");
const authCheck = require("../authCheck");

router.get("/login", function(request, response) {
	response.render("login");
});

router.get("/logout", authCheck, function(request, response) {
	request.logout();
	response.redirect("/");
})

router.get("/facebook", passport.authenticate("facebook", {
	scope: ["email"]
}));

router.get("/facebook/callback", passport.authenticate("facebook"), function(request, response) {
	response.redirect("/profile");
});


module.exports = router;


