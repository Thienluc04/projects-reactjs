import { useState } from "react";

export default function useHandleChange(initValues) {
  const [values, setvalues] = useState(initValues);
  const handleChange = (e) => {
    const type = e.target.type;
    setvalues({
      ...values,
      [e.target.name]: type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  return {
    values,
    handleChange,
  };
}
