# 5pm-ucsb-rideshare 
[![Build Status](https://travis-ci.org/ucsb-cs48-w19/5pm-ucsb-rideshare.svg?branch=master)](https://travis-ci.org/ucsb-cs48-w19/5pm-ucsb-rideshare)


### UCSB RIDESHARE
An app to help UCSB students coordinate carpools. 

### Minimum Viable Product
* account for each user
* users can: 
    1. post rides with 
        * departure location
        * departure time/date
        * destination
        * cost
        * contact information     
    2. see all current rides in a list
    
### Additional information about the project
An app dedicated to facilitating shared rides and carpools as painlessly as possible. Drivers can post rides with a user friendly and flexible form, and riders can quickly find rides that suit their needs with a filtered search! Designed for those who are tired of scrolling through endless facebook posts in search of a ride that suits their needs. 

### Installation Requirements
User must have the most current version of [node.js](https://nodejs.org/en/) and [postgreSQL](https://www.postgresql.org) to run locally. 

### Installation Steps
* Fork the repo
* Open a terminal window and navigate to the root of the repo
* install dependencies ```npm install```

To run the app on localhost the user will also need to navigate to the `config` directory and create a file named `keys.js.` Copy and paste the following template into the newly created `keys.js` file:
```   
const keys = {
	facebook: {
		clientID: "<client id for facebook oauth>",
		clientSecret: "<client secret for facebook oauth>",
		callbackURL: "http://localhost:5000/auth/facebook/callback"
	},
	google: {
		clientID: "<client id for google oauth>",
		clientSecret: "<client secret for google oauth>",
		callbackURL: "http://localhost:5000/auth/google/callback"
	},
	localdb: {
		database: “<name of your database>”,
		username: “<username for your database>”,
		password: “<your database password>”
	},
	sessionSecret: {
		secret: “<a random string of characters of your choosing>“
	}
};

module.exports = keys;
```
All fields in the `keys.js` template wrapped in <> brackets must be replaced with appropriate values. <br> 
* To generate valid Oauth client IDs and client secrets for the `facebook` and `google` fields the user must go to [facebook](https://developers.facebook.com/docs/facebook-login/) and [google's](https://developers.google.com) developer websites and follow the required steps. When generating these values the user will also be prompted to create callback URLs. For this step you must use the callback URLs specified above in the `keys.js` template. 
* For the `database` field the user must create a local postgreSQL database on their machine and provide the required values.
* For the `sessionSecret` field the user can use any random string of their choice for the value of `secret`.

Once the `keys.js` file is completed the app is ready to run on local host. <br>
Type the following line into the terminal: ```npm start``` <br>
The app is now running on localhost:5000. <br> 
The app can also be accessed at https://ucsb-rideshare-w19.herokuapp.com/

### Functionality
The main functionality of this webapp is to provide UCSB students with a way to arrange carpools. From the homepage of the app if a user wants to see a list of available rides a they can click on the "rides" button in the navbar located at the top of the screen. This page contains a list of all available rides along with information such as the destination, pickup time, pickup date and a link where users can send an email to the person offering the ride. To add a ride users must be logged in. To login a user can click on the "login" button in the navbar. They will be redirected to a page prompting them to login using either their facebook or gmail account. Once the user is logged in they can click on the "Add Ride" button in the navbar which will send them to a page that contains a form to be filled out. Once the form is filled out and submitted the new ride will appear in the list on the "Rides" page. When the user is finished the can click the "Logout" button in the navbar to logout. While logged in the user can also navigate to their profile page by clicking on "Profile" in the navbar. The user's profile page contains information about the users account. From this page the user can edit or delete their posts by clicking on the "My rides" button where they will be redirected to a page that displays all of the rides they've posted. Each post has a working "delete" and "edit" button.

### Known Problems
No known issues.

### Fork it & contribute! 
Create your feature branch: git checkout -b my-new-feature
Commit your changes: git commit -am 'Add some feature'
Push to the branch: git push origin my-new-feature
Submit a pull request :D

### License
see [LICENSE](LICENSE)
    
