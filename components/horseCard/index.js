import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import horse from "../../public/horse/horse1.png";
import styles from "./styles.module.css";
import { useWeb3 } from "../web3/providers";
import { useEffect, useState } from "react";

export default function CardItem({
  name,
  image,
  ownerName,
  ownerAddress,
}) {
  const { web3 } = useWeb3();
  const placeholderImage =
  'https://media.istockphoto.com/id/521697371/photo/brown-pedigree-horse.jpg?s=612x612&w=0&k=20&c=x19W0K7iuQhQn_7l3wRqWq-zsbo0oRA33C3OF4nooL0='

const onImageError = (e) => {
  e.target.src = placeholderImage
}
const [img,setImg]=useState("")
const [placeholder,setPlacceholder]=useState("")
useEffect(()=>{
  setImg(image)
},[horse])

  return (
    <div>
      <div className={styles.cardItem}>
        <a>
          <div className={styles.cardItemImageBox}>
            {image !==
              "http://localhost:3000/bafybeidqzv6yhxqcjwsdrtvo2oxrwevc27b36orcm4hn6kyadv2ettogvu" && (
              <img 
                  src={img ? img : placeholderImage} 
                  width="100%"
                  onError={()=>setImg("https://media.istockphoto.com/id/521697371/photo/brown-pedigree-horse.jpg?s=612x612&w=0&k=20&c=x19W0K7iuQhQn_7l3wRqWq-zsbo0oRA33C3OF4nooL0=")}
                  style={{height:"300px"}}
                  />
            )}
            <div className={styles.cardHorseInfo}>
              <div>
                <h3 className={styles.horseName}>{name}</h3>
              </div>
            </div>
          </div>
        </a>
        <div className={styles.userInfo}>
          <img src="https://i.pravatar.cc/300" className={styles.userAvatar} />
          <Link href={`/owner/${ownerAddress}`}>
            <a>@{ownerName}</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
