import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import img1 from '../../assets/home/slide1.jpg'
import img2 from '../../assets/home/slide2.jpg'
import img3 from '../../assets/home/slide3.jpg'
import img4 from '../../assets/home/slide4.jpg'
import img5 from '../../assets/home/slide5.jpg'
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
const CategorySlider = () => {
  return (
    <>
    <SectionTitle subheading={'From 11.00 to 10pm'} heading={"Order Online"}/>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper my-6"
      >
        <SwiperSlide>
            <img src={img1} alt="" />
            <p className="text-center text-2xl -mt-10">SALADS</p>
        </SwiperSlide>
        <SwiperSlide>
            <img src={img2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={img3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={img4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={img5} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default CategorySlider;
