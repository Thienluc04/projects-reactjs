import React from "react";
import useHover from "../hooks/useHover";
import useLinkNewTab from "../hooks/useLinkNewTab";

const Blog = () => {
  const { contentRef } = useLinkNewTab;
  const { hovered, nodeRef } = useHover();
  return (
    <div className="entry-content" ref={contentRef}>
      <p className="mb-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
        ducimus iure a quis nostrum sint porro impedit, optio exercitationem
        architecto earum dolores ullam fugiat cum sunt nemo quod officiis
        delectus.{" "}
        <a
          href="https://google.com"
          className={`underline ${hovered ? "text-green-400" : ""}`}
          ref={nodeRef}
        >
          google.com
        </a>
        ?
      </p>
      <p className="mb-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
        ducimus iure a quis nostrum sint porro impedit, optio exercitationem
        architecto earum dolores ullam fugiat cum sunt nemo quod officiis
        delectus.{" "}
        <a href="https://google.com" className="underline">
          google.com
        </a>
        ?
      </p>
      <p className="mb-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
        ducimus iure a quis nostrum sint porro impedit, optio exercitationem
        architecto earum dolores ullam fugiat cum sunt nemo quod officiis
        delectus.{" "}
        <a href="https://google.com" className="underline">
          google.com
        </a>
        ?
      </p>
    </div>
  );
};

export default Blog;
