import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './context/CartContext'; // Import useCart
import './Menu.css';

const Menu = () => {
  const { getTotalItems } = useCart(); // Lấy hàm getTotalItems từ context
  const totalItems = getTotalItems(); // Lấy số lượng sản phẩm trong giỏ hàng

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <ul className="menu">
        <li><Link to="/">TRANG CHỦ</Link></li> 
        <li><Link to="/introduce">GIỚI THIỆU</Link></li> 
        <li><Link to="/product">SẢN PHẨM</Link></li>
        <li><Link to="/pay">DỊCH VỤ</Link></li>
      </ul>

      <hr />
      <div className="tools-inline">
        <Link to="/login" className="tool-item">
          <i className="bi bi-person"></i>
          <span>Tài Khoản</span>
        </Link>
        <Link to="/contact" className="tool-item">
          <i className="bi bi-house"></i>
          <span>Liên Hệ</span>
        </Link>
        <Link to="/shop" className="tool-item">
          <i className="bi bi-cart-plus"></i>
          <span>Giỏ Hàng</span>
          {totalItems > 0 && (
            <span className="item-count">{totalItems}</span> 
          )}
        </Link>
      </div>
    </div>
  );
};

export default Menu;



