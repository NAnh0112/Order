import React from 'react';
import '../Product.css'; 
import { Link } from 'react-router-dom'
const Ga = () => {
    return (
        <div className="product">
            <h1 className="herr-von-muellerhoff-regular">Menu</h1>
            <div className="menu-product">
                <ul className="menu-items">
                    <li className="menu-item"><a href="./product">Tokbokki</a></li>
                    <li className="menu-item"><a href="./ga">Gà Popcorn</a></li>
                    <li className="menu-item"><a href="./com">Cơm Trộn</a></li>
                    <li className="menu-item"><a href="./my">Mỳ Trộn</a></li>
                    <li className="menu-item"><a href="./kimbap">Kimbap</a></li>
                    <li className="menu-item"><a href="./nuoc">Nước</a></li>           
                </ul>
            </div>
            <div className="menu-list">
            <Link to="../GaPM" className="product-item">
    <img src="../img/02.PNG" alt="Product 1" />
    <div className="product-info">
        <p className="product-name">Gà Viên Phô Mai</p>
        <p className="product-price">49k/ 1 suất</p>
    </div>
</Link>
                <Link to="../GaSH" className="product-item">
                    <img src="https://vcdn-ngoisao.vnecdn.net/2021/07/22/217055203-863892671173150-7343-2657-9420-1626889020_m_900x540.jpg" alt="Product 2" />
                    <div className="product-info">
                        <p className="product-name">Gà Viên Sốt Hàn</p>
                        <p className="product-price">49k/ 1 suất</p>
                    </div>
                </Link>
                
            </div>
        </div>
    );
}

export default Ga;
