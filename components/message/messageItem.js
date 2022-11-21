import { Space } from "antd";
import cn from "classnames";
import { Input } from "../formElement";
import styles from "./styles.module.css";

export default function MessageBox({}) {
  return (
    <div className={styles.messageBox}>
      <img
        src="https://picsum.photos/80/80"
        className="rounded-lg h-20 xl:h-14 xl:w-14"
      />
      <div>
        <Space className="w-full justify-between mb-4">
          <span className="text-base 2xl:text-xl font-PoppinsSemiBold">
            Michael Bauer
          </span>
          <Space className="gap-4">
            <span className="text-sm">11.05.2022</span>
            <span className="text-sm">11:26</span>
          </Space>
        </Space>
        <div className="text-sm leading-5">
          Hi John, I will send a documents as soon as. You can send me horse ID
          and details informations. Lorem Impus sit amet. Regards! Michael Bauer
        </div>
      </div>
    </div>
  );
}