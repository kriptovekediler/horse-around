import styles from "./styles.module.css";

export default function Search() {
  return (
    <div className={styles.searchBox}>
      <h2 className={styles.searchBoxTitle}>Help and Support</h2>
      <span className={styles.searchBoxSpan}>
        Search questions or useful articles
      </span>
      <div className="relative w-3/4">
        <input
          className={styles.searchBoxInput}
          placeholder="I’m looking for..."
        />
        <button className={styles.searchBoxButton}>Find</button>
      </div>
    </div>
  );
}