import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const banners = [
  "https://rukminim2.flixcart.com/flick/akshay/furniture-sale.png",
  "https://rukminim2.flixcart.com/flick/akshay/mobile-banner.jpg",
  "https://rukminim2.flixcart.com/flick/akshay/electronics-sale.jpg",
];

export default function HeroCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="container mx-auto mt-3">
      <Slider {...settings}>
        {banners.map((url, i) => (
          <div key={i}>
            <img
              src={url}
              alt={`banner-${i}`}
              className="w-full rounded-xl h-[320px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
