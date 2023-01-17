import React, { Fragment, useEffect, useRef, useState } from "react";

const TextareaAutoResize = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const [textareaHeight, setTextareaHeight] = useState("auto");

  const handleChange = (e) => {
    setTextareaHeight("auto");
    setText(e.target.value);
  };

  useEffect(() => {
    setTextareaHeight(`${textareaRef?.current?.scrollHeight}px`);
  }, [text]);
  return (
    <Fragment>
      <div className="p-5">
        <textarea
          className="w-full max-w-[400px] overflow-hidden transition-all p-5 rounded-lg border border-gray-400 focus:border-blue-400 resize-none"
          placeholder="Please enter your content..."
          value={text}
          ref={textareaRef}
          style={{
            height: textareaHeight,
          }}
          onChange={handleChange}
        ></textarea>
      </div>
    </Fragment>
  );
};

export default TextareaAutoResize;
