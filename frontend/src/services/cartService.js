import axios from 'axios';
const API_URL = 'http://localhost:3001/api/carts/';

export const getCartItems = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/carts');
        if (!response.ok) {
            throw new Error('Failed to fetch cart items');
        }
        const data = await response.json();
        console.log('Fetched data:', data);  
        return data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};

export const addToCart = async (product) => {
    try {
        const cartItem = {
            product_id: product.product_id,
            quantity: product.quantity,
            note: product.note || null,
            price: product.price,     
        };
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItem),
            mode: 'cors',
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Lỗi: ${errorData.error || 'Phản hồi mạng không ổn'}`);
        }
        
        const data = await response.json();
        return data; 
        
    } catch (error) {
        console.error('Lỗi khi thêm vào giỏ hàng:', error);
        throw error;
    }
};

export const updateCartItem = async (product_id, updatedItem) => {
    try {
        const response = await axios.put(`${API_URL}/product/${product_id}`, updatedItem);
        return response.data; 
    } catch (error) {
        console.error('Error updating cart item:', error);
        return null;
    }
};

export const deleteCartItemByProductId = async (productId) => {
    try {
        const response = await fetch(`http://localhost:3001/api/carts/product/${productId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete cart item');
        }

        const data = await response.json();
        console.log('Deleted cart item:', data);
        return data;
    } catch (error) {
        console.error('Error deleting cart item:', error);
        throw error;
    }
};

