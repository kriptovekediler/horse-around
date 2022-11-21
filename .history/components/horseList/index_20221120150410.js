import cn from "classnames";
import styles from "./styles.module.css";
import { useAccount } from "../web3/hooks";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";

export default function HorseList({ horses, count }) {
  const { account } = useAccount();

  useEffect(() => {
    Object.entries(horses?.detail).map(([key, value]) => {
      console.log("v,", value.image);
    });
  }, [horses]);

  return (
    <div className="grid grid-cols-12 gap-4 mb-6">
      <div className="col-span-5 flex flex-wrap items-center gap-4">
        <img src="https://picsum.photos/120/120" className="rounded-lg" />
        <div>
          <div>
            <span className={styles.horseName}>@FormUSA</span>
          </div>
          <div className="text-base">
            <span className="text-base">
              Current Horses{" "}
              <span className="ml-4 inline-block">{count || 0}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="col-span-7 grid grid-cols-4 gap-4 text-end">
        {Object.entries(horses?.detail).map(([key, value]) => {
          if (value?.publicAddress === account.data) {
            return (
              <Link
                href={{
                  pathname: `/profile/collection/${value.horseId}`,
                  comment: "comment-1", // this is the comment
                }}
              >
                <a>
                  <img
                    key={key}
                    src={value?.image}
                    width={180}
                    height={120}
                    objectFit="cover"
                    className="rounded-lg h-full"
                  />
                </a>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}
