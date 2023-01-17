import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import { fetcher, tmdbAPI } from "../apiConfig/config";
import MovieCard from "../components/movies/MovieCard";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getLinkAPI(movieId), fetcher);
  if (!data || data.length <= 0) return null;
  const { title, poster_path, backdrop_path, genres, overview } = data;
  return (
    <div className="py-10">
      <div className="w-full h-[600px] object-cover relative">
        <img
          src={tmdbAPI.imageMeta(backdrop_path, "original")}
          alt=""
          className="w-full h-full rounded-lg"
        />
        <div className="absolute inset-0 opacity-50 bg-slate-800"></div>
      </div>
      <div className="max-w-[1000px]  relative mx-auto ">
        <img
          className=" w-full h-[500px] rounded-lg object-cover -mt-[250px]"
          src={tmdbAPI.imageMeta(poster_path, "original")}
          alt=""
        />
      </div>
      <h2 className="text-3xl mt-10 text-center">{title}</h2>
      <div className="flex items-center justify-center gap-5 mt-10">
        {genres.length > 0 &&
          genres.map((item) => (
            <span
              key={item.id}
              className="py-2 px-4 border border-secondary text-secondary rounded-xl"
            >
              {item.name}
            </span>
          ))}
      </div>
      <p className="mt-10 w-[800px] mx-auto text-center">{overview}</p>
      <MovieCreditsCard></MovieCreditsCard>
      <MovieVideosCard></MovieVideosCard>
      <MovieSimilarCard></MovieSimilarCard>
    </div>
  );
};

function MovieCreditsCard() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getLinkAPI(movieId, "/credits"), fetcher);
  if (!data || data.length <= 0) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <div className="mt-10">
      <h2 className="text-secondary p-3 border-secondary border-2 inline-block my-3">
        Cast
      </h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div key={item.id} className="h-[350px] ">
            <img
              src={tmdbAPI.imageMeta(item.profile_path, "original")}
              alt=""
              className="rounded-lg h-full w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieVideosCard() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getLinkAPI(movieId, "/videos"), fetcher);
  if (!data || data.length <= 0) return null;
  if (!data.results || data.results.length <= 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-secondary p-3 border-secondary border-2 inline-block my-3">
        Video Trailers
      </h2>
      <div className="flex flex-col gap-10">
        {data.results.slice(0, 2).map((item) => (
          <div key={item.id} className="">
            <iframe
              width="100%"
              height="600"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="Movie Details Title"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h2 className="text-xl pt-5">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieSimilarCard() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getLinkAPI(movieId, "/similar"), fetcher);
  if (!data || data.length <= 0) return null;
  return (
    <div className="mt-10">
      <h2 className="text-secondary p-3 border-secondary border-2 inline-block my-3">
        Similar Movies
      </h2>
      <div className="movie-list">
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
          {data.results.length > 0 &&
            data.results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
