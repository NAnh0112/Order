import React, { useEffect } from 'react';

function LineChart() {
  useEffect(() => {
    const canvas = document.getElementById('myLineChart');
    const ctx = canvas.getContext('2d');

    const labels = ['T4', 'T5', 'T6', 'T7', '8', 'T9', 'T10'];
    const data = [20, 40, 30, 20, 10, 30, 50];

    const lineColor = '#007BFF';
    const pointColor = '#FF5733';

    const chartWidth = canvas.width - 100;
    const chartHeight = canvas.height - 150;
    const chartLeft = 50;
    const chartBottom = canvas.height - 50;
    const maxDataValue = Math.max(...data);
    const pointRadius = 5;
    const gap = chartWidth / (labels.length - 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas trước khi vẽ

    // Vẽ tiêu đề biểu đồ
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('Doanh Thu Của Các Tháng', canvas.width / 2, 30);

    // Vẽ các giá trị trục Y
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const yValue = (maxDataValue / 5) * i;
      const y = chartBottom - (yValue / maxDataValue) * chartHeight;
      ctx.fillText(yValue.toFixed(0), chartLeft - 10, y + 4); // Giá trị trục Y
      ctx.strokeStyle = '#ccc'; // Đường lưới ngang
      ctx.beginPath();
      ctx.moveTo(chartLeft, y);
      ctx.lineTo(chartLeft + chartWidth, y);
      ctx.stroke();
    }

    // Vẽ đường và điểm dữ liệu
    let prevX = chartLeft;
    let prevY = chartBottom - (data[0] / maxDataValue) * chartHeight;

    for (let i = 0; i < labels.length; i++) {
      const x = chartLeft + i * gap;
      const y = chartBottom - (data[i] / maxDataValue) * chartHeight;

      if (i > 0) {
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      ctx.fillStyle = pointColor;
      ctx.beginPath();
      ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.font = '14px Arial';
      ctx.fillStyle = '#000';
      ctx.fillText(labels[i], x, chartBottom + 20);

      prevX = x;
      prevY = y;
    }

    // Vẽ trục X
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(chartLeft, chartBottom);
    ctx.lineTo(chartLeft + chartWidth, chartBottom);
    ctx.stroke();

    // Vẽ trục Y
    ctx.beginPath();
    ctx.moveTo(chartLeft, chartBottom);
    ctx.lineTo(chartLeft, chartBottom - chartHeight);
    ctx.stroke();
  }, []);


return (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <canvas id="myLineChart" width="400" height="250"></canvas> {/* Adjusted size */}
  </div>
);
}

export default LineChart;
