import React from 'react';
import '../Product.css'; 
import { Link } from 'react-router-dom'
const Com = () => {
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
    <img src="../img/03.PNG" alt="Product 1" />
    <div className="product-info">
        <p className="product-name">Cơm Trộn </p>
        <p className="product-price">30k/ 1 suất</p>
    </div>
</Link>
                
            </div>
        </div>
    );
}

export default Com;
