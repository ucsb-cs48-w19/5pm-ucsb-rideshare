const authCheck = function(request, response, next) {
	if(!request.user) {
		// If the user is not logged in
		response.redirect("/auth/login");
	} else {
		next();
	}
}


module.exports = authCheck;


