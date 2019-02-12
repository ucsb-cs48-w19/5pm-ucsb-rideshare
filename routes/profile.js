const express = require("express");
const router = express.Router();
const authCheck = require("../authCheck");

router.get("/", authCheck, function(request, response) {
	response.render("profile", {
		user:request.user
	});
});



module.exports = router;



