import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axiosConfig'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const NewsCarousel = () => {
  const [newsItems, setNewsItems] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const getNewsItems = async () => {
    try {
      const response = await api.get('/news-carousel')
      setNewsItems(response.data)
    } catch (error) {
      console.error('Error al obtener novedades:', error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getNewsItems()
  }, [])

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="appear"
    >
      {
        isLoading
          ? <SwiperSlide>
            <div className="news-item animate-pulse" > </div>
          </SwiperSlide>

          : newsItems.map((item, index) => (
            <SwiperSlide key={item._id} >
              <Link to={item.url} >
                <div
                  className="news-item"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                </div>
              </Link>
            </SwiperSlide>
          ))
      }
    </Swiper>
  );
};

export default NewsCarousel