import React, { useState, useEffect } from 'react';
import './Ship.css';

const Ship = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/orders'); 
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const changeStatus = async (button, orderId) => {
    let newStatus;

    // Xác định trạng thái mới dựa trên trạng thái hiện tại
    switch (button.textContent) {
        case 'Preparing':
            newStatus = 'Shipping';
            break;
        case 'Shipping':
            newStatus = 'Delivered';
            break;
        default:
            newStatus = 'Preparing';
    }

    button.textContent = newStatus; 
    button.classList.toggle('in-progress'); 
    button.classList.toggle('completed'); 

    try {
        const response = await fetch(`http://localhost:3001/api/orders/${orderId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        });

        // Thêm console log để kiểm tra phản hồi
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);

        if (!response.ok) {
            throw new Error('Failed to update order status');
        }
    } catch (error) {
        console.error('Error updating order status:', error);
    }
};

const deleteOrder = async (id) => {
  try {
      const response = await fetch(`http://localhost:3001/api/orders/${id}`, {
          method: 'DELETE',
      });

      // Thêm console log để kiểm tra phản hồi
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
          throw new Error('Failed to delete order');
      }

      setOrders(orders.filter((order) => order.product_id !== id));
  } catch (error) {
      console.error('Error deleting order:', error);
  }
};

  
  return (
    <div className="ship">
      <table>
        <thead>
          <tr>
            <th>Sản Phẩm</th>
            <th>Số Lượng</th>
            <th>Thông Tin Khách Hàng</th>
            <th>Ghi Chú</th>
            <th>Tổng Tiền</th>
            <th>Shipper</th>
            <th>Trạng Thái</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.product_id}>
              <td>{order.product_name}</td> 
              <td>{order.quantity}</td>
              <td>
                {order.customer_name}<br />
                Địa chỉ: {order.address}<br />
                Số điện thoại: {order.customer_phone}
              </td>
              <td>{order.note || 'Không có ghi chú'}</td>
              <td>{order.total_price}</td>
              <td>{order.shipper}</td>
              <td>              
                <button className="status-button in-progress" onClick={(e) => changeStatus(e.target, order.product_id)}>
                  {order.status}
                </button>
             </td>            
              <td>
                <button className="delete-button" onClick={() => deleteOrder(order.product_id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ship;