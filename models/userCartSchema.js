const mongoose = require('mongoose');

const UserCartSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  products: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  cartTotal: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  }
});

const userCart = mongoose.model('users_carts', UserCartSchema);

module.exports = userCart;
