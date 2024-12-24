import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0); 
  const swiperRef = useRef(null); 
  const slideCount = 3; 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount); 
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(currentSlide); 
    }
  }, [currentSlide]);

  return (
    <div className="slider-container">
      <Swiper loop={true}  pagination={{ clickable: true }} navigation={true} modules={[Navigation, Pagination]} className="swiper-container" onSwiper={(swiper) => (swiperRef.current = swiper)} >
        <SwiperSlide style={{ backgroundImage: "url('https://noithatthuangia.vn/wp-content/uploads/2021/08/thiet-ke-nha-hang-han-quoc-BBQ.jpg')",}} >
          <div className="text-center ant-caption container">
            <div className="small-title">RAINBOW</div>
            <div className="big-title">Đậm vị xứ kim chi</div>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ backgroundImage: "url('https://xuongaogiadinh.vn/wp-content/uploads/2022/07/dong-phuc-gogi-house-1.jpg')",}} >
          <div className="text-center ant-caption container">
            <div className="small-title">Năng Lượng</div>
            <div className="big-title">Cuốn hút và Trẻ trung</div>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ backgroundImage: "url('https://torkifood.vn/wp-content/uploads/2024/05/list-mon-do-an-vat-han-quoc-quoc-dan.jpg')",}}>
          <div className="text-center ant-caption container">
            <div className="small-title">Món Ăn Ngon</div>
            <div className="big-title">Với vị cay và nóng</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Home;
