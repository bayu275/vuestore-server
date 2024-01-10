const db = require('../models');
const Order = db.order;

exports.findCart = (req, res) => {
    const id = Number(req.params.id);

    Order.aggregate([
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
    ])
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving products.',
            });
        });
};

exports.addToCart = (req, res) => {
    const id = Number(req.params.id);
    const code = String(req.body.product);

    Order.updateOne(
        { user_id: id },
        {
            $addToSet: {
                cart_items: code,
            },
        }
    )
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving products.',
            });
        });
};
