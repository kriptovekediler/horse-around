import React from "react";
import FilterItem from "./filterItem";
import styles from "./styles.module.css";

const SearchInput = (props) => {
  return (
    <div className="relative">
      <input placeholder="Search" className={styles.searchInput} />
      <svg
        className="absolute top-[30%]"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 12C4.243 12 2 9.757 2 7C2 4.243 4.243 2 7 2C9.757 2 12 4.243 12 7C12 9.757 9.757 12 7 12ZM15.7068 14.293L12.5948 11.201C12.5928 11.199 12.5908 11.199 12.5888 11.197C13.4708 10.025 13.9998 8.575 13.9998 7C13.9998 3.141 10.8588 0 6.99989 0C3.13995 0 0 3.141 0 7C0 10.859 3.13995 14 6.99989 14C8.57487 14 10.0248 13.471 11.1958 12.59C11.1978 12.592 11.1978 12.594 11.1998 12.596L14.2928 15.707C14.4878 15.902 14.7438 16 14.9998 16C15.2558 16 15.5118 15.902 15.7068 15.707C16.0977 15.316 16.0977 14.684 15.7068 14.293Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default SearchInput;
