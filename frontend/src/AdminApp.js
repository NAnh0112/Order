import React from 'react';
import { Route, Routes } from 'react-router-dom';  
import AdminMenu from './Admin/Menu/AdminMenu';
import SPham from './Admin/TAn/SPham';
import Use from './Admin/Tai Quan/Use';
import Ship from './Admin/Ship/Ship';
import Statistical from './Admin/Thong Ke/Statistical';
import './AdminApp.css'; 

function AdminApp() {
  return (
    <div className="admin-container">
      <div className="admin-layout">
        <AdminMenu />
        <div className="content-area">
          <Routes>
            <Route path="/adminmenu" element={<SPham />} /> 
            <Route path="/use" element={<Use />} />
            <Route path="/ship" element={<Ship />} />
            <Route path="/statistical" element={<Statistical />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminApp;