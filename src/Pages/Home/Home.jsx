import React from "react";
import Banner from "../Banner/Banner";
import CategorySlider from "../CategorySlider/CategorySlider";
import Popular from "../../Components/PopularMenu/Popular";
import Featured from "../Fetured/Featured";
import Testimonial from "../Testimonial/Testimonial";
import useDynamicTitle from "../../Hooks/useDynamicTitle";

const Home = () => {
  useDynamicTitle('Home')
  return (
    <div className="container mx-auto lg:max-w-[90%]">
      <Banner />
      <CategorySlider />
      {/* TODO: ADD ONE SECTION  */}
      <Popular />
      {/* TODO: ADD ONE SECTION  */}
      <Featured />
      <Testimonial />
    </div>
  );
};

export default Home;
