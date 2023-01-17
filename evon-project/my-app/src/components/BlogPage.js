import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("search"));
  useEffect(() => {
    setSearchParams({ search: "thienuc" });
  }, []);
  return <div>BlogPage</div>;
};

export default BlogPage;
