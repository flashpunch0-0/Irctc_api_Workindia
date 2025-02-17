# IRCTC-ROLE-BASED-TICKET-BOOKING

this is a node.js api which allows users and admin to implemet role based functioning. This api provides adminchecks to prevent regular user from hitting admin functions

- web server - NodeJS/ ExpressJS <br>
- Database - PostgreSQL<br>
- ORM - Sequelize<br>

## DATABASE SCHEMAS

Tables<br>
-User, Train, Booking

- User<br>
  -username : String<br>
  -email: String<br>
  -password: String<br>
  -role: Enum("admin", "user")<br>
  -tokenVersion : default = 1;
  tokenVersion can be used to implement logout from all devices

- Train
  -train_num: String<br>
  -src : String<br>
  -dest : String<br>
  -availableSeats: int<br>

- Booking
  -booking_id: int<br>
  -username:String<br>
  -train_num :String<br>
  -booking_time: String<br>




## INSTALLATION AND RUNNING

-clone the repository<br>
-Run `npm install`<br>
-Run `nodemon server.js` or `node server.js`<br>
-JWT_SECRET_KEY and ADMIN_API_KEY is stored in .env file.<br>
-to generate a 32 bit key use `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` in cmd 

### Possible updates 
Logout function-  but what if the user logs in from multiple systems 
we can use tokenversion to prevent this. so when the user logsout we can increase the tokenversion which makes all the other tokens with oldertoken version as invalid


