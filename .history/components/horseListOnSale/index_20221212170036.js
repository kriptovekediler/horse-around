import cn from "classnames";
import styles from "./styles.module.css";
import { useAccount } from "../web3/hooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { AccordionButton } from "react-bootstrap";
import Link from "next/link";
import { id } from "ethers/lib/utils";

export default function HorseListOnSale({ horses, count, user }) {
  const { account } = useAccount();
  const [filteredHorse, setFilteredHorse] = useState();
  var objToArr = Object.entries(user).map(([key, value]) => value);
  var objToArrHorse = Object.entries(horses.detail).map(
    ([key, value]) => value
  );
  // user status 3 olanlar çekilecek.
  // daha sonra horseId alınıp atları listelenecek.

  useEffect(() => {
    const filteredUser = objToArr.find(
      (user) => user?.publicAddress == account?.data
    );

    const filteredHorses = filteredUser?.myHorses?.map((id) => {
      console.log("iddddddd", id);
      const filtered = objToArrHorse?.filter(
        (i) => id.status === 3 && i.horseId == id.horseId
      );
      return {
        ...filtered,
      };
    });

    setFilteredHorse(filteredHorses);
  }, [user]);

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
        {filteredHorse?.map((horse, index) => {
          return (
            <Link
              key={index}
              href={{
                pathname: `/profile/collection/${horse[0]?.horseId}`,
                comment: "comment-1", // this is the comment
              }}
            >
              <a>
                <img
                  key={index}
                  src={
                    horse[0]?.image
                      ? horse[0]?.image
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
        })}
      </div>
    </div>
  );
}
