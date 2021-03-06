const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Supplier: require('../suppliers/supplier.model'),
    Product: require('../products/product.model'),
    Award: require('../awards/award.model')
};