import cn from "classnames";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import styles from "./styles.module.css";

export default function Input({ text, labelStyle, ...props }) {
  return (
    <div className="mb-2">
      {text && <label className={cn(styles.label, labelStyle)}>{text}</label>}
      <input className={styles.input} {...props} />
    </div>
  );
}