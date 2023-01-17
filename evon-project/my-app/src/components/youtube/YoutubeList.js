import React from "react";
import { YoutubeData } from "../../data";
import YoutubeItem from "./YoutubeItem";

const YoutubeList = (props) => {
  return (
    <div className="youtube-list">
      {props.children}
      {YoutubeData.map((item, index) => {
        let newClass = "";
        if (index === 1) newClass = "abc";
        return (
          <YoutubeItem
            key={index}
            image={item.image}
            title={item.title || "This is not example"}
            className={newClass}
          />
        );
      })}
    </div>
  );
};

export default YoutubeList;
