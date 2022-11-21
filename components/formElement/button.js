import cn from "classnames";
import Link from "next/link";
import styles from "./styles.module.css";

export default function Button({ children, full, dark, ...props }) {
  return (
    <button
      {...props}
      className={cn(styles.button, full && "w-full", dark && styles.darkButton)}
    >
      {children}
    </button>
  );
}
