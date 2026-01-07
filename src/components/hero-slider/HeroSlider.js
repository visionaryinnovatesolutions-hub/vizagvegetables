
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

import './HeroSlider.css';
import { heroSlider } from './../../data';

const HeroSlider = () => {
  return (
    <div className="hero-wrapper">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
      >
        {heroSlider.map(slide => (
          <SwiperSlide key={slide.id}>
            <div
              className="hero-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="container-1440">
                <div className="hero-content">
                  <h1>{slide.title}</h1>
                  <p>{slide.subtitle}</p>
                  {/* <button>{slide.buttonText}</button> */}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
