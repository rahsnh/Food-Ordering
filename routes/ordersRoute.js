const express = require('express');

const orderRoute = express.Router();

const orders = require('../models/orderSchema.js');

orderRoute.get('/fetchorder', (req, res, next) => {
  orders.find({uid: req.session.uid}, (err,data) => {
    if (err) throw err;
    if (data)
      return res.json(data);
  });
});

module.exports = orderRoute;
