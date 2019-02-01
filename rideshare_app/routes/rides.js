const express = require("express");
const router = express.Router();

// Since we're using router the / refers to /rides
router.get("/", function(request, response) {
	response.render("rides");
});


module.exports = router;