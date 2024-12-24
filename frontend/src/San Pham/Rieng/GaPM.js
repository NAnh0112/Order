import React, { useState } from 'react';
import styles from '../sp.module.css';
import { Link } from 'react-router-dom';
import { addToCart } from '../../services/cartService';

const TokbokkiTT = () => {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  const handleAddToCart = async () => {
    const product = {
      name: 'Gà Viên Phô Mai',
      productId: '4',
      product_id: '4', 
      quantity:1,
      note: note,
      price: 49000,
      type: null
  };
  
    if (!product.name || !product.price || !product.quantity || !product.productId ) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await addToCart(product);
      alert('Đã thêm vào giỏ hàng!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!');
    }
  };
  
  return (
    <div className={styles.product}>
      <h1 className={styles.herrVonMuellerhoffRegular}>Menu</h1>
      <div className={styles.menuProduct}>
        <ul className={styles.menuItems}>
          <li className={styles.menuItem}><Link to="/product">Tokbokki</Link></li>
          <li className={styles.menuItem}><Link to="/ga">Gà Popcorn</Link></li>
          <li className={styles.menuItem}><Link to="/com">Cơm Trộn</Link></li>
          <li className={styles.menuItem}><Link to="/my">Mỳ Trộn</Link></li>
          <li className={styles.menuItem}><Link to="/kimbap">Kimbap</Link></li>
          <li className={styles.menuItem}><Link to="/nuoc">Nước</Link></li>
        </ul>
      </div>

      <div className={styles.proInt}>
        <div className={styles.productImage}>
          <img src="https://cdn.tgdd.vn/2020/09/CookProduct/thumbcn-1200x676-4.jpg" alt="Gà Viên PM" />
        </div>
        <div className={styles.productDetails}>
          <h2 className={styles.productName}>Gà Viên Phô Mai</h2>
          <p className={styles.productPrice}>49k/ 1 suất</p>
          <div className={styles.productQuantity}>
            <label htmlFor="quantity">Số lượng:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div className={styles.productNote}>
            <label htmlFor="note">Ghi chú:</label>
            <textarea id="note" name="note" rows="4" cols="50" value={note} onChange={(e) => setNote(e.target.value)}></textarea>
          </div>
          <div className={styles.productButtons}>
            <button className={styles.addToCart} onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </button>
            <button className={styles.close} onClick={() => window.location.href = '/product'}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokbokkiTT;
