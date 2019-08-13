const mongoose = require('mongoose');

let schema = mongoose.Schema;

const categorySchema = new schema({
  category: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
})

const category = mongoose.model('food_categories', categorySchema);

module.exports = category;
