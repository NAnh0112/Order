const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
router.get('/', cartController.getCartItems);
router.post('/', async (req, res) => {
    try {
        const result = await cartController.addToCart(req, res); 
        const cart_id = result.insertId; 
        res.json({ cart_id });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


router.put('/product/:productId', cartController.updateCartItem);
router.delete('/product/:productId', cartController.deleteCartItemByProductId);

module.exports = router;