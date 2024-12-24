const Product = require('../models/productModel');

exports.getAllProducts = (req, res) => {
    Product.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
};

exports.addProduct = (req, res) => {
    const newProduct = req.body;
    Product.add(newProduct, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ id: result.insertId, ...newProduct });
    });
};

exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    Product.update(id, updatedProduct, (err) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Product updated successfully' });
    });
};

exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    Product.delete(id, (err) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Product deleted successfully' });
    });
};
