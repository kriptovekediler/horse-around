import cn from "classnames";
import styles from "./styles.module.css";

export default function TabHeader({ tabs, active, setTab }) {
  return (
    <div className={styles.tabsHeader}>
        {tabs.map((item, key) =>
        typeof item === "object" && item !== null ? (
          <div
            key={key}
            className={cn(
              styles.tabItem,
              active === item.name ? styles.active : ""
            )}
            onClick={() => setTab(item.name)}
          >
            <span> {item.name}</span>
            <span className="block text-center"> {item.value}</span>
          </div>
        ) : (
          <div
            key={key}
            className={cn(styles.tabItem, active === item ? styles.active : "")}
            onClick={() => setTab(item)}
          >
            {item}
          </div>
        )
      )}
    </div>
  );
}
