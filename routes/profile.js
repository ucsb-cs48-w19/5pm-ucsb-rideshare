const express = require("express");
const router = express.Router();
const authCheck = require("../authCheck");
const models = require("../models/index.js");

router.get("/", authCheck, function(request, response) {
		response.render("profile", {
			user:request.user,
		});
});


module.exports = router;



