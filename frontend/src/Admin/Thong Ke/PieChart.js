import React, { useEffect, useRef } from "react";

const PieChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Dữ liệu và màu sắc biểu đồ
    const data = [40, 60]; // Phần trăm
    const labels = ["Ăn tại quán", "Ship mang về"];
    const colors = ["rgb(225, 28, 28)", "rgb(28, 34, 225)"];

    const total = data.reduce((a, b) => a + b, 0);
    let startAngle = -Math.PI / 2; // Đường phân cách từ trên xuống, chia thành 2 phần trái/phải

    // Vẽ tiêu đề biểu đồ
    ctx.font = "14px Arial"; // Giảm kích thước chữ
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    ctx.fillText("Tình trạng hoạt động", canvas.width / 2, 20); // Tên biểu đồ ở trên cùng

    // Tâm và bán kính biểu đồ
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 20; // Dịch lên trên một chút để dành chỗ cho chú thích
    const radius = Math.min(canvas.width, canvas.height) / 4; // Giảm bán kính để biểu đồ nhỏ hơn

    // Vẽ các phần của biểu đồ
    for (let i = 0; i < data.length; i++) {
      const sliceAngle = (data[i] / total) * 2 * Math.PI; // Góc cho từng phần
      const endAngle = startAngle + sliceAngle;

      // Vẽ phần biểu đồ
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();

      // Cập nhật góc bắt đầu
      startAngle = endAngle;
    }

    // Vẽ chú thích bên dưới biểu đồ
    let legendX = 50; // Vị trí bắt đầu của chú thích theo trục X
    const legendY = canvas.height - 40; // Vị trí bên dưới biểu đồ theo trục Y

    for (let i = 0; i < labels.length; i++) {
      // Vẽ ô vuông màu
      ctx.fillStyle = colors[i];
      ctx.fillRect(legendX, legendY, 15, 15); // Giảm kích thước ô vuông màu

      // Vẽ nhãn
      ctx.font = "12px Arial"; // Giảm kích thước chữ
      ctx.fillStyle = "#000";
      ctx.textAlign = "left";
      ctx.fillText(`${labels[i]} (${data[i]}%)`, legendX + 25, legendY + 12);

      // Di chuyển vị trí tiếp theo cho nhãn
      legendX += 150; // Khoảng cách giữa các chú thích
    }
  }, []);


return (
  <div className="box-1" style={{ textAlign: "center" }}>
    <canvas ref={canvasRef} width={300} height={220}></canvas> 
  </div>
);
};

export default PieChart;
