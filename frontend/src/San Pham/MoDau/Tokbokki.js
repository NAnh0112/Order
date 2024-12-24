import React from 'react';
import '../Product.css'; 
import { Link } from 'react-router-dom'
const Tokbokki = () => {
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
            <Link to="../TokbokkiTT" className="product-item">
    <img src="https://file.hstatic.net/1000155899/article/tulambanhgao_87379ab211e04025967c94f9026422c7_grande.png" alt="Product 1" />
    <div className="product-info">
        <p className="product-name">Tokbokki truyền thống</p>
        <p className="product-price">30k/ 1 suất</p>
    </div>
</Link>
                <Link to="../TokbokkiPM" className="product-item">
                    <img src="../img/01.PNG" alt="Product 2" />
                    <div className="product-info">
                        <p className="product-name">Tokbokki phô mai</p>
                        <p className="product-price">35k/ 1 suất</p>
                    </div>
                </Link>
                <Link to="../TokbokkiTD" className="product-item">
                    <img src="https://hfood.com.vn/images/images/Tokbokki_S%E1%BB%91t_T%C6%B0%C6%A1ng_%C4%90en_H%C3%A0n_Qu%E1%BB%91c.jpg" alt="Product 3" />
                    <div className="product-info">
                        <p className="product-name">Tokbokki tương đen</p>
                        <p className="product-price">35k/ 1 suất</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Tokbokki;
