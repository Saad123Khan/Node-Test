import express from "express";
import {
    createCustomer,
    updateCustomer
} from "#controllers/customer.controller";


const customerRoute = express.Router();

//Place order
customerRoute
.route("/customer")
.post(createCustomer)

//Cancel order
customerRoute
.route("/customer/:id")
.put(updateCustomer)

export default customerRoute;
