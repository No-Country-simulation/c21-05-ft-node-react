import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default () => {

    const items = [
      {
        image: 'https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1728058610730-desk-mainslider-landing.png',
      },
      {
        image: 'https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1728058818869-desk-mainslider-landing-4.png',
      },
      {
        image: 'https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1728058670104-desk-mainslider-landing-1.png',
      },
      // Agregá más elementos 
    ];
  
    return (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
        >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-96  object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
};
  