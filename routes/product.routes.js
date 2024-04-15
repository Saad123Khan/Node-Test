import express from "express";
import {
    createProduct,
    updateProduct
} from "#controllers/product.controller";

const productRoute = express.Router();

//Place order
productRoute
.route("/product")
.post(createProduct)

//Cancel order
productRoute
.route("/product/:id")
.put(updateProduct)

export default productRoute;
