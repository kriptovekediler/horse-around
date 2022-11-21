import React from "react";

const Checkbox = ({ label, checked, OnCheckedChanged }) => {
  return (
    <div className="form-check flex items-center gap-3 mb-2">
      <input
        className="form-check-input appearance-none h-7 w-7 border border-[#FFFFFF1A] rounded-md bg-transparent checked:bg-goldMetallic checked:border-goldMetallic focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-1 cursor-pointer"
        type="checkbox"
        value=""
        id="flexCheckDefault"
      />
      <label
        className="form-check-label inline-block mt-1 text-lg text-white"
        htmlFor="flexCheckDefault"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
