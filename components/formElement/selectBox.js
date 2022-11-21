import Select from "react-select";
import styles from "./styles.module.css";

// Selectbox Style
const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "transparent",
    height: 45,
    width: "100%",
    minWidth: "200px",
    margin: "0",
    borderRadius: "4px",
    border: "1px solid #444444b3",
    boxShadow: state.isFocused ? null : null,
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover": {
      borderColor: state.isFocused ? "white" : "white",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: "2px solid rgba(68, 68, 68, 0.7)",
    color: "rgba(255, 255, 255, 0.7)",
    padding: 20,
    fontSize: 20,
    background: "#25221F",
    zIndex: 99999,
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

export default function SelectBox({ text, ...props }) {
  return (
    <div className="mb-2">
      {text && <label className={styles.label}>{text}</label>}
      <Select {...props} styles={customStyles} isSearchable={false} className="z-50" />
    </div>
  );
}