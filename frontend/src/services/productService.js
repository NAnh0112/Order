import axios from 'axios';

const API_URL = 'http://localhost:3001/api/products'; 

export const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Đảm bảo API trả về danh sách sản phẩm
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};


export const addProduct = async (product) => {
    try {
        const response = await axios.post(API_URL, product);
        return response.data; 
    } catch (error) {
        console.error('Error adding product:', error);
        return null;
    }
};

export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, product);
        return response.data; 
    } catch (error) {
        console.error('Error updating product:', error);
        return null;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error deleting product:', error);
        return null;
    }
};

// Lấy thông tin sản phẩm theo ID
export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return null;
    }
};