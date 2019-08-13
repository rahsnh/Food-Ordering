const mongoose = require('mongoose');

let schema = mongoose.Schema;

const menuItemSchema = new schema({
  category: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  itemName: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  itemType: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  imageUrl: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  itemPrice: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
})

const menuItem = mongoose.model('menu_items', menuItemSchema);

module.exports = menuItem;
