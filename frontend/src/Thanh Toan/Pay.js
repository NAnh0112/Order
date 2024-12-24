import React, { useState } from 'react';
import './Pay.css';
import { useLocation } from 'react-router-dom';
import { createOrder } from '../services/orderService';

const Pay = () => {
    const [selectedProductId, setSelectedProductId] = useState(null); 
    const [selectedQuantity, setSelectedQuantity] = useState(1); 
    const [isModalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('Vui lòng nhập thông tin để tiếp tục order');
    const [orderType, setOrderType] = useState(null);  
    const [tableNumber, setTableNumber] = useState(null); 
    const [deliveryInfo, setDeliveryInfo] = useState({ name: '', phone: '', address: '' }); 
    const [isConfirming, setIsConfirming] = useState(false); 
    const [successMessage, setSuccessMessage] = useState('');
    const [orderDetails, setOrderDetails] = useState([]);
    const location = useLocation();
    
const { items, totalPrice } = location.state || { items: [], totalPrice: 0 };
console.log('Các sản phẩm nhận được trong Pay.js:', items);

    const handleOrderTypeSelection = (type) => {
        setOrderType(type); 
        setModalContent('');
        setTableNumber(null); 
        setDeliveryInfo({ name: '', phone: '', address: '' });  
        setIsConfirming(false); 
    };

    const handleTableSelect = (table) => {
        setTableNumber(table);
        setModalContent(`Bạn đã chọn bàn số ${table}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        setIsConfirming(true);
    };

    const handleConfirm = async () => {
        const customerName = prompt("Nhập tên khách hàng:");
        let seat = null;
        let address = null;
        const dineType = orderType;
    
        let phone = null;
        if (dineType === 'Takeaway') {
            phone = prompt("Nhập số điện thoại:"); // Lấy số điện thoại từ người dùng
            if (!phone) {
                alert("Số điện thoại không được để trống.");
                return; // Ngăn không cho gửi nếu số điện thoại không được cung cấp
            }
        }
    
        if (dineType === 'Dine-in') {
            seat = prompt("Nhập số ghế:");
            if (!seat) {
                alert("Số ghế không được để trống.");
                return; // Ngăn không cho gửi nếu số ghế không được cung cấp
            }
        } else if (dineType === 'Takeaway') {
            address = prompt("Nhập địa chỉ:");
            if (!address) {
                alert("Địa chỉ không được để trống.");
                return; // Ngăn không cho gửi nếu địa chỉ không được cung cấp
            }
        }
    
        for (const item of items) {
            if (!item.cart_id) {
                console.error('cart_id bị thiếu:', item);
                alert('cart_id không tồn tại. Vui lòng thử lại.');
                continue;
            }
    
            const total_price = item.price * item.quantity; 
    
            const order = {
                cart_id: item.cart_id,
                product_id: item.product_id,
                quantity: item.quantity,
                type_order: dineType,
                seat: seat,
                ...(dineType === 'Takeaway' && { address: address }),
                customer_name: customerName,
                ...(dineType === 'Takeaway' && { customer_phone: phone }), 
                total_price: total_price,
                status: 'Preparing' 
            };
    
            try {
                const response = await createOrder(order);
                console.log('Đơn hàng đã được tạo thành công:', order);
                setSuccessMessage("Đơn hàng của bạn đã được đặt thành công! Xin vui lòng đợi một lúc!"); 
                setOrderDetails(prevDetails => [...prevDetails, { ...order, product_name: item.product_name }]);
            } catch (error) {
                console.error('Lỗi khi tạo đơn hàng:', error);
                alert(`Không thể tạo đơn hàng: ${error.message}`);
            }
        }
    };

    const handleBack = () => {
        setIsConfirming(false); 
    };

    const isConfirmButtonVisible = () => {
        return orderType !== null;
    };

    return (
        <div className="shopping">
            <div className="shopping -header">
                <h1>Dịch Vụ</h1>
            </div>

            <div className="buttons">
                <button onClick={() => setModalActive(true)}>Tiếp tục để order</button>
            </div>

            {isModalActive && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-row">
                                <div className="modal-cell">
                                    <h2>{modalTitle}</h2>
                                </div>
                            </div>

                            {isConfirming ? (
                                <div className="modal-row">
                                    <div className="modal-cell">
                                        <h2>Bạn có chắc chắn không?</h2>
                                        <div className="modal-actions">
                                            <button onClick={handleBack}>Quay lại </button>
                                            <button onClick={handleConfirm}>Chắc chắn</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {modalContent === '' && (
                                        <div className="modal-row">
                                            <div className="modal-cell">
                                                <div className="order-selection">
                                                    <button onClick={() => handleOrderTypeSelection('Dine-in')}>Ăn tại quán</button>
                                                    <button onClick={() => handleOrderTypeSelection('Takeaway')}>Ship mang về</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {orderType === 'Dine-in' && modalContent === '' && (
                                        <div className="modal-row">
                                            <div className ="modal-cell">
                                                <h2>Chọn bàn:</h2>
                                                {[1, 2, 3, 4, 5, 6, 7].map((table) => (
                                                    <button key={table} onClick={() => handleTableSelect(table)}> Bàn {table} </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {orderType === 'Takeaway' && modalContent === '' && (
                                        <div className="modal-row">
                                            <div className="modal-cell">
                                                <h3>Nhập thông tin giao hàng:</h3>
                                                <input type="text" name="name" placeholder="Tên" value={deliveryInfo.name} onChange={handleInputChange} />
                                                <input type="text" name="phone" placeholder="Số điện thoại" value={deliveryInfo.phone} onChange={handleInputChange} />
                                                <input type="text" name="address" placeholder="Địa chỉ" value={deliveryInfo.address} onChange={handleInputChange}/>
                                            </div>
                                        </div>
                                    )}

                                    <div className="modal-row">
                                        <div className="modal-cell modal-actions">
                                            {isConfirmButtonVisible() && (
                                                <button onClick={handleSubmit}>Xác nhận</button>
                                            )}
                                            <button onClick={() => setModalActive(false)}>Đóng</button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                    <h3>Thông tin đơn hàng:</h3>
                    <ul>
                        {orderDetails.map((order, index) => (
                            <li key={index}>
                                <p>Tên khách hàng: {order.customer_name}</p>
                                {order.type_order === 'Dine-in' && <p>Số ghế: {order.seat}</p>}
                                {order.type_order === 'Takeaway' && <p>Địa chỉ: {order.address}</p>}
                                <p>Tổng giá: {order.total_price}</p>
                                <p>Tình trạng đơn hàng: {order.status}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Pay;