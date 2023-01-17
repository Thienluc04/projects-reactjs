import React, { useEffect, useRef, useState } from "react";
import useClickOutSide from "../hooks/useClickOutSide";

const Dropdown = () => {
  const { nodeRef, setShow, show } = useClickOutSide();

  return (
    <div className="relative w-full max-w-[400px]" ref={nodeRef}>
      <div
        className="p-5 border border-gray-200 rounded-lg w-full cursor-pointer"
        onClick={() => setShow(!show)}
      >
        Selected
      </div>
      {show && (
        <div className="border border-gray-200 rounded-lg absolute top-100% left-0 w-full bg-white">
          <div className="p-5 cursor-pointer">Javascript</div>
          <div className="p-5 cursor-pointer">ReactJS</div>
          <div className="p-5 cursor-pointer ">VueJS</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
