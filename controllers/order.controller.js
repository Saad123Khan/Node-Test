import asyncHandler from "#middlewares/asyncHandler";
import { Customer } from "#models/customer_model";
import { Order, validateOrder } from "#models/order_model";
import { Product } from "#models/product_model";
import _ from "lodash";

//@desc  Create Order
//@route  /order
//@request POST Request
//@acess  private

const createOrder = asyncHandler(async (req, res) => {
  try {
    const { userId, productId, amount } = req.body;

    const { error } = validateOrder(req.body);
    if (error) {
      return res
        .status(400)
        .send({ status: false, message: error?.details[0]?.message });
    }

    const customer = await Customer.findById(userId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product?.stock < req.body.quantity) {
      return res.status(400).json({ message: "Product out of stock" });
    }

    const orderData = _.pick(req.body, ['userId', 'productId', 'amount', 'quantity']);
  
    const order = new Order(orderData);

    product.stock -= req.body.quantity;
    await product.save();

    await order.save();

    res.status(201).json(order);

  } catch (e) {
    return res.status(400).send(e.message);
  }
});


//@desc  Get mostBoughtProduct
//@route  /most-bought-product
//@request GET Request
//@acess  private


const getMostBoughtProduct = asyncHandler(async (req, res) => {
  try {
        const mostBoughtProduct = await Order.aggregate([
          { $group: { _id: "$productId", totalQuantity: { $sum: "$quantity" } } },
          { $sort: { totalQuantity: -1 } },
          { $limit: 1 }
        ]);
    
        if (!mostBoughtProduct.length) {
          return res.status(404).json({ message: "No products found" });
        }
    
        const mostBoughtProductDetails = await Product.findById(mostBoughtProduct?.[0]?._id);
    
        res.json({ mostBoughtProduct: mostBoughtProductDetails, totalQuantity: mostBoughtProduct?.[0]?.totalQuantity });

  } catch (e) {
    return res.status(400).send(e.message);
  }
});




//@desc  Get mostBoughtProductbyCustomer
//@route  /most-bought-product-customer
//@request GET Request
//@acess  private



const getMostBoughtProductsByCustomer = asyncHandler(async (req, res) => {
  try {
    const mostBoughtProducts = await Order.aggregate([
      { $group: { _id: "$productId", totalQuantity: { $sum: "$quantity" } } },
      { $sort: { totalQuantity: -1 } }
    ]);

    if (!mostBoughtProducts.length) {
      return res.status(404).json({ message: "No products found" });
    }

    const totalQuantityAllProducts = mostBoughtProducts.reduce((acc, product) => acc + product.totalQuantity, 0);

    const categoryPercentages = {};
    for (const product of mostBoughtProducts) {
      const productDetails = await Product.findById(product._id);
      const category = productDetails.category;
      const percentage = (product.totalQuantity / totalQuantityAllProducts) * 100;
      categoryPercentages[category] = categoryPercentages[category] ? categoryPercentages[category] + percentage : percentage;
    }

    const sortedCategoryPercentages = Object.entries(categoryPercentages).sort((a, b) => b[1] - a[1]);

    res.json(sortedCategoryPercentages);
  } catch (error) {
    return res.status(400).send(e.message);
   }
  
});

export { createOrder , getMostBoughtProduct ,getMostBoughtProductsByCustomer };
