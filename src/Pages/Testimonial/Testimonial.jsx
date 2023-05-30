import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/review")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <section className="my-8 py-6">
      <SectionTitle
        heading={"Testimonials"}
        subheading={"What Our Clients Say"}
      />
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="my-8 flex flex-col justify-center text-center space-y-3">
              <Rating
                style={{ maxWidth: 180, margin: "auto" }}
                value={review.rating}
                readOnly
              />
              <FaQuoteLeft size={40} style={{ margin: "1rem auto" }} />
              <p>{review.details}</p>
              <h2 className="text-2xl text-orange-400">{review.name}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
