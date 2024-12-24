const db = require('../config/db');

const Product = {
    getAll: (callback) => {
        const query = 'SELECT * FROM products';
        db.query(query, callback);
    },
    add: (product, callback) => {
        const query = `
            INSERT INTO products (name, price, status)
            VALUES (?, ?, ?)
        `;
        const values = [product.name, product.price, product.status];
        db.query(query, values, callback);
    },
    update: (id, product, callback) => {
        const query = `
            UPDATE products SET name = ?, price = ?, status = ?
            WHERE id = ?
        `;
        const values = [product.name, product.price, product.status, id];
        db.query(query, values, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM products WHERE id = ?';
        db.query(query, [id], callback);
    },
    getProductById: (id, callback) => {
        const query = 'SELECT * FROM products WHERE id = ?';
        db.query(query, [id], callback);
    },
};

module.exports = Product;
