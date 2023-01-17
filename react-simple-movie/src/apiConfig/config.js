export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const apiKey = "dd3c536a0bc0792e21bd96adab6fe55b";
const endPoint = "https://api.themoviedb.org/3/movie";
export const tmdbAPI = {
  getLinkAPI: (movieId, type) =>
    `${endPoint}/${movieId}${type}?api_key=${apiKey}`,
  getMovieList: (type, page = 1) =>
    `${endPoint}/${type}?api_key=${apiKey}&page=${page}`,
  getLinkAPIDefault: (type) => `${endPoint}/${type}?api_key=${apiKey}`,
  imageMeta: (path, type) => `https://image.tmdb.org/t/p/${type}${path}`,
};
