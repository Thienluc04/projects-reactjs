import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HackerNews from "./components/HackerNews";
import { getNews } from "./sagas/news/newsSlice";

const App = () => {
  return (
    <div>
      <HackerNews></HackerNews>
    </div>
  );
};

export default App;
