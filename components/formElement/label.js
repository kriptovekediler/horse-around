import cn from "classnames";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import styles from "./styles.module.css";

export default function Label({ text, ...props }) {
  return <label className={styles.label}>{text}</label>;
}
