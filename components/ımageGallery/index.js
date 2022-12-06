import cn from "classnames";
import { useEffect, useRef, useState } from "react";

import { FaHeart } from "react-icons/fa";
import styles from "./styles.module.css";

export default function ImageGallery({ name, image }) {
  const ref = useRef(null);
  const { onClickOutside } = {name,image};

  const [show,setShow]=useState(false)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
        setShow(false)
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ onClickOutside ]);

  

  return (
    <div className="w-full">
      <div className={styles.bigImage} onClick={()=>setShow(true)}>
        <img src={image} width="100%" style={{height:"600px"}} onClick={()=>setShow(true)}/>
        <span className={styles.likeButton} >
          <FaHeart /> 50
        </span>
      </div>
      <div className="grid grid-cols-5  mt-6 gap-10">
        <img src="https://picsum.photos/150/150" className={styles.image} />
        <img src="https://picsum.photos/150/150" className={styles.image} />
        <img src="https://picsum.photos/150/150" className={styles.image} />
        <img src="https://picsum.photos/150/150" className={styles.image} />
        <img src="https://picsum.photos/150/150" className={styles.image} />
      </div>
      {show &&
      <div className="w-full center justify-center  absolute top-8 items-center left-0 content-center flex h-screen">
        <div style={{height:"80%",width:"70%",marginTop:"-50px",marginRight:"-20px"}} className=" fixed z-50 " onClick={()=>setShow(false)}>
          <h2 className="bg-yellow-400 font-bold text-xl text-white items-start justify-start z-50  float-right text-center cursor-pointer rounded-3xl pt-1.5 pb-1.5 pr-3 pl-3 " >X</h2>
        </div>
          
         <img ref={ref} src={image} width="100%" style={{height:"80%",width:"70%"}} className="fixed  items-center justify-center z-40 "  />
      </div>
      }
      
    </div>
  );
}
