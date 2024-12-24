import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom'; 
import Menu from './Menu';
import Home from './Trang Chu/Home'; 
import Introduce from './Gioi Thieu/Introduce';  
import Contact from './Lien He/Contact';
import Product from './San Pham/MoDau/Tokbokki';
import TokbokkiTT from './San Pham/Rieng/TokbokkiTT';
import TokbokkiTD from './San Pham/Rieng/TokbokkiTD';
import TokbokkiPM from './San Pham/Rieng/TokbokkiPM';
import Ga from './San Pham/MoDau/Ga';
import GaPM from './San Pham/Rieng/GaPM';
import GaSH from './San Pham/Rieng/GaSH';
import Com from './San Pham/MoDau/Com';
import ComTT from './San Pham/Rieng/Com';
import My from './San Pham/MoDau/My';
import MyTT from './San Pham/Rieng/MyTT';
import MyTD from './San Pham/Rieng/MyTD';
import Kimbap from './San Pham/MoDau/Kimbap';
import Kibap from './San Pham/Rieng/Kibap';
import Nuoc from './San Pham/MoDau/Nuoc';
import Sprite from './San Pham/Rieng/Sprite';
import Coca from './San Pham/Rieng/Coca';
import Login from './Dang Nhap/Login';
import Pay from './Thanh Toan/Pay';
import Shop from './Gio Hang/Shop';
import './App.css';
import AdminApp from './AdminApp';
import { CartProvider } from './context/CartContext'; // Import CartProvider


function App() {
  return (
    <CartProvider> 
      <Router>
        <div className="container">
          <ConditionalMenu />
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/product" element={<Product />} /> 
            <Route path="/introduce" element={<Introduce />} /> 
            <Route path="/contact" element={<Contact />} />
            <Route path="/tokbokkitt" element={<TokbokkiTT />} /> 
            <Route path="/tokbokkipm" element={<TokbokkiPM />} />
            <Route path="/tokbokkitd" element={<TokbokkiTD />} />
            <Route path="/ga" element={<Ga />} />
            <Route path="/gapm" element={<GaPM />} />
            <Route path="/gash" element={<GaSH />} />
            <Route path="/com" element={<Com />} />
            <Route path="/comtt" element={<ComTT />} />
            <Route path="/my" element={<My />} />
            <Route path="/mytt" element={<MyTT />} />
            <Route path="/mytd" element={<MyTD />} />
            <Route path="/kimbap" element={<Kimbap />} />
            <Route path="/kibap" element={<Kibap />} />
            <Route path="/nuoc" element={<Nuoc />} />
            <Route path="/sprite" element={<Sprite />} />
            <Route path="/coca" element={<Coca />} />
            
            <Route path="/login" element={<Login />} /> 

            <Route path="/pay" element={<Pay />} />
            <Route path="/shop" element={<Shop />} />

            <Route path="/admin/*" 
              element={
                <ProtectedAdminRoute>
                  <AdminApp />
                </ProtectedAdminRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

function ProtectedAdminRoute({ children }) {
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; 
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }
  return children;
}

function ConditionalMenu() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin') || location.pathname === '/login') {
    return null; 
  }
  return <Menu />;
}

export default App;