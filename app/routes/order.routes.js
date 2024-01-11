module.exports = function (app) {
    const orders = require('../controllers/order.controller');
    const router = require('express').Router();

    router.get('/user/:id', orders.findCart);
    router.post('/user/:id/add', orders.addToCart);
    router.delete('/user/:id/product/:product', orders.deleteFromCart);

    app.use('/api/orders', router);
};
