module.exports = function (app) {
    const orders = require('../controllers/order.controller');
    const router = require('express').Router();

    router.get('/user/:id', orders.findCart);
    router.post('/user/:id/add', orders.addToCart);

    app.use('/api/orders', router);
};
