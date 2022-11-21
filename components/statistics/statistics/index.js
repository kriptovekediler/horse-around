import { Table, Space } from "antd";
import { SelectBox, Input, Checkbox } from "../../formElement";
import TotalMoney from "./totalMoneyBox";
import TotalCountBox from "./totalCountBox";
import TopGrossing from "./topGrossing";
import GeneralChart from "./generalChart";
import styles from "./styles.module.css";

export default function Statistics() {
  return (
    <>
      <div className="grid grid-cols-2 gap-6 2xl:gap-12 2xl:mb-12">
        <TotalMoney price="3.2 ETH" />
        <TotalCountBox />
      </div>
      <div className="grid grid-cols-12 gap-6 2xl:gap-12">
        <div className="col-span-3 md:col-sm-12 sm:col-sm-12">
          <TopGrossing />
          <TopGrossing />
          <div className={styles.box}>
            <h2 className={styles.title}>Weekly Teep</h2>
            <div className="text-sm 2xl:text-xl text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie
              viverra tellus blandit velit. Molestie viverra tellus blandit
              velit.
            </div>
          </div>
        </div>
        <div className="col-span-9 md:col-sm-12 sm:col-sm-12">
          <GeneralChart />
        </div>
      </div>
    </>
  );
}