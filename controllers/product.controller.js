import asyncHandler from "#middlewares/asyncHandler";
import { validateProduct , Product} from "#models/product_model";
import _ from "lodash";

//@desc  Create Product
//@route  /product
//@request POST Request
//@acess  public

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) {
      return res
        .status(400)
        .send({ status: false, message: error?.details[0]?.message });
    }

    const productData = _.pick(req.body, ['name', 'price', 'stock', 'active', 'category']);
    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);

  } catch (e) {
    return res.status(400).send(e.message);
  }
});


//@desc  Update Product
//@route  /product/:id
//@request PUT Request
//@acess  private

const updateProduct = asyncHandler(async (req, res) => {
  try {
   
    const productId = req.params.id;
    const productData = req.body;
    
    const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.send(updatedProduct);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});


export { createProduct , updateProduct};
