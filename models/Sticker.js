const mongoose = require("mongoose");

const stickerSchema = new mongoose.Schema({
    description: {type: String, required: true},
    size: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    discountPerCent: {type: Number, required: true}
});

const Sticker = mongoose.model('Sticker', stickerSchema);

module.exports = Sticker;