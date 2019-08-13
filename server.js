const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const category = require('./models/categorySchema.js');
const menuItems = require('./models/menuItemSchema.js');
var token;

const app = express();

require('dotenv').config();
const db_url = process.env.DB_URL;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({secret: "secret key", saveUninitialized: true, resave: false}));

app.use(express.static(path.join(__dirname, "client", "public")))

mongoose.connect(db_url, function(err, db) {
  if (err) {
    console.log(err+'Unable to connect to the mongoDB server');
  } else {
    console.log('Connection established');
  }
});

app.use(function(req, res, next) {
  token = req.headers['authorization'];
  if (!token) return next();

  jwt.verify(token, 'secret123', function(err, user) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Please register Log in using a valid email to submit posts'
      });
    } else {
      req.user = user.id; //set the user to req so other routes can use it
      next();
    }
  })
});

//fetch orders
const orderRoute = require('./routes/ordersRoute');
app.use('/api/orders', orderRoute);

//Add New address
const addressRoute = require('./routes/addressRoute');
app.use('/api/address', addressRoute);

//Add to Cart
const addToCartroute = require('./routes/addToCartRoute');
app.use('/api/usercart', addToCartroute);

//   Menu item fetching

app.get('/api/menucategories', function(req, res){
  category.find().then(eachOne => {
    res.json(eachOne);
  })
});

app.get('/api/menuitems', function(req, res){
  menuItems.find().then(eachOne => {
    res.json(eachOne);
  })
});

//payment
const paymentRoute = require('./routes/paymentRoute');
app.use('/api/payments', paymentRoute);

// login and signup fetching
const userAccountroute = require('./routes/userAccountRoute');
app.use('/api/account', userAccountroute);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

app.listen(process.env.PORT);
console.log('started application');
