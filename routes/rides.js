const express = require("express");
const router = express.Router();
const models = require("../models/index.js");
const authCheck = require("../authCheck.js");
const Sequelize = require("sequelize");
const sortingFunctions = require("../sorting.js");

// Since we're using router the / refers to /rides
router.get("/", function(request, response) {
	models.Ride.findAll({raw: true}) 
		.then(function(rides) {

			rides.sort(sortingFunctions.sortByDateTimePrice);

			response.render("rides", {
				rides:rides,
				user: request.user
			});
		})
		.catch(function(err) {
			console.log(err);
		})
});

router.get("/add", authCheck, function(request, response) {
	response.render("add_rides", {
		user: request.user,
		contact_email:request.user.email,
		name:request.user.first_name,
	});
});

router.post("/add", authCheck, function(request, response) {
	let {name, contact_email, origin, destination, date, time, number_of_seats, price, message, area, to_from_ucsb} = request.body
	let errors = [];


	if(!name) {
		errors.push({text: "Please add a name"});
	}
	if(!contact_email) {
		errors.push({text: "Please add an email"})
	}
	if(!origin) {
		errors.push({text: "Please add a start location"});
	}
	if(!destination) {
		errors.push({text: "Please add a destination"});
	}
	if(!date) {
		errors.push({text: "Please add a date"});
	}
	if(!time) {
		errors.push({text: "Please add a time"});
	}
	if(!number_of_seats) {
		errors.push({text: "Please add the number of seats"});
	}
	if(!price) {
		errors.push({text: "Please add the price"});
	}
	//change each of these to lowercase before adding to database so that they are easier to search for
	//destination = destination.toLowerCase();
	//origin = origin.toLowerCase();
	// Might be a good idea to also add type checks too. Especially for
	// dates and times.
	if(errors.length > 0) {
		response.render("add_rides", {
			user:request.user,
			errors:errors,
			name:name,
			contact_email:contact_email,
			origin:origin,
			destination:destination,
			date:date,
			time:time,
			number_of_seats:number_of_seats,
			price:price, 
			message:message,
			area:area,
			to_from_ucsb:to_from_ucsb,
		});
	} else {
		models.User.findOne({where: {user_id:request.user.user_id}})
			.then(function(user) {
				// We can use the user we just found to make a new Ride and because of the associations
				// set up in index.js the primaryKey of the user will be pointed to by the foreign key 
				// of the new ride automatically.
				user.createRide({
					name:name,
					contact_email:contact_email,
					origin:origin,
					destination:destination,
					date:date,
					time:time,
					number_of_seats:number_of_seats,
					price:price, 
					message:message,
					area:area,
					to_from_ucsb:to_from_ucsb,
				})
				// Redirects don't need the request.user passed in but all renders do.
				response.redirect("/rides");
		})
		.catch(function(err) {
			console.log(err);
		})
	}

});


router.get("/my_rides", authCheck, function(request, response) {
	models.Ride.findAll( {where: {userId: request.user.id}}, {raw:true})
	.then(function(rides) {

		rides.sort(sortingFunctions.sortByDateTimePrice);

		response.render("my_rides", {
			user:request.user,
			rides:rides
		})
	})
	.catch(function(err) {
		console.log(err);
	})
});


router.get("/search", function(request, response) {
	//set term to lower for searching properly
	//term= term.toLowerCase();
	let {term, filter} = request.query;
	if(!filter)
	{
	models.Ride.findAll( {where: {destination: { [Sequelize.Op.iLike]: "%" + term + "%" }}})
	.then(function(rides) {
		response.render("rides", {
			user:request.user,
			rides:rides,
		});
	})
	.catch(function(err) {
		console.log(err);
	})
	}
	else
	{
		let {filterdate, filterprice,filtertime,filterarea,to_from_ucsb,filterspecific}=request.query;
		var condition={};
		if(to_from_ucsb!='Choose')
		{
			condition.to_from_ucsb=to_from_ucsb;
			if(to_from_ucsb=='from')
			{
				if(filterspecific)
					condition.destination={[Sequelize.Op.iLike]:filterspecific};
				condition.origin={[Sequelize.Op.iLike]: 'UCSB'};
			}
			else
			{
				if(filterspecific)
					condition.origin={[Sequelize.Op.iLike]:filterspecific};
				condition.destination={[Sequelize.Op.iLike]:'UCSB'};
			}
		}
		else if(filterspecific)
			condition[Sequelize.Op.or]=[{origin:{[Sequelize.Op.iLike]:filterspecific}},{destination:{[Sequelize.Op.iLike]:filterspecific}}];
		if(filterarea!='Choose')
			condition.area=filterarea;
		
		//condition.destination={ [Sequelize.Op.like]: "%" + term + "%" };
		//condition.origin={ [Sequelize.Op.like]: "%" + filterstart + "%" };
		//if(filterdestination)
			//condition.destination={[Sequelize.Op.iLike]: "%" + filterdestination + "%"}
		if(filterdate)
			condition.date={[Sequelize.Op.lte]: filterdate}
		if(filterprice)
			condition.price={[Sequelize.Op.lte]: filterprice}
		if(filtertime)
			condition.time={[Sequelize.Op.lte]: filtertime}
		
		
		
		//console.log(condition);
		//models.Ride.findAll({raw:true}).then(rides=>console.log(rides));
		models.Ride.findAll({where: condition, raw: true})
		.then(rides=>{
			rides.sort(sortingFunctions.sortByDateTimePrice);
			
			response.render("rides",{
				user:request.user,
				rides:rides,
			});
		});
	}
});


router.get("/edit/:id", authCheck, function(request, response) {

	// request.params.id refers to the id of the Ride not the user.
	models.Ride.findByPk(request.params.id)
	.then(function(ride) {
		response.render("edit_ride", {
			user:request.user,
			id:ride.id,
			name:ride.name,
			contact_email:ride.contact_email,
			origin:ride.origin,
			destination:ride.destination,
			date:ride.date,
			time:ride.time,
			number_of_seats:ride.number_of_seats,
			price:ride.price, 
			message:ride.message,
			area:ride.area,
			to_from_ucsb:ride.to_from_ucsb,
		});
	})
	.catch(function(err) {
		console.log(err);
	})

});


router.post("/edit/:id", authCheck, function(request, response) {

	let {id, name, contact_email, origin, destination, date, time, number_of_seats, price, message, area, to_from_ucsb} = request.body
	let errors = [];

	if(!name) {
		errors.push({text: "Please add a name"});
	}
	if(!contact_email) {
		errors.push({text: "Please add an email"})
	}
	if(!origin) {
		errors.push({text: "Please add a start location"});
	}
	if(!destination) {
		errors.push({text: "Please add a destination"});
	}
	if(!date) {
		errors.push({text: "Please add a date"});
	}
	if(!time) {
		errors.push({text: "Please add a time"});
	}
	if(!number_of_seats) {
		errors.push({text: "Please add the number of seats"});
	}
	if(!price) {
		errors.push({text: "Please add the price"});
	}
	// Might be a good idea to also add type checks too. Especially for
	// dates and times.
	if(errors.length > 0) {
		response.render("edit_ride", {
			user:request.user,
			errors:errors,
			id:request.params.id,
			name:name,
			contact_email:contact_email,
			origin:origin,
			destination:destination,
			date:date,
			time:time,
			number_of_seats:number_of_seats,
			price:price, 
			message:message,
			area:area,
			to_from_ucsb:to_from_ucsb,
		});
	} else {
		models.Ride.update({
			name:name,
			contact_email:contact_email,
			origin:origin,
			destination:destination,
			date:date,
			time:time,
			number_of_seats:number_of_seats,
			price:price, 
			message:message,
			area:area,
			to_from_ucsb:to_from_ucsb,
		}, {where: {id:request.params.id}})
		.then(function(ride) {
			response.redirect("/rides/my_rides");
		})
		.catch(function(err) {
			console.log(err);
		})
	}
});



router.get("/delete/:id", authCheck, function(request, response) {
	response.render("delete_verification", {
		user:request.user,
		id:request.params.id,
	});
});


router.delete("/delete/:id", authCheck, function(request, response){

	models.Ride.destroy( {where: {id:request.params.id}})
	.then(function() {
		// send 200 status
		response.send("Deletion was a success");
	})
	.catch(function(err) {
		console.log(err);
	})
});




module.exports = router;




