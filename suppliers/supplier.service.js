const config = require('config.json');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Supplier = db.Supplier;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Supplier.find().select('-name');
}

async function getById(id) {
    return Supplier.findById(id).select('-name');
}

async function create(supplierParam) {
    // validate
    if (await Supplier.findOne({ name: supplierParam.name })) {
        throw 'Name "' + supplierParam.name + '" is already taken';
    }

    const supplier = new Supplier(supplierParam);
    console.log(supplier);

    // save supplier
    await supplier.save();
}

async function update(id, supplierParam) {
    const supplier = await Supplier.findById(id);

    // validate
    if (!supplier) throw 'Supplier not found';
    if (supplier.name !== supplierParam.name && await Supplier.findOne({ name: supplierParam.name })) {
        throw 'Name "' + supplierParam.name + '" is already taken';
    }

    // copy userParam properties to user
    Object.assign(supplier, supplierParam);

    await supplier.save();
}

async function _delete(id) {
    await Supplier.findByIdAndRemove(id);
}