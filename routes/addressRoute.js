const express = require('express');

const addressRoute = express.Router();

const address = require('../models/addressSchema.js');

addressRoute.post('/newaddress', (req, res, next) => {
  let deliveryarea = req.body.deliveryarea;
  let compaddress = req.body.address;
  let nickname = req.body.nickname;
  var add = {deliveryarea: deliveryarea, houseno: compaddress, nickname: nickname};

  if (!deliveryarea) {
    return res.send({
      success: false,
      message: 'Select Delivery Area'
    });
  }

  if (!compaddress) {
    return res.send({
      success: false,
      message: 'Please Enter Flat / Door No'
    });
  }

  if (!nickname) {
    return res.send({
      success: false,
      message: 'Please Enter Nickname'
    });
  }

  address.findOne({
    uid: req.user,
    "addresses.nickname": nickname
  }, (err,data) => {
    if (err) {
      res.send({
        success: false,
        message: "Server Error"
      })
    } else if (data) {
      return res.send({
        success: false,
        message: "Nickname already exists"
      });
    } else {
      address.findOneAndUpdate(
        { uid: req.user },
        { $push: { addresses: add } },
        {projection : {
          addresses: {
            '$elemMatch': {nickname: nickname}
          }
        },upsert: true, new: true}, (err,added) => {
          if (err) {
            res.send({
              success: false,
              message: 'Server Error'
            });
          } else {
            res.send({
              success: true,
              message: 'Successfully Added Address',
              addedAddress: added.addresses[0]
            });
          }
        }
      )
    }
  });
});

addressRoute.post('/fetchaddress', (req,res,next) => {
  address.findOne({
    uid: req.user
  }, (err,data) => {
    if (err) {
      res.send({
        success: false,
        message: 'Server Error'
      });
    } else if (data) {
      res.send({
        success: true,
        message: 'Successfully loaded address',
        address: data.addresses
      });
    }
  });
})

module.exports = addressRoute;
