import React from 'react';
import PieChart from './PieChart';
import LineChart from './LineChart';
import BarChart from './BarChart';
import "./Staticstical.css";

function Statistical() {
  return (
    <div className="statistical">
      <div className="row-1" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <div className="box-1">
          <PieChart />
        </div>
        <div className="box-2">
          <LineChart />
        </div>
      </div>
      <div className="row-2" style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div className="box-3">
          <BarChart />
        </div>
        <div className="box-4">
  <h2>Mục tiêu sắp tới:</h2>
  <ul>
    <li>Mục tiêu 1: Tăng doanh thu tháng tới</li>
    <li>Mục tiêu 2: Cải thiện chất lượng dịch vụ</li>
    <li>Mục tiêu 3: Mở rộng đối tượng khách hàng</li>
    <li>Mục tiêu 4: Giảm chi phí vận hành</li>
  </ul>
</div>
      </div>
    </div>
  );
}

export default Statistical;
