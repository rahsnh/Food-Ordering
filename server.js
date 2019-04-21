const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const category = require('./models/categorySchema.js');
const menuItems = require('./models/menuItemSchema.js');

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

mongoose.connect(db_url, function(err, db) {
  if (err) {
    console.log('Uable to connect to the mongoDB server');
  } else {
    console.log('Connection established');
  }
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

app.listen(process.env.PORT);
console.log('started application');
