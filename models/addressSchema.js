const mongoose = require('mongoose');

let schema = mongoose.Schema;

const addressSchema = new schema({
  uid: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  addresses: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  }
})

const address = mongoose.model('addresses', addressSchema);

module.exports = address;
