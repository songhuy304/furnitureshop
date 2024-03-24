const mongoose = require('mongoose');
const invoiceItemSchema = new mongoose.Schema({
    product_id:  String,
    quantity:  Number,
    price:  Number,
    itemTotal: Number
  });


module.exports = mongoose.model('invoiceitem', invoiceItemSchema);
