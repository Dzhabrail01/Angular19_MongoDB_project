const { Schema, model } = require("mongoose");

const Product = new Schema({

  name: { type: String, required: true },
  description: {type: String , required: true },
  image: { type: String },
  price: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
});

module.exports = model("Product", Product);







