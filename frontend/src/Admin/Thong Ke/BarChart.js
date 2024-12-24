import React, { useEffect } from "react";

function BarChart() {
  useEffect(() => {
    const canvas = document.getElementById("myBarChart");
    const ctx = canvas.getContext("2d");

    const labels = ["Tokbokki", "Gà Popcorn", "Cơm Trộn", "Mỳ Trộn", "Kimbap"];
    const data = [50, 120, 90, 60, 80];
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF"];

    const barWidth = 30;
    const gap = 30;
    const chartHeight = canvas.height - 80; 
    const chartBottom = canvas.height - 40; 
    const chartLeft = 30; 
    const maxDataValue = Math.max(...data);

    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // Vẽ tiêu đề biểu đồ
    ctx.font = "14px Arial"; 
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    ctx.fillText("Tình trạng bán hàng", canvas.width / 2, chartBottom - chartHeight - 10);

    // Vẽ các đường lưới ngang và giá trị trục Y
    const numTicks = 5;
    ctx.strokeStyle = "#ccc";
    ctx.font = "10px Arial"; 
    ctx.textAlign = "right";
    for (let i = 0; i <= numTicks; i++) {
      const yValue = (maxDataValue / numTicks) * i;
      const y = chartBottom - (yValue / maxDataValue) * chartHeight;

      // Đường lưới
      ctx.beginPath();
      ctx.moveTo(chartLeft, y);
      ctx.lineTo(canvas.width - 20, y);
      ctx.stroke();

      // Giá trị trục Y
      ctx.fillStyle = "#000";
      ctx.fillText(yValue.toFixed(0), chartLeft - 5, y + 3);
    }

    // Vẽ các cột
    for (let i = 0; i < labels.length; i++) {
      const barHeight = (data[i] / maxDataValue) * chartHeight;
      const x = chartLeft + i * (barWidth + gap); // Vị trí x đã điều chỉnh

      // Vẽ cột
      ctx.fillStyle = colors[i];
      ctx.fillRect(x, chartBottom - barHeight, barWidth, barHeight);

      // Nhãn bên dưới cột
      ctx.font = "10px Arial"; // Kích thước chữ
      ctx.textAlign = "center";
      ctx.fillStyle = "#000";
      ctx.fillText(labels[i], x + barWidth / 2, chartBottom + 15);
    }

    // Vẽ trục X và Y
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(chartLeft, chartBottom);
    ctx.lineTo(chartLeft, chartBottom - chartHeight);
    ctx.moveTo(chartLeft, chartBottom);
    ctx.lineTo(canvas.width - 20, chartBottom);
    ctx.stroke();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <canvas id="myBarChart" width="400" height="200"></canvas> {/* Kích thước đã điều chỉnh */}
    </div>
  );
}

export default BarChart;