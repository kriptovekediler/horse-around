import React from "react";
import Title from "../title";
import { Input } from "../formElement/index";
import styles from "./styles.module.css";

export default function JoinTheCommunityBox() {
  return (
    <div className={styles.contentBox}>
      <Title
        title="Fill the  Form Below"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
      />
      <form className={styles.gridBox}>
        <div>
          <Input text="Name" placeholder="John" />
        </div>
        <div>
          <Input text="Surname" placeholder="Willhem" />
        </div>
        <div className="col-span-2">
          <Input text="Email" type="email" placeholder="Email" />
        </div>
        <div className="col-span-2">
          <Input text="Company Link" placeholder="Company Link" />
        </div>
        <div className="col-span-2">
          <Input text="I am not a robot" placeholder="Human verify; 3+1=?" />
        </div>
        <div className="col-span-2 mt-8 text-center">
          <button className={styles.button}> Submit</button>
        </div>
      </form>
    </div>
  );
}
