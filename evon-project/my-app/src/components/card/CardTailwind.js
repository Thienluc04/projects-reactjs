import React from "react";

const CardTailwind = (props) => {
  const amountClasses = `text-lg font-bold text-transparent bg-clip-text ${
    props.primary
      ? "bg-primary-gradient"
      : props.secondary
      ? "bg-secondary-gradient"
      : ""
  }`;
  return (
    <div className="relative">
      <div className="w-full rounded-lg h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
          className="block w-full h-full object-cover rounded-lg"
        />
      </div>
      <div
        className="absolute left-2/4 -translate-x-2/4 translate-y-2/4 bottom-0 bg-white z-10 
      rounded-[20px] p-5 w-[calc(100%-36px)]"
      >
        <div className="flex justify-between items-center mb-[30px]">
          <div className="flex items-center gap-x-3">
            <img
              className="w-[30px] h-[30px] rounded-full object-cover flex-shrink-0"
              src="https://images.unsplash.com/photo-1644417076004-591270852df9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
              alt=""
            />
            <span className="font-light text-base text-[#333]">@zndrson</span>
          </div>
          <div className="flex gap-x-3 items-center">
            <img src="/icon-heart.svg" alt="" />
            <span>256</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h3 className={`font-medium ${props.fontSize || "text-lg"}`}>
            Cosmic Perspective
          </h3>
          <span className={amountClasses}>12,000 PSL</span>
        </div>
      </div>
    </div>
  );
};

export default CardTailwind;
