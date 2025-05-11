export const fetcher = (args) => fetch(args).then((res) => res.json());
export const apiKey = "d949fb64e635f1e9a0f48b4ddbc5e9de";
const endpointTV = "https://api.themoviedb.org/3/discover/tv";
const endpointTVDetail = "https://api.themoviedb.org/3/tv";
const endpointTVMeta = "https://api.themoviedb.org/3/tv";

const endpointMovie = "https://api.themoviedb.org/3/movie";

const endpointActorPopular = "https://api.themoviedb.org/3/person/popular";
const endpointActorDetail = "https://api.themoviedb.org/3/person";
const endpointActorTrending =
  "https://api.themoviedb.org/3/trending/person/day";
const endpointSearTV = "https://api.themoviedb.org/3/search/tv";
const endpointSearchMovie = "https://api.themoviedb.org/3/search/movie";
const endpointSearchActor = "https://api.themoviedb.org/3/search/person";
export const API = {
  getTVList: (page = 1) => `${endpointTV}?api_key=${apiKey}&page=${page}`,
  // getTVDetail: (id) => `${endpointTVDetail}/${id}?api_key=${apiKey}`,
  getTVMeta: (id, type) =>
    `${endpointTVMeta}/${id}${
      type === "similar" ? "/similar" : ""
    }?api_key=${apiKey}`,

  getMovieList: (type, page = 1) =>
    `${endpointMovie}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetail: (id) => `${endpointMovie}/${id}?api_key=${apiKey}`,
  getMovieMeta: (id, type) =>
    `${endpointMovie}/${id}/${type}?api_key=${apiKey}`,

  getActorListPopular: (page = 1) =>
    `${endpointActorPopular}?api_key=${apiKey}&page=${page}`,
  getActorListTrending: (page = 1) =>
    `${endpointActorTrending}?api_key=${apiKey}&language=en-US&page=${page}`,
  getActorDetail: (id) => `${endpointActorDetail}/${id}?api_key=${apiKey}`,

  getSearchMovie: (query, page = 1) =>
    `${endpointSearchMovie}?api_key=${apiKey}&query=${query}&page=${page}`,
  getSearchTV: (query, page = 1) =>
    `${endpointSearTV}?api_key=${apiKey}&query=${query}&page=${page}`,
  getSearchActor: (query, page = 1) =>
    `${endpointSearchActor}?api_key=${apiKey}&query=${query}&page=${page}`,

  getImage: (path) => `https://image.tmdb.org/t/p/original${path}`,

  // image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};

// https://api.themoviedb.org/3/trending/person/day?api_key=d949fb64e635f1e9a0f48b4ddbc5e9de&%20language=en-US
// https://api.themoviedb.org/3/movie/1034541/videos?api_key=d949fb64e635f1e9a0f48b4ddbc5e9de
