import React, { useState, useEffect } from 'react';
import './Introduce.css';

const Introduce = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    "https://vegafood.vn/storage/2021/09/378/mceu-74479187731630918785717.png",
    "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/8/23/1084128/Isushi.jpeg",
    "https://blog.dktcdn.net/files/nhan-vien-phuc-vu-nha-hang-1.jpg"
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length); 
    }, 3000); 
    return () => clearInterval(intervalId);
  }, [slides.length]);

  return (
    <div className="main-content">
      <h1 className="herr-von-muellerhoff-regular">Welcome to Rainbow</h1>
      <div className="goals">
        <div className="goal">
          <h2 style={{ color: '#000' }}>MỤC TIÊU</h2>
          <p style={{ color: '#808080' }}>Cung cấp món ăn ngon, dịch vụ chất lượng và không gian thoải mái.</p>
        </div>
        <div className="goal">
          <h2 style={{ color: '#000' }}>SỨ MỆNH</h2>
          <p style={{ color: '#808080' }}>Chúng tôi cam kết mang lại sự hài lòng cho khách hàng.</p>
        </div>
        <div className="goal">
          <h2 style={{ color: '#000' }}>CHIẾN LƯỢC</h2>
          <p style={{ color: '#808080' }}>Tạo ra các sản phẩm độc đáo với phong cách ấn tượng.</p>
        </div>
      </div>
      <div className="slider">
        {slides.map((slide, index) => (
          <div  key={index}  className={`slide fade ${index === currentSlide ? 'active' : ''}`}>
          <img src={slide} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Introduce;
