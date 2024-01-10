const dbConfig = require('../../config/db.config');
const mongoose = require('mongoose');
// const createProductModel = require('./product.model');

mongoose.Promise = global.Promise;

const db = {
    mongoose: mongoose,
    url: dbConfig.url,
    product: require('./product.model')(mongoose),
    order: require('./order.models')(mongoose),
};

module.exports = db;
