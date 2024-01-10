const db = require('../models');
const Product = db.product;

exports.findAll = (req, res) => {
    Product.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving products.',
            });
        });
};
