import mongoose from "mongoose";
import Joi from "joi";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number
  },
  stock: {
    type: Number
  },
  active: {
    type: Boolean,
    default: false
  },
  category: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().integer().required(),
    active: Joi.boolean(),
    category: Joi.string().required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
  });
  return schema.validate(product);
}

const Product = mongoose.model("Product", ProductSchema);

export { Product, validateProduct };
