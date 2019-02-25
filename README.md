# 5pm-ucsb-rideshare 
[![Build Status](https://travis-ci.com/ucsb-cs48-w19/5pm-ucsb-rideshare.svg?branch=master)](https://travis-ci.com/ucsb-cs48-w19/5pm-ucsb-rideshare)

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
Must have most current version of [https://nodejs.org/en/node.js](node.js) and [https://www.postgresql.org/ftp/pgadmin/pgadmin4/v4.1/macos/postgreSQL](postgreSQL) to run locally. 

### Installation Steps
To install node.js go to nodejs.org and follow the website's installation instructions. <br>
After forking the repo open a terminal window, navigate to the root of the repo and type "npm install." <br>
To run the app on localhost the user will also need to navigate to the "config" directory and create a file named "keys.js." Copy and paste the following snippet of code into the newly created file.
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
All fields contained in <> brackets should be replaced with appropriate values. <br> 
To generate valid Oauth client IDs and client secrets for the "facebook" and "google" fields the user should go to facebook and google's developer websites and follow the specified steps. While generating these values you will also be prompted to create callback URLs. For this step you must use the callback URLs specified above. 
For the "database" field the user should create a local database on their machine and provide the required values.
For the "sessionSecret" field the user can use any random string of their choice for the value of "secret". <br>
Once the "keys.js" file is completed the app is ready to run on local host. Type the following line into the terminal: npm run dev <br>
The app is now running on localhost:5000. <br> 
The app can also be accessed from https://ucsb-rideshare-w19.herokuapp.com/

### Functionality
The main functionaly of this webapp is to provide students with a way to arrange carpools. To see a list of available rides a user can click on the "rides" button in the navbar located at the top of the screen. This page contains a list of all available rides along with information such as the destination, pickup time, pickup date and a link where users can send the individual offering the ride an email. To add a ride users must be logged in. To login a user can simply click on the "login" button in the navbar. They will be redirected to a page propting them to login using either their facebook or gmail account. Once the user is logged in they can click on the "Add Ride" button in the navbar which will send them to a page that contains a form. Once the form is filled out and submitted the new ride will appear in the list on the "Rides" page. When the user is finished the can click the "Logout" button in the navbar to logout. While logged in the user can also navigate to a profile page by clicking "Profile" in the navbar. The user's profile page contains information about the users account. 

### Known Problems
No known issues.

### Fork it & contribute! 
Create your feature branch: git checkout -b my-new-feature
Commit your changes: git commit -am 'Add some feature'
Push to the branch: git push origin my-new-feature
Submit a pull request :D

### License
see [LICENSE](LICENSE)
    
