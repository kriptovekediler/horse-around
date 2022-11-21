import cn from "classnames";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import styles from "./styles.module.css";

export default function Textarea({ text, labelStyle, ...props }) {
  return (
    <div className="mb-2">
      {text && <label className={cn(styles.label, labelStyle)}>{text}</label>}
      <textarea className={styles.textarea} {...props}></textarea>
    </div>
  );
}