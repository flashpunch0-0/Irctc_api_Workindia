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

## API ROUTES

![image](https://github.com/user-attachments/assets/84f0b9e7-fa71-40eb-9d0c-c47a96ec857a)

### AUTH

- `POST /register` - To create a new user

  - Request.body should contain {username, email, password, role}
  - Respone is {message}

- `POST /login` - To login to the system
  - Request.body should contain {username, password}
  - Response is {token}

### TRAINS

- `POST /admin/addtrain` - Only admin can add train

  - Request { train_num, source, destination, availableSeats }, token, api_key
  - Response {message}

- `POST /admin/gettrain` - get trains and number of seats between src and destination

  - Request { source, destination }, token, api_key
  - Response trains[]

- `PUT /admin/updateseats` - Update seats in a train
  - Request { train_num, availableSeats }, token, API_KEY
  - Response {message}

### BOOKING

- `POST /bookticket` - Books ticket only using the train_num. Verifies the username and assigns the ticket to user

  - Request { train_num, availableSeats }, token
  - Response {message}

- `POST /getticket` - Get ticket details

  - Request { booking_id }(int), token
  - Response {booking}

## Race Condition

- `Sequelize lock function` - Depicts row lock transaction , updates the variable and rollbacks transaction if needed
  -Sequelize has inbuilt function to create a transaction.

## INSTALLATION AND RUNNING

-clone the repository<br>
-Run `npm install`<br>
-Run `nodemon server.js` or `node server.js`<br>
-JWT_SECRET_KEY and ADMIN_API_KEY is stored in .env file.<br>
-to generate a 32 bit key use `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` in cmd

### Possible updates

Logout function- but what if the user logs in from multiple systems
we can use tokenversion to prevent this. so when the user logsout we can increase the tokenversion which makes all the other tokens with oldertoken version as invalid
