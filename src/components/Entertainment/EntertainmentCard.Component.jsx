import React from "react";
import Slider from "react-slick";

const EntertainmentCard = (props) => {
  const getEventType = (src) => {
    if (src.includes('workshop')) return 'Workshops';
    if (src.includes('kids')) return 'Kids Zone';
    if (src.includes('comedy')) return 'Comedy';
    if (src.includes('music')) return 'Music';
    if (src.includes('upskill')) return 'Upskill';
    if (src.includes('games')) return 'Games';
    if (src.includes('arts')) return 'Arts & Crafts';
    if (src.includes('theatre')) return 'Theatre';
    if (src.includes('adventure')) return 'Adventure';
    return 'Entertainment';
  };

  const getEventCount = (src) => {
    if (src.includes('110%2B')) return '110+ Events';
    if (src.includes('10%2B')) return '10+ Events';
    if (src.includes('190%2B')) return '190+ Events';
    if (src.includes('120%2B')) return '120+ Events';
    if (src.includes('125%2B')) return '125+ Events';
    if (src.includes('40%2B')) return '40+ Events';
    return '20+ Events';
  };

  return (
    <>
      <div className="group w-full h-30 px-2 cursor-pointer">
        <div className="relative overflow-hidden rounded-2xl h-full">
          <img
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            src={props.src}
            alt="entertainment"
          />
          {/* Glassmorphic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          
          {/* Glass card overlay with event info */}
          <div className="absolute bottom-3 left-3 right-3 glass-card p-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <div className="text-white">
              <h4 className="font-semibold text-sm mb-1">{getEventType(props.src)}</h4>
              <p className="text-xs text-gray-300">{getEventCount(props.src)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const EntertainmentCardSlider = () => {
  const EntertainmentImage = [
    "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MTEwKyBFdmVudHM%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/workshop-and-more-web-collection-202211140440.png",
    "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MTArIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/kids-zone-collection-202211140440.png",
    "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MTkwKyBFdmVudHM%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/comedy-shows-collection-202211140440.png",
    "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MTIwKyBFdmVudHM%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/music-shows-collection-202211140440.png",
    "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MTArIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/upskill-collection-202211140440.png",
    "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MTAgRXZlbnRz,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/interactive-games-collection-202211140440.png",
    "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MTArIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/arts-crafts-collection-202211140440.png",
    "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MTI1KyBFdmVudHM%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/theatre-shows-collection-202211140440.png",
    "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-NDArIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/adventure-fun-collection-202211140440.png",
  ];

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
      <Slider {...settings}>
        {EntertainmentImage.map((image, index) => (
          <EntertainmentCard src={image} key={index} />
        ))}
      </Slider>
    </>
  );
};

export default EntertainmentCardSlider;
