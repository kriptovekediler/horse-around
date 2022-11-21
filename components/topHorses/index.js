import React from "react";
import Title from "../title/";
import Card from "./card";
import JoinBanner from "../joinBanner";
import Slider from "react-slick";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./styles.module.css";
import Link from "next/link";

export default function TopHorses({topHorses}) {
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
  return (
    <div className={styles.topHorsesBox}>
      <Title
        title="Tophorses"
        subTitle="Select from the highest demands"
        action
        actionText="View All"
      />
      <div className={styles.horsesLists}>
        {topHorses.map((item,index) => (
          <Link href={`/detail/${item?.horseId}`}>
            <a target={'_blank'}>
              <Card key={index} number={index+1} horse={item} />
            </a>
          </Link>
        ))}
      </div>
      <JoinBanner />
    </div>
  );
}
