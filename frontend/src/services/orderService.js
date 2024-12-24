import axios from 'axios';

const API_URL = 'http://localhost:3001/api/orders';

export const getOrders = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createOrder = async (order) => {
    try {
        if (typeof order.price === 'string') {
            order.price = parseFloat(order.price);
        }
        
        console.log('Đơn hàng đang được gửi:', order); // Ghi lại đơn hàng
        const response = await axios.post(`${API_URL}/create`, order);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error);
        throw error;
    }
};