import express from "express";
import {
    createOrder,
    getMostBoughtProduct,
    getMostBoughtProductsByCustomer
} from "#controllers/order.controller";

const orderRoute = express.Router();

//Place order
orderRoute
.route("/order")
.post(createOrder)


//Order MostBoughtProduct
orderRoute
.route("/most-bought-product")
.get(getMostBoughtProduct)


//Order MostBoughtProductsByCustomer
orderRoute
.route("/most-bought-product-customer")
.get(getMostBoughtProductsByCustomer)

export default orderRoute;
