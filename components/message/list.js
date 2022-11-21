import { Space } from "antd";
import cn from "classnames";
import { Input } from "../formElement";
import styles from "./styles.module.css";

const MessageListItem = ({ active }) => {
  return (
    <div className={styles.itemBox}>
      <div className={cn(styles.countBox, active ? "!bg-goldMetallic" : "")}>
        1
      </div>
      <div className={styles.itemUserCard}>
        <img
          src="https://picsum.photos/80/80"
          className="rounded-lg h-20 xl:h-10 xl:w-10"
        />
        <div className="w-full flex flex-wrap">
          <Space className="w-full justify-between">
            <span className="text-base 2xl:text-xl font-PoppinsSemiBold">
              Michael Bauer
            </span>
            <span className="text-base 2xl:text-xl font-PoppinsSemiBold">
              11:26
            </span>
          </Space>
          <Space className="w-full justify-between">
            <span className="text-sm">
              Hi John, I will send a documents....
            </span>
            <span className="rounded-md text-sm bg-goldMetallic p-1">2</span>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default function List({}) {
  return (
    <div className={styles.box}>
      <Input placeholder="Search" />

      <div className="overflow-y-auto h-[500px]">
        <MessageListItem active />
        <MessageListItem />
        <MessageListItem />
        <MessageListItem />
        <MessageListItem />
        <MessageListItem />
        <MessageListItem />
        <MessageListItem />
        <MessageListItem />
      </div>
    </div>
  );
}