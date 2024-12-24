const db = require('../config/db');

const Order = {
    addOrder: (order, callback) => {
        const query = `
            INSERT INTO orders 
            (cart_id, product_id, quantity, type_order, seat, address, customer_phone, customer_name, note, total_price, shipper, status, shipping_fee)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            order.cart_id,
            order.product_id,
            order.quantity,
            order.type_order || null,
            order.seat || null,
            order.address || null,
            order.customer_phone || null,
            order.customer_name,
            order.note || null,
            order.total_price,
            order.shipper || null,
            order.status || 'Preparing',
            order.shipping_fee || 0,
        ];

        console.log('Giá trị truy vấn:', values); // Thêm log để kiểm tra giá trị

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Lỗi cơ sở dữ liệu:', err);
                return callback(err);
            }
            callback(null, result);
        });
    },
    
    getOrders: (callback) => {
        const query = 'SELECT * FROM orders';
        db.query(query, callback);
    },

    updateOrderStatus: (id, status, callback) => {
        const query = 'UPDATE orders SET status = ? WHERE id = ?';
        db.query(query, [status, id], callback);
    },

    deleteOrder: (id, callback) => {
        const query = 'DELETE FROM orders WHERE id = ?';
        db.query(query, [id], callback);
    },

    getOrders: (callback) => {
        const query = `
            SELECT o.*, p.name AS product_name 
            FROM orders o 
            JOIN products p ON o.product_id = p.id
        `;
        db.query(query, callback);
    },
    
};

module.exports = Order;