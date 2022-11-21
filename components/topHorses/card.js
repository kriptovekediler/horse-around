import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaArrowUp, FaArrowDown } from "react-icons/fa";
import horse from "../../public/horse/horse1.png";
import styles from "./styles.module.css";
import { useWeb3 } from "../web3/providers";
import CurrencyFormat from 'react-currency-format';
import { useEffect, useState } from "react";

export default function CardItem({ number, horse }) {
  // console.log(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(horse?.saleHistory[horse?.saleHistory.length - 1].price));
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const placeholderImage =
'https://media.istockphoto.com/id/521697371/photo/brown-pedigree-horse.jpg?s=612x612&w=0&k=20&c=x19W0K7iuQhQn_7l3wRqWq-zsbo0oRA33C3OF4nooL0='

const onImageError = (e) => {
e.target.src = placeholderImage
}
const [img,setImg]=useState("")
const [placeholder,setPlacceholder]=useState("")
useEffect(()=>{
setImg(horse?.image)
},[horse])

console.log(USDollar.format(horse?.saleHistory[horse?.saleHistory.length - 1].price))
  const { web3 } = useWeb3();
  console.log(horse.image);
  return (
    <div className={styles.cardBox}>
      <div className={styles.number}>{number}</div>
      <div className={styles.topHorseInfoBox}>
        <img
          src={img ? img : placeholderImage}
          width={100}
          height={50}
          objectFit="cover"
          className={styles.horseInfoImg}
          onError={()=>setImg("https://media.istockphoto.com/id/521697371/photo/brown-pedigree-horse.jpg?s=612x612&w=0&k=20&c=x19W0K7iuQhQn_7l3wRqWq-zsbo0oRA33C3OF4nooL0=")}
        />
       
        <div className={styles.horseInfo}>
          <div className="flex w-full justify-between shrink-0">
            <div>
              <span className={styles.horseName}>@{horse?.ownerName}</span>
              <span className={styles.statusBox}>
                <span className={styles.statusTitle}>{horse?.horseName} </span>
                <FaArrowUp className="text-green-500" />
              </span>
            </div>
            <span className="flex text-goldMetallic text-xl items-center gap-2">
              50 <FaHeart />
            </span>
          </div>
          <div className="flex w-full justify-between items-end shrink-0">
            <span className={styles.horseName}>
              {web3?.utils.fromWei(
                horse?.saleHistory[horse?.saleHistory.length - 1].price,
                "ether"
              )}{" "}
              ETH or{" "}
              <CurrencyFormat value={web3?.utils.fromWei(
                horse?.saleHistory[horse?.saleHistory.length - 1].price ,
                "ether"
              ) * 1500} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={1} />
              {" "}
            </span>
            <div className="text-white text-sm text-end">

            <CurrencyFormat value={web3?.utils.fromWei(
                horse?.saleHistory[horse?.saleHistory.length - 1].price ,
                "ether"
              ) * 1500} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={1} />

              <p>
                Earnings : <strong>{horse?.earning}</strong>
              </p>
              <p>
                Total Race : <strong>{horse?.raceCount}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
