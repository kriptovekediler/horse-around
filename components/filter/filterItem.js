import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import styles from "./styles.module.css";

const FilterItem = (props) => {
  const { title, children } = props;
  const [active, setActive] = useState(false);
  return (
    <div className="border-b-2 border-[#FFFFFF1A]">
      <div className={styles.filterItem} onClick={() => setActive(!active)}>
        <span className={styles.filterTitle}>{title}</span>
        {active ? (
          <FaAngleUp className="text-xl" />
        ) : (
          <FaAngleDown className="text-xl" />
        )}
      </div>
      {active && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default FilterItem;
