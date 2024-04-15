import mongoose from "mongoose";
import Joi from "joi";

const CustomerSchema = new mongoose.Schema({
  
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  cardNumber: {
    type: String,
  },
  phoneNumber: {
    type: String,
  }
},{timestamps : true});


function validateCustomer(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    cardNumber: Joi.string().creditCard().required(),
    phoneNumber: Joi.string().required()
  });
  return schema.validate(data);
}

const Customer = mongoose.model("Customer", CustomerSchema);

export { Customer, validateCustomer as validate };
