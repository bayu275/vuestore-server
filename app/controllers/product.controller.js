const db = require('../models');
const Product = db.product;

exports.findAll = async (req, res) => {
    try {
        const data = await Product.find();
        if (!data.length > 0) {
            return res.status(404).send({
                message: 'Products not found',
            });
        }
        res.send({ message: 'Success', data });
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving products.',
        });
    }
};

exports.findOne = async (req, res) => {
    const code = String(req.params.id);
    try {
        const product = await Product.findOne({ code });
        if (!product) {
            return res.status(404).send({
                message: 'Product not found',
            });
        }
        res.send({ message: 'Success', product });
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving product.',
        });
    }
};
