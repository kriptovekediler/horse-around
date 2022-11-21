import styles from "./styles.module.css";

export default function TopGrossing() {
  return (
    <>
      <div className={styles.box}>
        <h2 className={styles.title}>Top Grossing 3 Horses</h2>
        <div className={styles.grossingBox}>
          <span className={styles.grossingBoxNumber}>1</span>
          <div className={styles.horseCard}>
            <img
              src="https://i.pravatar.cc/60"
              className="rounded-md h-14 w-14"
            />
            <div>
              <h2 className={styles.horseName}>Simba</h2>
              <span>Female, Arabian Horse, 2 yrs</span>
            </div>
          </div>
        </div>
        <div className={styles.grossingBox}>
          <span className={styles.grossingBoxNumber}>2</span>
          <div className={styles.horseCard}>
            <img
              src="https://i.pravatar.cc/60"
              className="rounded-md h-14 w-14"
            />
            <div>
              <h2 className={styles.horseName}>Simba</h2>
              <span>Female, Arabian Horse, 2 yrs</span>
            </div>
          </div>
        </div>
        <div className={styles.grossingBox}>
          <span className={styles.grossingBoxNumber}>3</span>
          <div className={styles.horseCard}>
            <img
              src="https://i.pravatar.cc/60"
              className="rounded-md h-14 w-14"
            />
            <div>
              <h2 className={styles.horseName}>Simba</h2>
              <span>Female, Arabian Horse, 2 yrs</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}