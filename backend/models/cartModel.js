const db = require('../config/db');

const Cart = {
    addToCart: (cartItem, callback) => {
        const query = `
    INSERT INTO cart (product_id, quantity, price)
    VALUES (?, ?, ?)`;
db.query(query, [cartItem.product_id, cartItem.quantity, cartItem.price], (err, result) => {
    if (err) {
        return callback(err);
    }
    callback(null, result);
});

    },

    getCartItems: (callback) => {
        const query = `
            SELECT c.*, p.name AS product_name 
            FROM cart c 
            JOIN products p ON c.product_id = p.id`;
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    updateCartItem: (product_id, quantity, callback) => {
        const query = 'UPDATE cart SET quantity = ? WHERE product_id = ?';
        db.query(query, [quantity, product_id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    deleteCartItemByProductId: (productId, callback) => {
        const query = 'DELETE FROM cart WHERE product_id = ?';
        db.query(query, [productId], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    }
};

module.exports = Cart;