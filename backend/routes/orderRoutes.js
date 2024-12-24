const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const db = require('../config/db'); 
const Order = require('../models/orderModel'); 

router.get('/', orderController.getOrders);
router.put('/:id', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrder);

router.post('/create', async (req, res) => {
    const { cart_id, product_id, quantity, customer_name, seat, address, type_order } = req.body;

    if (!cart_id || !product_id || !quantity || !customer_name || 
        (type_order === 'Dine-in' && !seat) || 
        (type_order === 'Takeaway' && !address)) {
        return res.status(400).json({ message: 'Thiếu trường bắt buộc' });
    }

    try {
        const newOrder = {
            cart_id,
            product_id,
            quantity,
            customer_name,
            seat,
            address,
            type_order,
            total_price: quantity * 30000, 
        };

        await Order.addOrder(newOrder, (err, result) => {
            if (err) {
                console.error('Lỗi khi lưu đơn hàng:', err);
                return res.status(500).json({ message: 'Lỗi server' });
            }
            res.status(201).json({ success: true, orderId: result.insertId });
        });
    } catch (error) {
        console.error('Lỗi khi lưu đơn hàng:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});


router.get('/orders', orderController.getOrders);
router.put('/:id/status', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrder);
router.get('/dine-in', orderController.getDineInOrders);

module.exports = router;