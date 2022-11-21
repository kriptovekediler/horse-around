import React from "react";
import FilterItem from "../filter/filterItem";
import { Checkbox } from "../formElement/";

import styles from "./styles.module.css";

const Filter = (props) => {
  return (
    <div className={styles.filterBox}>
      <FilterItem title="Breed">
        <Checkbox label="Arabian Horse" />
        <Checkbox label="Thoroughbred" />
      </FilterItem>
      <FilterItem title="Accessories" />
      <FilterItem title="Color">
        <Checkbox label="Gray" />
        <Checkbox label="Bay Dark" />
        <Checkbox label="Black" />
        <Checkbox label="Brown" />
        <Checkbox label="Brown Falb Mold" />
        <Checkbox label="Brown Light" />
        <Checkbox label="Buckskin" />
        <Checkbox label="White" />
      </FilterItem>
      <FilterItem title="Age">
        <Checkbox label="0-1" />
        <Checkbox label="1-2" />
        <Checkbox label="2-4" />
        <Checkbox label="5-7" />
        <Checkbox label="7-10" />
        <Checkbox label="11-14" />
        <Checkbox label="15-20" />
        <Checkbox label="21-25" />
        <Checkbox label="26-30" />
        <Checkbox label="30+" />
      </FilterItem>
      <FilterItem title="Starting Price"></FilterItem>
      <FilterItem title="Country"></FilterItem>
      <FilterItem title="Discipline"></FilterItem>
      <div className="p-4">
        <button className={styles.filterButton}>Filter</button>
      </div>
    </div>
  );
};

export default Filter;
