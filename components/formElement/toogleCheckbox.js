import React, { useEffect } from "react";
import cn from "classnames";
import styles from "./styles.module.css";

export default function ToogleCheckbox({
  text,
  checked,
  small,
  ...props
}) {
  const [isChecked, id, setIsChecked] = React.useState(checked);

  return (
    <div className="inline-flex items-center gap-6">
      <span className="text-base">{text}</span>
      <label
        for={id}
        className="inline-flex relative items-center cursor-pointer"
      >
        <input
          type="checkbox"
          value={isChecked}
          id={id}
          className="sr-only peer"
          defaultChecked={isChecked}
          {...props}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none p rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-goldMetallic"></div>
        <span className="ml-3 text-sm font-medium text-white "></span>
      </label>
    </div>
  );
}
