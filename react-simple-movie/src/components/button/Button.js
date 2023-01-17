import React from "react";

const Button = ({ className, onClick, children, full, bgColor }) => {
  switch (bgColor) {
    case "primary":
      bgColor = "bg-primary";
      break;
    case "secondary":
      bgColor = "bg-secondary";
      break;

    default:
      break;
  }
  return (
    <button
      onClick={onClick}
      className={`py-3 px-6 rounded-lg capitalize w-full ${bgColor} ${
        full ? "w-full" : "w-auto"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
