import React, { useState, useEffect } from "react";
import "./Use.css";

const Use = () => {
  const [dineInOrders, setDineInOrders] = useState([]);

  useEffect(() => {
    const fetchDineInOrders = async () => {
      try {
          const response = await fetch('http://localhost:3001/api/orders/dine-in'); 
          const data = await response.json();
          console.log('Dữ liệu nhận được từ API:', data); 
          setDineInOrders(data);
      } catch (error) {
          console.error('Error fetching dine-in orders:', error);
      }
    };

    fetchDineInOrders();
  }, []);

  const changeStatus = async (button, orderId) => {
    let newStatus;
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

        if (!response.ok) {
            throw new Error('Failed to delete order');
        }

      
        setDineInOrders(dineInOrders.filter((order) => order.product_id !== id));
    } catch (error) {
        console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="use">
        <table>
            <thead>
                <tr>
                    <th>Sản Phẩm</th>
                    <th>Số Lượng</th>
                    <th>Số Bàn </th>
                    <th>Thông Tin Khách Hàng</th>
                    <th>Ghi Chú</th>
                    <th>Tổng Giá</th>
                    <th>Trạng Thái</th>
                    <th> </th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(dineInOrders) && dineInOrders.length > 0 ? (
                    dineInOrders.map((order) => (
                        <tr key={order.product_id}>
                            <td>{order.product_name}</td> 
                            <td>{order.quantity}</td>
                            <td>{order.seat}</td>
                            <td>{order.customer_name}</td>
                            <td>{order.note || 'Không có ghi chú'}</td> 
                            <td>{order.total_price}</td>
                            <td>              
                              <button className="status-button in-progress" onClick={(e) => changeStatus(e.target, order.product_id)}>
                                {order.status}
                              </button>
                            </td>    
                            <td>
                                <button className="delete-button" onClick={() => deleteOrder(order.product_id)}>Xóa</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">Không có dữ liệu để hiển thị</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  );
};

export default Use;