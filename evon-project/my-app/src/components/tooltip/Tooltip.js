import React, { useState } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";
import ReactDOM from "react-dom";
import useHover from "../../hooks/useHover";

const Tooltip = ({ text, children }) => {
  const { hovered, nodeRef } = useHover();
  const [coords, setCoords] = useState({});
  const handleHover = (e) => {
    setCoords(e.target.getBoundingClientRect());
  };
  return (
    <div>
      {hovered && <TooltipContent coords={coords}>{children}</TooltipContent>}
      <span
        ref={nodeRef}
        className="w-[100px]  mx-auto  font-bold text-center"
        onMouseOver={handleHover}
      >
        {text}
      </span>
    </div>
  );
};

function TooltipContent({ children, coords }) {
  console.log(coords);
  return ReactDOM.createPortal(
    <p
      className="absolute inline-block p-3 text-white -translate-y-full
      max-w-[200px] bg-black rounded-xl -translate-x-2/4 text-center"
      style={{
        top: coords.top - coords.height / 2 + window.scrollY,
        left: coords.left + coords.width / 2,
      }}
    >
      {children}
    </p>,
    document.querySelector("body")
  );
}

export default Tooltip;
