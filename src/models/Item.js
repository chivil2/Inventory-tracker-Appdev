const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 0, default: 0 },
  lowStockThreshold: { type: Number, default: 5, min: 0 },
  notes: { type: String, default: '' },
}, { timestamps: true });

ItemSchema.virtual('isLowStock').get(function () {
  return this.quantity <= this.lowStockThreshold;
});

module.exports = mongoose.model('Item', ItemSchema);