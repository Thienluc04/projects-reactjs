import React from "react";

const YoutubeItem = (props) => {
  return (
    <div className={`youtube-item ${props.className}`}>
      <img className="youtube-image" src={props.image} alt="" />
      <div>
        <p className="title" style={{ color: "red" }}>
          {props.title}
        </p>
      </div>
    </div>
  );
};

export default YoutubeItem;
