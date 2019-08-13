const express = require('express');

const paymentRoute = express.Router();
const Razorpay = require('razorpay');

var MongoClient = require('mongodb').MongoClient;
const orders = require('../models/orderSchema.js');
const userCart = require('../models/userCartSchema.js');

let instance = new Razorpay({
  key_id: process.env.KEY_ID, // your `KEY_ID`
  key_secret: process.env.KEY_SECRET // your `KEY_SECRET`
});

paymentRoute.get('/createpayment', (req, res, next) => {
  var order_currency = 'INR';
  var order_receipt = 'receipt#42';
  var nickname = req.body.nickname;
  userCart.findOne({ uid: req.session.uid }, (err,data) => {
    if (err) throw (err);
    if (data) {
      var items = data.products;
      return instance.orders.create({amount: data.cartTotal, currency: order_currency, receipt: order_receipt}).then((response) => {
        if (response.id) {
          orders.findOneAndUpdate(
            { uid: req.session.uid, order_id: 'receipt_44' },
            { $set: {rzp_order_id: response.id, items: items, amount: response.amount, order_date: response.created_at}},
            { upsert: true, new: true}, (err, data) => {
              if (err) throw err;
              return res.json({order_id: data.rzp_order_id, amount: data.amount});
            }
          );
        }
      })
    }
  });
});

paymentRoute.post('/authorizepayment', (req, res, next) => {
  let pay_id = req.body.pay_id;
  instance.payments.fetch(pay_id).then((response) => {
    if (response.status == 'authorized') {
      orders.findOneAndUpdate(
        { uid: req.session.uid, rzp_order_id: response.order_id },
        { $set: {rzp_payment_id: response.id, paymentstatus: response.status}},
        { new: true }, (err, data) => {
          if (err) throw err;
          return res.json({paymentstatus: data.paymentstatus, order_id: data.order_id });
        }
      );
      userCart.findOneAndDelete({ uid: req.session.uid }).then((err,data) => {
        if (err) throw err;
      })
    }
  });
});

paymentRoute.get('/orderTrack/:id', (req, res, next) => {
  orders.findOne({ order_id: req.params.id }, (err,data) => {
    if (err) throw err;
    if (data) {
      return res.json({items: data.items, total: data.amount});
    }
  });
})

module.exports = paymentRoute;
