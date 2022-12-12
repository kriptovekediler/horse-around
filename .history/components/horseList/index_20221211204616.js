import cn from "classnames";
import styles from "./styles.module.css";
import { useAccount } from "../web3/hooks";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useSWR from "swr";

export default function HorseList({ horses, count, user }) {
  // const { account } = useAccount();
  console.log("horse list");

  useEffect(() => {
    console.log("filtered");
    Object.entries(horses?.detail).map(([key, value]) => {
      console.log("horseıd", value?.horseId);
      const filter = user[1]?.myHorses?.map((i) => console.log("mappppppi", i));
      console.log("filterrrrrrrrrr", filter);
    });
  }, []);

  //const myHorse = user?.myHorses?.filter((i) => i.horseId == 3);

  // const values = Object.values(horses.detail);
  // console.log(
  //   "Values",
  //   values.filter((element) => element.horseId == arr)
  // );
  // console.log("USERRR", user);

  // const [arr, setArr] = useState([]);
  // useEffect(() => {
  //   for (let index = 0; index < user?.myHorses?.length; index++) {
  //     console.log(values.filter((element) => element.horseId == index));
  //   }
  // }, [user, horses]);
  // console.log("AR", arr);

  // const [userId, setUserId] = useState();
  // useEffect(() => {
  //   for (let i = 0; user?.myHorses?.length; i++) {}
  // });
  // const [userIds, setUserIds] = useState();
  // // const incrementId = useCallback(() => {
  // for (let i = 0; user?.myHorses?.length; i++) {
  //   // setUserIds(user?.myHorses[i]?.horseId);
  //   console.log("I", i);
  // }
  // }, [userIds]);

  // console.log("USermuser", user?.myHorses);
  // for (let i = 0; user?.myHorses?.length; i++) {
  //   setUserIds(user?.myHorses[i]?.horseId);
  // }
  // console.log("UserIds", userIds);

  return (
    <div className="grid grid-cols-12 gap-4 mb-6">
      <div className="col-span-5 flex flex-wrap items-center gap-4">
        <img
          src="https://picsum.photos/120/120"
          className="rounded-lg"
          width={180}
          height
        />
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
          console.log(value?.horseId);
          user?.myHorses?.map((i) => (
            <>
              {i?.horseId ===
                value?.horseId(
                  <Link
                    href={{
                      pathname: `/profile/collection/${value.horseId}`,
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
                        style={{ width: "180px", height: "120px" }}
                        objectFit="cover"
                        className="rounded-lg h-full"
                      />
                    </a>
                  </Link>
                )}
            </>
          ));

          // if (value?.horseId == 21) {
          //   return (
          //     <Link
          //       href={{
          //         pathname: `/profile/collection/${value.horseId}`,
          //         comment: "comment-1", // this is the comment
          //       }}
          //     >
          //       <a>
          //         <img
          //           key={key}
          //           src={
          //             value?.image
          //               ? value.image
          //               : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
          //           }
          //           style={{ width: "180px", height: "120px" }}
          //           objectFit="cover"
          //           className="rounded-lg h-full"
          //         />
          //       </a>
          //     </Link>
          //   );
          // }
        })}
      </div>
    </div>
  );
}
