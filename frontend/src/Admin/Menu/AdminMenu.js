import React from 'react';
import { Link } from 'react-router-dom';  
import './AdminMenu.css';

const AdminMenu = () => {
  return (
    <div className="navigation">
      <div className="logo">
        <img src="/img/logo.png" alt="Logo" />
      </div>
      <ul className="menu">
        <li><Link to="/admin/adminmenu">MENU</Link></li>
        <li><Link to="/admin/ship">ĐƠN SHIP</Link></li> 
        <li><Link to="/admin/use">ĂN TẠI QUÁN</Link></li> 
        <li><Link to="/admin/statistical">THỐNG KÊ</Link></li>
        <div className="tools-inline">
          <Link to="/" className="tool-item" onClick={() => localStorage.removeItem('isAdmin')}>
            <i className="bi bi-box-arrow-right"></i> 
            <span>Đăng Xuất</span>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default AdminMenu;