import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCartItems, updateCartItem, addToCart } from '../services/cartService';
import { deleteCartItemByProductId } from '../services/cartService'; 
import { getProductById } from '../services/productService'; 
import './Shop.css';

const Shop = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const fetchedItems = await getCartItems();
                setCartItems(fetchedItems); 
                setTotalPrice(fetchedItems.reduce((total, item) => total + item.price * item.quantity, 0));
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
        fetchCartItems();
    }, []);

    const handleAddToCart = async (product) => {
        const cartItem = {
            product_id: product.id,
            quantity: 1,
            price: product.price,
        };
    
        try {
            const response = await addToCart(cartItem); 
            console.log('Response from addToCart:', response);
    
            if (!response.id) {
                console.error('API không trả về id:', response);
                alert('Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.');
                return;
            }
    
            const productDetails = await getProductById(cartItem.product_id); 
            const newCartItem = {
                ...cartItem,
                cart_id: response.id, 
                product_name: productDetails ? productDetails.name : 'Unknown Product', 
            };
    
            setCartItems((prevItems) => [...prevItems, newCartItem]); 
            setTotalPrice((prevTotal) => prevTotal + product.price); 
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
            alert(`Không thể thêm sản phẩm vào giỏ hàng: ${error.message}`);
        }
    };

    const handleQuantityChange = async (item, change) => {
        const newQuantity = item.quantity + change;
        if (newQuantity < 1) return; 
        setCartItems(prevItems => {
            return prevItems.map(cartItem => {
                if (cartItem.product_id === item.product_id) {
                    return { ...cartItem, quantity: newQuantity }; 
                }
                return cartItem;
            });
        });
        await updateCartItem(item.product_id, { quantity: newQuantity });
        setTotalPrice(cartItems.reduce((total, item) => total + item.price * item.quantity, 0)); 
    };

    const handleRemoveItem = async (item) => {
        console.log('Deleting product from cart with product_id:', item.product_id);
        try {
            await deleteCartItemByProductId(item.product_id);
            setCartItems(prevItems => prevItems.filter(cartItem => cartItem.product_id !== item.product_id));
        } catch (error) {
            console.error('Error deleting product:', error);
            alert(`Could not delete product from cart: ${error.message}`); 
        }
    };

    const handleCheckoutClick = () => {
        if (cartItems.length === 0) {
            alert('Giỏ hàng của bạn trống. Vui lòng thêm sản phẩm trước khi thanh toán.');
            return;
        }
        console.log('Các sản phẩm trong giỏ hàng trước khi thanh toán:', cartItems); 
        navigate('/pay', {
            state: {
                items: cartItems.map((item) => ({
                    product_id: item.product_id,
                    price: item.price,
                    quantity: item.quantity,
                    seat: item.seat,
                    cart_id: item.id, 
                })),
                totalPrice,
            },
        });
    };
    
    return (
        <div className="shoping">
            <h1>Giỏ Hàng </h1>
            {cartItems.length === 0 ? (
                <p>Giỏ Hàng Trống</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.product_id}>
                                <span>{item.product_name}</span>
                                <span>{item.price}</span>
                                <div className="quantity-container">
                                    <span>Số Lượng: {item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(item, 1)}>+</button>
                                    <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                                </div>
                                <div className="buttons-container">
                                    <button onClick={() => handleRemoveItem(item)}>Xóa</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h2>Tổng Giá: {totalPrice} VNĐ</h2>
                    <button onClick={handleCheckoutClick}>Thanh Toán</button>
                </div>
            )}
        </div>
    );
};

export default Shop;