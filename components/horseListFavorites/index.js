import cn from "classnames";
import styles from "./styles.module.css";
import { useAccount } from "../web3/hooks";
import axios from "axios";
import { useEffect } from "react";
import { AccordionButton } from "react-bootstrap";
import Link from "next/link";

export default function HorseListFavorites({ horses, count }) {
  const { account } = useAccount();

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
              Current Horses <span className="ml-4 inline-block">{count}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="col-span-7 grid grid-cols-4 gap-4 text-end">
        {Object.entries(horses.detail).map(([key, value]) => {
          if (value.publicAddress === account.data) {
            return (
              <Link
                href={{
                  pathname: `/profile/myHorse/${value.horseId}`,
                  comment: "comment-1", // this is the comment
                }}
              >
                <a>
                  <img
                    key={key}
                    src={
                      value?.image
                        ? value.image
                        : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                    }
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