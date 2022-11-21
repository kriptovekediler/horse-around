import cn from "classnames";

import { FaHeart } from "react-icons/fa";
import styles from "./styles.module.css";

export default function ImageGallery({ name, image }) {
  return (
    <div className="w-full">
      <div className={styles.bigImage}>
        <img src={image} width="100%" />
        <span className={styles.likeButton}>
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
    </div>
  );
}
