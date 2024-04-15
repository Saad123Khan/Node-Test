import mongoose from "mongoose";
import Joi from "joi";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
   
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  amount: {
    type: Number
  },
  quantity:{
    
    type: Number
  },
  isCancel: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

function validateOrder(order) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    productId: Joi.string().required(),
    amount: Joi.number().required(),
    quantity : Joi.number().required(),
    isCancel: Joi.boolean(),
    isDeleted: Joi.boolean(),
  });
  return schema.validate(order);
}
const Order = mongoose.model("Order", OrderSchema);

export { Order, validateOrder };
