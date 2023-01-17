import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import useSWR from "swr";
import MovieCard from "../components/movies/MovieCard";
import { fetcher } from "../apiConfig/config";
import useDebounce from "../hooks/useDebounce";

const MoviePage = () => {
  const [filter, setFilter] = useState("");
  const [nextPage, setNextPage] = useState();
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=dd3c536a0bc0792e21bd96adab6fe55b`
  );
  const { data, error } = useSWR(url, fetcher);
  const movies = data?.results || [];

  const filterDebout = useDebounce(filter, "500");
  const handleChangeQuery = (e) => {
    setFilter(e.target.value);
  };

  const itemsPerPage = 20;
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_pages;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  useEffect(() => {
    if (filterDebout) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=dd3c536a0bc0792e21bd96adab6fe55b&query=${filterDebout}&page=${nextPage}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=dd3c536a0bc0792e21bd96adab6fe55b&page=${nextPage}`
      );
    }
  }, [filterDebout, nextPage]);

  const loading = !data && !error;

  return (
    <div className="page-container py-10">
      <div className="search flex mb-10">
        <input
          type="text"
          className="flex-1 p-3 bg-slate-800 outline-none text-white"
          onChange={handleChangeQuery}
        />
        <button className="p-3 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div
          className="w-10 h-10 bg-transparent border-4 border-t-transparent 
        border-primary rounded-full animate-spin mx-auto"
        ></div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </div>
  );
};

export default MoviePage;
