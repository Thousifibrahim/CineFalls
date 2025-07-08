import React, { useState } from "react";
import HeroSlider from "react-slick";
import { NextArrow, PrevArrow } from "./Arrows.Component";

const HeroCarousel = () => {
  const [images] = useState([
    {
      adult: false,
      backdrop_path: "/jZIYaISP3GBSrVOPfrp98AMa8Ng.jpg",
      genre_ids: [16, 35, 10751, 14, 10749],
      id: 976573,
      original_language: "en",
      original_title: "Elemental",
      overview:
        "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.",
      popularity: 2723.167,
      poster_path: "/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg",
      release_date: "2023-06-14",
      title: "Elemental",
      video: false,
      vote_average: 7.8,
      vote_count: 1526,
    },
    {
      adult: false,
      backdrop_path: "/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
      genre_ids: [18, 36],
      id: 872585,
      original_language: "en",
      original_title: "Oppenheimer",
      overview:
        "The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.",
      popularity: 631.846,
      poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      release_date: "2023-07-19",
      title: "Oppenheimer",
      video: false,
      vote_average: 8.3,
      vote_count: 2745,
    },
    {
      adult: false,
      backdrop_path: "/waBWlJlMpyFb7STkFHfFvJKgwww.jpg",
      genre_ids: [28, 18],
      id: 678512,
      original_language: "en",
      original_title: "Sound of Freedom",
      overview:
        "The story of Tim Ballard, a former US government agent, who quits his job in order to devote his life to rescuing children from global sex traffickers.",
      popularity: 438.828,
      poster_path: "/kSf9svfL2WrKeuK8W08xeR5lTn8.jpg",
      release_date: "2023-07-03",
      title: "Sound of Freedom",
      video: false,
      vote_average: 8.1,
      vote_count: 381,
    },
    {
      adult: false,
      backdrop_path: "/fIQfdZ6fqf9mIbqBaexbgIEIk5K.jpg",
      genre_ids: [35],
      id: 864168,
      original_language: "en",
      original_title: "Joy Ride",
      overview:
        "When Audrey's business trip to Asia goes sideways, she enlists the aid of Lolo, her irreverent, childhood best friend who also happens to be a hot mess; Kat, her college friend turned Chinese soap star; and Deadeye, Lolo's eccentric cousin. Their no-holds-barred, epic experience becomes a journey of bonding, friendship, belonging, and wild debauchery that reveals the universal truth of what it means to know and love who you are.",
      popularity: 237.469,
      poster_path: "/lTZ3r9NBdbrR6NA90v3hFYqd6TC.jpg",
      release_date: "2023-06-22",
      title: "Joy Ride",
      video: false,
      vote_average: 6.6,
      vote_count: 131,
    },
  ]);

  const settingsLG = {
    arrows: true,
    slidesToShow: 3,
    infinite: true,
    dots: true,
    // speed: 500,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
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

  const settings = {
    arrows: true,
    slidesToShow: 3,
    infinite: true,
    dots: true,
    // speed: 500,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
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
      {/* Mobile and Tablet Carousel */}
      <div className="lg:hidden">
        <HeroSlider {...settings}>
          {images.map((image, index) => (
            <div className="w-full h-56 md:h-80 py-3 px-2" key={index}>
              <div className="relative w-full h-full overflow-hidden rounded-2xl group">
                <img
                  src={`https://image.tmdb.org/t/p/original${image.backdrop_path}`}
                  alt="Hero Banner"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                {/* Glassmorphic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="glass-card p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {image.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-200 line-clamp-2 mb-3">
                      {image.overview}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {image.vote_average.toFixed(1)}
                      </div>
                      <button className="glass-button px-4 py-2 rounded-full text-white text-sm font-medium hover:scale-105 transition-all duration-300">
                        Watch Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </HeroSlider>
      </div>

      {/* Desktop Carousel */}
      <div className="hidden lg:block">
        <HeroSlider {...settingsLG}>
          {images.map((image, index) => (
            <div className="w-full h-96 px-3 py-3" key={index}>
              <div className="relative w-full h-full overflow-hidden rounded-2xl group cursor-pointer">
                <img
                  src={`https://image.tmdb.org/t/p/original${image.backdrop_path}`}
                  alt="Hero Banner"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                {/* Glassmorphic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="glass-card p-6 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {image.title}
                    </h3>
                    <p className="text-gray-200 line-clamp-3 mb-4 leading-relaxed">
                      {image.overview}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {image.vote_average.toFixed(1)}
                        </div>
                        <span>•</span>
                        <span>{image.release_date.split('-')[0]}</span>
                      </div>
                      <button className="glass-button px-6 py-2.5 rounded-full text-white font-medium hover:scale-105 transition-all duration-300">
                        Watch Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </HeroSlider>
      </div>
    </>
  );
};

export default HeroCarousel;
