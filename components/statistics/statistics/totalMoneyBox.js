import styles from "./styles.module.css";

export default function TotalMoney({ price }) {
  return (
    <>
      <div className={styles.box}>
        <h2 className={styles.title}>Total Money</h2>
        <div className="text-sm 2xl:text-xl text-white">
          <span className={styles.badge}>{price}</span> / 38000
        </div>
        <span className="text-white text-sm 2xl:text-lg block">
          Account Opening Date : 16.12.2022
        </span>
      </div>
    </>
  );
}
