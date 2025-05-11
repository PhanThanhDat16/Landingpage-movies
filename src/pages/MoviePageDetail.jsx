import { useParams } from "react-router-dom";
import useSWR from "swr";
import { API, fetcher } from "../configAPI/configAPI";
import { useEffect, useState } from "react";
import { newUpdatev2API } from "../configAPI/newUpdate";
import MovieCardFilm from "../components/movie/MovieCardFilm";
import LoadingSkeleton from "../components/loading/LoadingSkeleton";
import { v4 } from "uuid";
// import { useEffect, useState } from "react";
// import { movieAPI } from "../configAPI/movie";

const itemPerPage = 6;
const MoviePageDetail = () => {
  // const location = useLocation();
  // const [isLoading, setIsLoading] = useState(false);

  // const fetchMovieDetail = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await movieAPI(location.pathname);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const { id } = useParams();
  const { data } = useSWR(API.getMovieDetail(id), fetcher);

  if (!data) return null;

  const { title, genres, backdrop_path, poster_path, overview } = data;

  // useEffect(() => {
  //   fetchMovieDetail();
  // }, []);

  return (
    <div className="my-20">
      <div className="h-[350px] md:h-[600px] relative w-full">
        {backdrop_path !== null && (
          <div className="absolute inset-0 bg-center bg-no-repeat bg-cover">
            <img
              src={`${API.getImage(backdrop_path)}`}
              className="object-cover w-full h-full"
              alt=""
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black opacity-65"></div>
      </div>
      <div className="max-w-[250px] h-[200px] md:h-[400px] md:max-w-[800px] mx-auto rounded-xl overflow-hidden -mt-[150px] md:-mt-[200px] z-10 relative">
        {poster_path === null || poster_path === "" ? (
          <div className="w-full h-full bg-black"></div>
        ) : (
          <img
            src={`${API.getImage(poster_path)}`}
            className="object-cover w-full h-full "
            alt=""
          />
        )}
      </div>
      <h1 className="my-10 text-4xl font-bold text-center text-white">
        {title}
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-5 mb-10">
        {genres.length > 0 &&
          genres.map((item) => (
            <span
              key={item.id}
              className="px-4 py-2 font-medium border rounded border-primary text-primary"
            >
              {item.name}
            </span>
          ))}
      </div>

      <div className="text-[16px] text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        <p className="mb-5">{overview}</p>
      </div>
      <MovieMeta type="credits"></MovieMeta>
      <MovieMeta type="videos"></MovieMeta>
      <MovieMeta type="similar"></MovieMeta>
    </div>
  );
};

function MovieMeta({ type }) {
  const { id } = useParams();
  const { data } = useSWR(API.getMovieMeta(id, type), fetcher);
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const fetchMovieUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await newUpdatev2API();
      setMovies(response.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieUpdate();
  }, []);

  if (!data) return null;

  if (type === "credits") {
    const { cast } = data;
    return (
      <div className="py-10">
        <h1 className="mb-10 text-3xl text-center">Casts</h1>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {cast.length > 0 &&
            cast.slice(0, 4).map((item) => (
              <div className="cast-item" key={item.id}>
                <img
                  src={API.getImage(item.profile_path)}
                  className="w-full h-[200px] md:h-[350px] object-cover rounded-lg mb-3"
                  alt=""
                />
                <h3 className="text-xl font-medium">{item.name}</h3>
              </div>
            ))}
        </div>
      </div>
    );
  } else {
    if (type === "videos") {
      const { results } = data;
      return (
        <div className="py-10">
          {results.length > 0 &&
            results.slice(0, 2).map((item) => (
              <div key={item.id} className="mb-10">
                <h3 className="inline-block p-3 mb-5 text-xl font-medium rounded-lg bg-primary">
                  {item.name}
                </h3>
                <div className="aspect-video">
                  <iframe
                    width="775"
                    height="436"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="Youtube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="object-fill w-full h-full"
                  ></iframe>
                </div>
              </div>
            ))}
        </div>
      );
    }

    if (type === "similar") {
      return (
        <div className="w-full">
          {isLoading && (
            <div className="flex py-4 overflow-x-scroll scroll-box-x gap-x-5">
              {new Array(itemPerPage).fill(0).map(() => (
                <LoadingSkeleton
                  className="w-[250px] flex-shrink-0"
                  key={v4()}
                ></LoadingSkeleton>
              ))}
            </div>
          )}

          {!isLoading && (
            <div className="flex py-4 overflow-x-scroll scroll-box-x gap-x-5">
              {movies.length > 0 &&
                movies.map((item) => (
                  <MovieCardFilm item={item} key={item.id}></MovieCardFilm>
                ))}
            </div>
          )}
        </div>
      );
    }
  }
}

export default MoviePageDetail;
