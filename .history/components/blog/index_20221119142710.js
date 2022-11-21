import React from "react";
import Link from "next/link";
import Title from "../title";
import Card from "./card";
import styles from "./styles.module.css";

export default function BlogBox() {
  return (
    <div className={styles.box}>
      <Title
        title="Blog"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
        action
        actionText="View All"
      />
      <div className={styles.gridBox}>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
