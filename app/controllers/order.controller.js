const db = require('../models');
const Order = db.order;

exports.findCart = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const data = await Order.aggregate([
            {
                $match: {
                    user_id: id,
                },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'cart_items',
                    foreignField: 'code',
                    as: 'products',
                },
            },
        ]);

        if (data.length > 0) {
            for (const cart of data) {
                if (!cart.products.length > 0) {
                    return res.status(404).send({
                        message: 'Products not found',
                    });
                }
            }
        } else {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        res.send({ message: 'Success', data });
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving products.',
        });
    }
};

exports.addToCart = async (req, res) => {
    const id = Number(req.params.id);
    const product = String(req.body.product);

    try {
        const data = await Order.updateOne(
            { user_id: id },
            {
                $addToSet: {
                    cart_items: product,
                },
            }
        );

        if (data.matchedCount > 0) {
            if (data.modifiedCount > 0) {
                return res.send({
                    data,
                    message: 'Product added to cart successfully',
                });
            } else {
                return res.status(400).send({
                    message: 'Product already added to cart',
                });
            }
        } else {
            return res.status(404).send({
                message: 'User not found',
            });
        }
    } catch (err) {
        return res.status(500).send({
            message: err.message || 'Some error occurred while retrieving products.',
        });
    }
};

exports.deleteFromCart = async (req, res) => {
    const id = Number(req.params.id);
    const product = String(req.params.product);
    try {
        const data = await Order.updateOne(
            { user_id: id },
            {
                $pull: {
                    cart_items: product,
                },
            }
        );
        if (data.matchedCount > 0) {
            if (data.modifiedCount > 0) {
                return res.send({
                    data,
                    message: 'Product removed from cart successfully',
                });
            } else {
                return res.status(400).send({
                    message: 'Product not found in cart',
                });
            }
        } else {
            return res.status(404).send({
                message: 'User not found',
            });
        }
    } catch (err) {
        return res.status(500).send({
            message: err.message || 'Some error occurred while retrieving products.',
        });
    }
};
