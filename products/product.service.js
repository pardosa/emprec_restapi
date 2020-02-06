const config = require('config.json');
const db = require('_helpers/db');
const Product = db.Product;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Product.find().select('-name');
}

async function getById(id) {
    return Product.findById(id).select('-name');
}

async function create(productParam) {
    // validate
    if (await Product.findOne({ name: productParam.name })) {
        throw 'Name "' + productParam.name + '" is already taken';
    }

    const product = new Product(productParam);
    console.log(product);

    // save product
    await product.save();
}

async function update(id, productParam) {
    const product = await Product.findById(id);

    // validate
    if (!product) throw 'Product not found';
    if (product.name !== productParam.name && await Product.findOne({ name: productParam.name })) {
        throw 'Name "' + productParam.name + '" is already taken';
    }

    // copy userParam properties to user
    Object.assign(product, productParam);

    await product.save();
}

async function _delete(id) {
    await Product.findByIdAndRemove(id);
}