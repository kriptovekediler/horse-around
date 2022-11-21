import Link from "next/link";
import { Space } from "antd";
import { BsFillShareFill } from "react-icons/bs";
import styles from "./styles.module.css";

export default function Pedigree( {horse} ) {
  return (
    <div className={styles.box}>
      <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-10 md:gap-10 sm:gap-0 text-white mb-10">
        <div className="border-r-2 mr-10 border-[#FFFFFF1A] pr-10 md:pr-0 sm:pr-0 md:border-0 sm:border-0">
          <div className={styles.pedigreeBox}>
            <div className="bg-[#39250B] border-goldMetallic w-[78px] border-2 rounded-lg flex items-center">
              <span className="-rotate-90 text-base 2xl:text-2xl">
                Pedigree
              </span>
            </div>
            <div className="flex flex-wrap w-full gap-0">
              <div className="flex w-full">
                <div className="flex items-center justify-center border-goldMetallic rounded-lg border-2 border-b  px-10 2xl:px-10">
                  Diesel Decay (1998){" "}
                </div>
                <div className="border-t-2 border-b-2 rounded-l-lg border-goldMetallic">
                  <div className="flex items-center justify-center border-goldMetallic rounded-t-lg border-2 border-t-0 border-b p-5 2xl:px-10 h-1/2">
                    Fire(2007)
                  </div>
                  <div className="flex items-center justify-center border-goldMetallic rounded-b-lg border-2 border-b-0 border-t p-5 2xl:px-10 h-1/2">
                    Cardiac(2005)
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center justify-center border-goldMetallic border-t-2 border-b-2  p-4 2xl:px-8">
                    Fire(2007)
                  </div>
                  <div className="flex items-center justify-center border-goldMetallic text-goldMetallic border-b-2  p-4 2xl:px-8">
                    Fire(2007)
                  </div>
                  <div className="flex items-center justify-center border-goldMetallic border-b-2  p-4 2xl:px-8">
                    Fire(2007)
                  </div>
                  <div className="flex items-center justify-center border-goldMetallic border-b-2  p-4 2xl:px-8">
                    Fire(2007)
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex items-center justify-center border-goldMetallic rounded-lg border-2 border-t  px-10 2xl:px-10">
                  Diesel Decay (1998){" "}
                </div>
                <div className="border-t border-b-2 rounded-l-lg border-goldMetallic">
                  <div className="flex items-center justify-center border-goldMetallic rounded-t-lg border-2 border-t-0 border-b p-5 2xl:px-10 h-1/2">
                    Fire(2007)
                  </div>
                  <div className="flex items-center justify-center border-goldMetallic rounded-b-lg border-2 border-b-0 border-t p-5 2xl:px-10 h-1/2">
                    Cardiac(2005)
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center justify-center border-goldMetallic border-t border-b-2  p-4 2xl:px-8">
                    Fire(2007)
                  </div>
                  <div className="flex items-center justify-center border-goldMetallic border-b-2  p-4 2xl:px-8">
                    Fire(2007)
                  </div>
                  <div className="flex items-center justify-center border-goldMetallic border-b-2  p-4 2xl:px-8">
                    Fire(2007)
                  </div>
                  <div className="flex items-center justify-center border-goldMetallic border-b-2  p-4 2xl:px-8">
                    Fire(2007)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex w-full gap-4">
            <img
              src="https://nationaltoday.com/wp-content/uploads/2020/12/National-Horse-Day-1.jpg"
              className="w-[250px]"
            />
            <div>
              <Space className="w-full items-center justify-between mb-4">
                <h2 className="text-5xl 2xl:text-7xl text-white font-PoppinsSemiBold">
                  {horse.horseName}
                </h2>
                <span className="text-goldMetallic text-3xl 2xl:text-6xl">
                  ID {horse.horseId}
                </span>
              </Space>
              <Space className="w-full justify-between">
                <Space className="gap-2">
                  <img
                    src="https://i.pravatar.cc/40"
                    className="h-11 rounded-lg"
                  />
                  <span className="text-base 2xl:text-xl">{`@${horse.ownerName}`}</span>
                </Space>
              </Space>
              <p className="text-sm 2xl:text-xl mt-2">
                {horse.preferenceDescription}
              </p>
              <div className="text-end mt-2 w-full">
                <Link href="">
                  <a>
                    <BsFillShareFill className="text-xl inline-block" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}