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
	// Scope automatically includes profile info. email is extra
	scope:['public_profile', 'email']
}));

router.get("/facebook/callback", passport.authenticate("facebook", {failureRedirect: "/"}), function(request, response) {
	response.redirect("/profile");
});

router.get("/google", passport.authenticate("google", {
	scope: ["profile", "email"]
}));

router.get("/google/callback", passport.authenticate("google", {failureRedirect: "/"}), function(request, response) {
	response.redirect("/profile");
});

// Privacy policy page (required by facebook for login) 
router.get("/privacy-policy", function(request, response) {
	response.render("privacy-policy");
});



module.exports = router;


