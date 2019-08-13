const express = require('express');
const addToCartRoute = express.Router();

const userCart = require('../models/userCartSchema.js');

addToCartRoute.post('/addtocart', (req, res, next) => {
  let item_id = req.body.item_id;
  let itemName = req.body.itemName;
  let itemPrice = req.body.itemPrice;
  let itemType = req.body.itemType;
  let total = req.body.total;
  let units = req.body.units;
  let value = req.body.value;

  if (value === "addFromCart") {
    function findOne() {
      return new Promise(resolve => {
        resolve(
          userCart.findOne(
            { uid: req.user, "products.item_id": item_id }
          )
        );
      });
    }
    findOne().then(cart => {
      if (cart) {
        for(var i = 0; i < cart.products.length; i++) {
          if(cart.products[i].item_id == item_id) {
            userCart.findOneAndUpdate(
              { uid: req.user, "products.item_id": item_id},
              { $inc: {"products.$.total": total, "products.$.units": units}},
              { projection: {
                products: {
                  '$elemMatch': { item_id: item_id },
                },
                cartTotal: 1,
              }, new: true }, (err,data) => {
                if (err) throw err;
                return res.json({cartItem: data.products[0], cartTotal: data.cartTotal});
              }
            );
            break;
          }
        }
      } else {
        userCart.findOneAndUpdate(
          { uid: req.user },
          { $push: {products: {item_id: item_id, itemName: itemName, itemPrice: itemPrice, itemType: itemType, total: total, units: units}}},
          { projection: {
            products: {
              '$elemMatch': { item_id: item_id },
            },
            cartTotal: 1,
          }, upsert : true, new: true }, (err,data) => {
            if (err) throw err;
            return res.json({cartItem: data.products[0], cartTotal: data.cartTotal});
          }
        );
      }
    });
  } else if (value === "addNewToCart") {
    function findOne() {
      return new Promise(resolve => {
        resolve(
          userCart.findOne(
            { uid: req.user, "products.item_id": item_id }
          )
        );
      });
    }
    findOne().then(cart => {
      if (cart) {
        for(var i = 0; i < cart.products.length; i++) {
          if(cart.products[i].item_id == item_id) {
            userCart.findOneAndUpdate(
              { uid: req.user, "products.item_id": item_id },
              { $inc: {"products.$.total": itemPrice, "products.$.units": 1, cartTotal: itemPrice }},
              { projection: {
                products: {
                  '$elemMatch': { item_id: item_id },
                },
                cartTotal: 1,
              }, new: true }, (err,data) => {
                if (err) throw err;
                return res.json({cartItem: data.products[0], cartTotal: data.cartTotal});
              }
            );
            break;
          }
        }
      } else {
        userCart.findOneAndUpdate(
          { uid: req.user },
          { $push: {products: {item_id: item_id, itemName: itemName, itemPrice: itemPrice, itemType: itemType, total: itemPrice, units: 1}},
            $inc: { cartTotal: itemPrice }},
          { projection: {
            products: {
              '$elemMatch': { item_id: item_id },
            },
            cartTotal: 1,
          }, upsert : true, new: true }, (err,data) => {
            if (err) throw err;
            return res.json({cartItem: data.products[0], cartTotal: data.cartTotal});
          }
        );
      }
    });
  } else if (value === "increase") {
    userCart.findOneAndUpdate(
      { uid: req.user, "products.item_id": item_id },
      { $inc: { "products.$.total": itemPrice, "products.$.units": 1, cartTotal: itemPrice }},
      { projection: {
        products: {
          '$elemMatch': { item_id: item_id },
        },
        cartTotal: 1,
      }, new: true }, (err,data) => {
        return res.json({cartItem: data.products[0], cartTotal: data.cartTotal});
      }
    );
  } else if (value > 1) {
    userCart.findOneAndUpdate(
      { uid: req.user, "products.item_id": item_id },
      { $inc: { "products.$.total": -itemPrice, "products.$.units": -1, cartTotal: -itemPrice }},
      { projection: {
        products: {
          '$elemMatch': { item_id: item_id },
        },
        cartTotal: 1,
      }, new: true }, (err,data) => {
        return res.json({cartItem: data.products[0], cartTotal: data.cartTotal});
      }
    );
  } else if (value <= 1) {
    userCart.findOneAndUpdate(
      { uid: req.user },
      { $pull: {products: {item_id: item_id}},
        $inc: { cartTotal: -itemPrice }},
      { projection: {
          products: {
            '$elemMatch': { item_id: item_id },
          },
          cartTotal: 1,
      }, new: false}, (err, data) => {
        data.products[0].units = 0;
        return res.json({cartItem: data.products[0], cartTotal: data.cartTotal});
      }
    )
  }
});

addToCartRoute.get('/fetchcart', (req, res) => {
  userCart.findOne({ uid: req.user }, (err,data) => {
    if (data) {
      return res.json({cartItem: data.products, cartTotal: data.cartTotal});
    }
  });
});

module.exports = addToCartRoute;
