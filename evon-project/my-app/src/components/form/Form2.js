import React, { useState } from "react";

const Form2 = () => {
  // const [fullname, setFullname] = useState("");
  // const [message, setMessage] = useState("");
  // const [country, setCountry] = useState("");
  // const handleInputChange = (e) => {
  //   console.log(e.target.value);
  //   setFullname(e.target.value);
  // };
  // const handleTextAreaChange = (e) => {
  //   console.log(e.target.value);
  //   setMessage(e.target.value);
  // };
  // const handleSelectChange = (e) => {
  //   console.log(e.target.value);
  //   setMessage(e.target.value);
  // };
  const handleInputChange = (e) => {
    const type = e.target.type;
    setvalues({
      ...values,
      [e.target.name]: type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  const [values, setvalues] = useState({
    fullname: "",
    email: "",
    hobby: false,
  });
  return (
    <div className="p-5">
      {/* {fullname} */}
      <div className="flex gap-x-3">
        <input
          type="text"
          name="fullname"
          className="w-full max-w-[300px] p-3 border border-gray-200 rounded-lg"
          placeholder="Enter your name"
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          className="w-full max-w-[300px] p-3 border border-gray-200 rounded-lg"
          placeholder="Enter your email address"
          onChange={handleInputChange}
        />
        <input type="checkbox" name="hobby" onChange={handleInputChange} />
      </div>
      {/* {message}
      <textarea
        name="message"
        placeholder="Enter your name"
        className="w-full max-w-[300px] p-3 border border-gray-200 rounded-lg"
        onChange={handleTextAreaChange}
      ></textarea>
      {country}
      <select name="country" onChange={handleSelectChange}>
        <option value="vietnam">VN</option>
        <option value="usa">USA</option>
        <option value="japan">JAPAN</option>
      </select> */}
    </div>
  );
};

export default Form2;
