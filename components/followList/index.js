import cn from "classnames";
import { MdCheckCircle } from "react-icons/md";
import styles from "./styles.module.css";

export default function FollowList(props) {
  return (
    <div className={styles.box}>
      <div className="grid grid-cols-12 gap-4 mb-6">
        <div className="col-span-5 flex flex-wrap items-center gap-4">
          <div className="relative">
            <img src="https://picsum.photos/80/80" className="rounded-lg" />
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" absolute -right-2 -bottom-2"
            >
              <circle cx="12" cy="12" r="12" fill="#AE8B0F" />
              <path
                d="M5 12L9.54545 17L19.5455 7"
                stroke="white"
                strokeWidth="2.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div>
            <span className={styles.name}>@Alexia Cambell</span>
            <button className={styles.unfollowButton}>Unfollow</button>
          </div>
        </div>
        <div className="col-span-7 grid grid-cols-4 gap-4 text-end">
          <img
            src="https://picsum.photos/180/120"
            className="rounded-lg h-full"
          />
          <img
            src="https://picsum.photos/180/120"
            className="rounded-lg h-full"
          />

          <img
            src="https://picsum.photos/180/120"
            className="rounded-lg h-full"
          />
        </div>
      </div>
    </div>
  );
}