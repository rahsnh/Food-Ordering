const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  order_id: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  rzp_order_id: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  rzp_payment_id: {
    type: mongoose.Schema.Types.Mixed,
    default: '',
  },
  items: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  amount: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  paymentstatus: {
    type: mongoose.Schema.Types.Mixed,
    default: 'created',
  },
  orderstatus: {
    type: mongoose.Schema.Types.Mixed,
    default: 'created',
  },
  order_date: {
    type: mongoose.Schema.Types.Mixed,
    default: Date.now(),
    required: true
  }
});

const orders = mongoose.model('orders', orderSchema);

module.exports = orders;
