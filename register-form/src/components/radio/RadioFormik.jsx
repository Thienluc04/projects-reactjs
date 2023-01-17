import { useField } from "formik";
import React from "react";

const RadioFormik = (props) => {
  const [field] = useField(props);
  return (
    <div className="flex items-center gap-x-3">
      <label className="cursor-pointer custom-radio">
        <input
          type="radio"
          value={props.value}
          className="hidden"
          checked={props.checked}
          {...field}
          {...props}
        />
        <div className="bg-white w-full h-full rounded-full"></div>
      </label>
      <span>{props.label}</span>
    </div>
  );
};

export default RadioFormik;
