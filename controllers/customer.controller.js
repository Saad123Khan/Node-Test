import asyncHandler from "#middlewares/asyncHandler";
import { Customer, validate } from "#models/customer_model";
import _ from "lodash";

//@desc  Create User
//@route  /customer
//@request POST Request
//@acess  public

const createCustomer = asyncHandler(async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res
        .status(400)
        .send({ status: false, message: error?.details[0]?.message });
    }

    const customerData = _.pick(req.body, ['email', 'name', 'cardNumber', 'phoneNumber']);
    const customer = new Customer(customerData);
    await customer.save();
    res.status(201).json(customer);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});


//@desc  Update Customer
//@route  /customer/:id
//@request PUT Request
//@acess  private

const updateCustomer = asyncHandler(async (req, res) => {
  try {
   
    const customerId = req.params.id;
    const customerData = req.body;
    
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, customerData, { new: true });
    
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.send(updatedCustomer);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});


export { createCustomer , updateCustomer};
