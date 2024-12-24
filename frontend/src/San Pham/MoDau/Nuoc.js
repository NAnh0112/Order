import React from 'react';
import '../Product.css'; 
import { Link } from 'react-router-dom'
const Nuoc = () => {
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
            <Link to="../sprite" className="product-item">
    <img src="../img/07.PNG" alt="Product 1" />
    <div className="product-info">
        <p className="product-name">Sprite</p>
        <p className="product-price">10k/ 1 chai</p>
    </div>
</Link>
                <Link to="../coca" className="product-item">
                    <img src="https://cafebiz.cafebizcdn.vn/zoom/700_438/2015/cocacola-1442439070176-crop-1442456236110.jpg" alt="Product 2" />
                    <div className="product-info">
                        <p className="product-name">Coca</p>
                        <p className="product-price">10k/ 1 chai</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Nuoc;
