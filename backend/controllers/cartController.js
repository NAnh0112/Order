const Cart = require('../models/cartModel');
const Product = require('../models/productModel'); 

exports.getCartItems = (req, res) => {
    Cart.getCartItems((err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results); 
    });
};

exports.addToCart = (req, res) => {
    const cartItem = req.body;
    const missingFields = [];
    if (!cartItem.product_id) missingFields.push('product_id');
    if (!cartItem.quantity) missingFields.push('quantity');
    if (!cartItem.price) missingFields.push('price');

    if (missingFields.length > 0) {
        console.error(`Thiếu các trường bắt buộc: ${missingFields.join(', ')}`);
        return res.status(400).json({ error: `Thiếu các trường bắt buộc: ${missingFields.join(', ')}` });
    }

    Product.getProductById(cartItem.product_id, (err, product) => {
        if (err || !product) {
            return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
        }

        cartItem.product_name = product.name;

        Cart.addToCart(cartItem, (err, result) => {
            if (err) {
                console.error('Lỗi khi lưu vào giỏ hàng:', err);
                return res.status(500).json({ error: 'Lỗi máy chủ nội bộ', details: err.message });
            }
            if (!result || !result.insertId) {
                return res.status(500).json({ error: 'Thêm sản phẩm vào giỏ hàng thất bại, không có insertId trả về.' });
            }
            return res.status(201).json({ id: result.insertId, ...cartItem });
        });
    });
};

exports.updateCartItem = (req, res) => {
    const product_id = req.params.productId; 
    const { quantity } = req.body; 
    if (quantity < 1) {
        return res.status(400).json({ error: 'Số lượng phải lớn hơn 0' });
    }
    Cart.updateCartItem(product_id, quantity, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi khi cập nhật sản phẩm trong giỏ hàng' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Sản phẩm không tìm thấy trong giỏ hàng' });
        }
        res.json({ message: 'Sản phẩm đã được cập nhật thành công' });
    });
};

exports.deleteCartItemByProductId = (req, res) => {
    const { productId } = req.params;
    console.log(`Yêu cầu xóa sản phẩm trong giỏ hàng với product_id: ${productId}`);

    Cart.deleteCartItemByProductId(productId, (err, result) => {
        if (err) {
            console.error('Lỗi khi xóa sản phẩm trong giỏ hàng:', err);
            return res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
        }
        if (result.affectedRows === 0) {
            console.warn(`Sản phẩm với product_id ${productId} không tìm thấy trong giỏ hàng.`);
            return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
        }
        console.log(`Sản phẩm với product_id ${productId} đã được xóa thành công.`);
        res.status(200).json({ message: 'Sản phẩm đã được xóa thành công khỏi giỏ hàng' });
    });
};