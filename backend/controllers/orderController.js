const Order = require('../models/orderModel');

exports.getOrders = (req, res) => {
    Order.getOrders((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve orders', details: err.message });
        }
        res.json(results);
    });
};

exports.addOrder = (req, res) => {
    const { cart_id, product_id, quantity, type_order, seat, address, customer_phone, customer_name, note, total_price, shipper, shipping_fee } = req.body;

    if (!cart_id || !product_id || !quantity || !customer_name || 
        (type_order === 'Dine-in' && !seat) || 
        (type_order === 'Takeaway' && !address)) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (typeof total_price !== 'number') {
        return res.status(400).json({ message: 'total_price must be a number' });
    }

    Order.addOrder({
        cart_id, 
        product_id, 
        quantity, 
        type_order, 
        seat, 
        address, 
        customer_phone, // Đảm bảo trường này được đưa vào
        customer_name, 
        note, 
        total_price, 
        shipper,
        status: 'Preparing', 
        shipping_fee
    }, (err, result) => {
        if (err) {
            console.error('Error adding order:', err);
            return res.status(500).send({ error: 'Failed to add order', details: err.message });
        }
        res.status(201).send({ success: true, orderId: result.insertId });
    });
};

exports.updateOrderStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    Order.updateOrderStatus(id, status, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update order status', details: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order status updated successfully' });
    });
};

exports.deleteOrder = (req, res) => {
    const { id } = req.params;
    Order.deleteOrder(id, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete order', details: err.message });
        }
        res.json({ message: 'Order deleted successfully' });
    });
};


//Ship.js
exports.getOrders = (req, res) => {
    Order.getOrders((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve orders', details: err.message });
        }
        // Lọc các đơn hàng có type_order là "Takeaway"
        const filteredResults = results
            .filter(order => order.type_order === 'Takeaway')
            .map(order => ({
                product_id: order.product_id,
                product_name: order.product_name, // Thêm tên sản phẩm
                quantity: order.quantity,
                address: order.address,
                customer_phone: order.customer_phone,
                customer_name: order.customer_name,
                total_price: order.total_price,
                shipper: order.shipper,
                status: order.status,
            }));
        res.json(filteredResults);
    });
};

exports.updateOrderStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Preparing', 'Completed', 'Shipping', 'Delivered'];
    if (!validStatuses.includes(status)) {
        console.error('Invalid status:', status); // Ghi lại trạng thái không hợp lệ
        return res.status(400).json({ error: 'Invalid status' });
    }

    Order.updateOrderStatus(id, status, (err, result) => {
        if (err) {
            console.error('Error updating order status:', err); // Ghi lại lỗi
            return res.status(500).json({ error: 'Failed to update order status', details: err.message });
        }
        if (result.affectedRows === 0) {
            console.warn('Order not found for ID:', id); // Ghi lại cảnh báo nếu không tìm thấy đơn hàng
            return res.status(404).json({ message: 'Order not found' });
        }
        console.log('Order status updated successfully for ID:', id); // Ghi lại thông báo thành công
        res.json({ message: 'Order status updated successfully' });
    });
};

exports.deleteOrder = (req, res) => {
    const { id } = req.params;
    Order.deleteOrder(id, (err) => {
        if (err) {
            console.error('Error deleting order:', err); 
            return res.status(500).json({ error: 'Failed to delete order', details: err.message });
        }
        console.log('Order deleted successfully for ID:', id); 
        res.json({ message: 'Order deleted successfully' });
    });
};

//Tại quán
exports.getDineInOrders = (req, res) => {
    Order.getOrders((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve orders', details: err.message });
        }
        const filteredResults = results
        .filter(order => order.type_order === 'Dine-in')
        .map(order => ({
            product_id: order.product_id,
            product_name: order.product_name,
            quantity: order.quantity,
            customer_name: order.customer_name, 
            seat: order.seat,
            note: order.note,
            total_price: order.total_price,
            status: order.status,
            }));
        res.json(filteredResults);
    });
};