import React from "react";
import { TiDocumentText } from "react-icons/ti";
import Title from "../title";

import styles from "./styles.module.css";

export default function Articles() {
  return (
    <div className={styles.box}>
      <Title
        title="Popular Articles"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
        action
        actionText="View All"
      />
      <div className={styles.gridBox}>
        <div className={styles.item}>
          <TiDocumentText className="text-2xl" /> Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </div>
        <div className={styles.item}>
          <TiDocumentText className="text-2xl" /> Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </div>
        <div className={styles.item}>
          <TiDocumentText className="text-2xl" /> Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </div>
        <div className={styles.item}>
          <TiDocumentText className="text-2xl" /> Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </div>
      </div>
    </div>
  );
}