import React from "react";
import Slider from "react-slick";
import Poster from "../Poster/Poster.Component";

const PosterSlider = (props) => {
  const { title, subtitle, posters, isDark } = props;

  const settings = {
    infinte: false,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col items-start sm:ml-3 my-4">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-300 text-sm md:text-base">
          {subtitle}
        </p>
      </div>
      <div className="poster-slider-container">
        <Slider {...settings}>
          {posters.map((each, index) => (
            <Poster {...each} isDark={isDark} key={index} />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default PosterSlider;
