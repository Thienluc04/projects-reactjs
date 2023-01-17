import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import "swiper/scss";
import { fetcher, tmdbAPI } from "../../apiConfig/config";
import useSWR from "swr";
import LoadingSkeleton from "components/loading/LoadingSkeleton";

const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(tmdbAPI.getLinkAPIDefault(type), fetcher);
  const movies = data?.results || [];
  const isLoading = !data && !error;

  return (
    <>
      {isLoading && (
        <div className="grid grid-cols-4 gap-10">
          <LoadingItem></LoadingItem>
          <LoadingItem></LoadingItem>
          <LoadingItem></LoadingItem>
          <LoadingItem></LoadingItem>
        </div>
      )}
      {!isLoading && (
        <div className="movie-list">
          <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
            {movies.length > 0 &&
              movies.map((item) => (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item}></MovieCard>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

function LoadingItem() {
  return (
    <div
      className="movie-card rounded-lg p-3 bg-slate-800 text-white h-full flex flex-col justify-between
                select-none w-[300px]"
    >
      <LoadingSkeleton
        width="100%"
        height="250px"
        className="mb-5 rounded-lg"
      ></LoadingSkeleton>
      <LoadingSkeleton height="40px" className="mb-3"></LoadingSkeleton>
      <div className="flex justify-between mb-10">
        <LoadingSkeleton width="50px" height="20px"></LoadingSkeleton>
        <LoadingSkeleton width="30px" height="20px"></LoadingSkeleton>
      </div>
      <LoadingSkeleton height="50px" className="rounded-lg"></LoadingSkeleton>
    </div>
  );
}

export default MovieList;
