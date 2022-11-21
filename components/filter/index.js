import React from "react";
import FilterItem from "./filterItem";
import SearchInput from "./searchInput";
import { Checkbox } from "../formElement/";

import styles from "./styles.module.css";

const Filter = (props) => {
  return (
    <div className={styles.filterBox}>
      <FilterItem title="Horses">
        <Checkbox label="American Indian Horse" />
        <Checkbox label="Appaloosa" />
        <Checkbox label="Alter Real" />
        <Checkbox label="Arasier" />
        <Checkbox label="Azteca" />
        <Checkbox label="German Classic Pony" />
        <Checkbox label="Bardigiono" />
        <Checkbox label="Fell Pony" />
      </FilterItem>
      <FilterItem title="Accessories" />
      <FilterItem title="Ranches">
        <Checkbox label="Text" />
        <Checkbox label="Text" />
        <Checkbox label="Text" />
        <Checkbox label="Text" />
      </FilterItem>
      <div className="p-4">
        <button className={styles.filterButton}>Filter</button>
      </div>
    </div>
  );
};

export default Filter;
