import React, { useEffect } from "react";
import Title from "../title/";
import SliderCard from "./card";
import Slider from "react-slick";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./styles.module.css";
import Link from "next/link";

export default function MarketPlaceSlider({sellingHorses}) {
  const slider = React.useRef(null);
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    // nextArrow: <FaAngleRight />,
    // prevArrow: <FaAngleLeft />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  };


useEffect(() => {
  Object.entries(sellingHorses).map(([key, value]) => {
    console.log(value)
  }
  )
}, [sellingHorses])

  return (
    <div className={styles.contentBox}>
      <Title
        title="Marketplace"
        subTitle="FInd horses of all breeds and disciplines, buy phsical and collect the digital"
      />
      <Slider
        ref={slider}
        {...settings}
        className="marketplace-slider mt-20 -ml-10 sm:ml-0 "
      >
        {sellingHorses.map((item, index) => (
          <SliderCard key={index} horse={item} /> 
        ))}
        </Slider>
    </div>
  );
}
