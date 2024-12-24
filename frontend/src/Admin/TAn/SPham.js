import React, { useEffect, useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../services/productService';
import './SPham.css';

const SPham = () => {
    const [products, setProducts] = useState([]);
    const [isEditMoOpen, setIsEditMoOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productStatus, setProductStatus] = useState('in-stock');
    const [productImage, setProductImage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const productList = await getProducts();
            setProducts(productList);
        };
        fetchProducts();
    }, []);

    const openEditMo = (productId) => {
        const product = products.find((p) => p.id === productId);
        setSelectedProduct(productId);
        setProductName(product.name);
        setProductPrice(product.price);
        setProductStatus(product.status);
        setProductImage(product.image);
        setIsEditMoOpen(true);
    };

    const closeEditMo = () => setIsEditMoOpen(false);

    const updateProductHandler = async () => {
        const updatedProduct = {
            name: productName,
            price: parseFloat(productPrice),
            status: productStatus,
            image: productImage,
        };
        await updateProduct(selectedProduct, updatedProduct);
        setProducts(products.map((product) => (product.id === selectedProduct ? { ...product, ...updatedProduct } : product)));
        setIsEditMoOpen(false);
    };

    const openAddMo = () => {
        setProductName('');
        setProductPrice('');
        setProductStatus('in-stock');
        setProductImage('');
        setIsEditMoOpen(true);
    };

    const addProductHandler = async () => {
        const newProduct = {
            name: productName,
            price: parseFloat(productPrice),
            status: productStatus,
            image: productImage,
        };
        const addedProduct = await addProduct(newProduct);
        setProducts([...products, { id: addedProduct.id, ...newProduct }]);
        setIsEditMoOpen(false);
    };

    const deleteProductHandler = async (productId) => {
        await deleteProduct(productId);
        setProducts(products.filter((product) => product.id !== productId));
    };

    return (
        <div className="menu-list-1">
            <button className="add-new-btn" onClick={openAddMo}>Thêm mới</button>
            <table>
                <thead>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá bán</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td><img src={product.image} alt={product.name} width="200" /></td>
                            <td>{product.name}</td>
                            <td>{product.price} VNĐ</td>
                            <td>{product.status}</td>
                            <td>
                                <div className="button-container">
                                    <button className="edit-button" onClick={() => openEditMo(product.id)}>Sửa</button>
                                    <button className="delete-button" onClick={() => deleteProductHandler(product.id)}>Xóa</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={`mo ${isEditMoOpen ? 'open' : ''}`}>
    <h2>{selectedProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h2>
    <input 
        type="text" 
        placeholder="Tên sản phẩm" 
        value={productName} 
        onChange={(e) => setProductName(e.target.value)} 
    />
    <input 
        type="number" 
        placeholder="Giá bán" 
        value={productPrice} 
        onChange={(e) => setProductPrice(e.target.value)} 
    />
    <select 
        value={productStatus} 
        onChange={(e) => setProductStatus(e.target.value)}
    >
        <option value="in-stock">Còn hàng</option>
        <option value="out-of-stock">Hết hàng</option>
    </select>
    <input 
        type="text" 
        placeholder="URL hình ảnh" 
        value={productImage} 
        onChange={(e) => setProductImage(e.target.value)} 
    />
    <div className="mo-footer">
        <button className="update-btn" onClick={selectedProduct ? updateProductHandler : addProductHandler}>
            {selectedProduct ? 'Cập nhật' : 'Thêm'}
        </button>
        <button className="close-btn" onClick={closeEditMo}>Đóng</button>
    </div>
</div>
        </div>
    );
};

export default SPham;
