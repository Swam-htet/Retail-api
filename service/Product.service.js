let Product = require("../model/product.model");
let mongoose = require("mongoose");

// get all product
async function getAllProduct() {
    return Product.find().populate('category').populate("manufacturer");

}

// get product by id
async function getProductByID(id) {
    let product = await Product.findById(id);
    await product.populate('category');
    await product.populate('manufacturer');
    return product;
}


// create product
async function createProduct(product) {
    let newProduct = new Product({
        name: product.name,
        price: product.price,
        category: mongoose.Types.ObjectId(product.category_id),
        manufacturer: mongoose.Types.ObjectId(product.manufacturer_id),
    });
    await newProduct.save();
    await newProduct.populate('category');
    await newProduct.populate('manufacturer');
    return newProduct;
}

// update product
async function updateProductByID(id, body) {
    return Product.findByIdAndUpdate(id, body, {new: true}).populate("manufacturer").populate('category');
}

// delete product
async function deleteProductByID(id) {
    return Product.findByIdAndDelete(id).populate("manufacturer").populate("category");
}

module.exports = {
    getAllProduct,
    getProductByID,
    createProduct,
    updateProductByID,
    deleteProductByID
}