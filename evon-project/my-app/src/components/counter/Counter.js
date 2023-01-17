import React, { useEffect, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [infor, setInfor] = useState({
    firstName: "Thien",
    lastName: "Luc",
  });

  useEffect(() => {
    console.log("from input");
  }, [infor.firstName]);

  return (
    <div className="p-5 flex gap-x-4 items-center">
      <input
        type="text"
        name="firstName"
        value={infor.firstName}
        onChange={(e) => {
          setInfor({
            ...infor,
            firstName: e.target.value,
          });
        }}
        className="outline-none"
      />
      <span className="text-2xl font-bold">{count}</span>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
        className="inline-block p-3 bg-green-400 text-white"
      >
        Increment
      </button>
    </div>
  );
};

export default Counter;
