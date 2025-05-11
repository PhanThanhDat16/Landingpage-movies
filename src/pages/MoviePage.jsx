import { useEffect, useState } from "react";
// import { API, fetcher } from "../configAPI/configAPI";
// import Button from "../components/button/Button";
// import useSWRInfinite from "swr/infinite";
// import useDebounceQuery from "../hooks/useDebounceQuery";
import MovieCard from "../components/movie/MovieCard";
import LoadingSkeleton from "../components/loading/LoadingSkeleton";
import { useLocation } from "react-router-dom";
import { v4 } from "uuid";
import { movieTotalAPI } from "../configAPI/movieTotal";

const itemPerPage = 20;
const MoviePage = () => {
  // const [url, setUrl] = useState(API.getMovieList("popular"));
  // const [pageDefault, setPageDefault] = useState(1);
  // const [query, setQuery] = useState("");
  // const debounceValue = useDebounceQuery(query, 500);
  // const { data, error, size, setSize } = useSWRInfinite((index) => {
  //   return url.replace("page=1", `page=${index + 1}`);
  // }, fetcher);
  const location = useLocation();
  const [isLoading, setIsloading] = useState(false);
  const [movies, setMovies] = useState([]);

  const fetchDataMovie = async () => {
    setIsloading(true);
    try {
      const response = await movieTotalAPI(location.pathname);
      console.log(response.data.data.items);
      setMovies(response.data.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }

  // const handleChangeQuery = (e) => {
  //   setQuery(e.target.value);
  // };

  // const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  // const loading = !data && !error;
  // const lastPage = data && data[data.length - 1].results.length;
  // const isReachingEnd = lastPage < itemPerPage;

  // const handleSearch = () => {
  //   if (query) {
  //     setUrl(API.getSearchMovie(query, pageDefault));
  //   }
  // };

  // useEffect(() => {
  //   if (debounceValue == "") {
  //     setUrl(API.getMovieList("popular"));
  //   }
  // }, [pageDefault, debounceValue]);

  useEffect(() => {
    const handleClickInput = (e) => {
      if (e.target.matches(".input-search")) {
        e.target.focus();
      } else {
        const input = document.querySelector(".input-search");
        if (input) input.blur();
      }
    };
    document.addEventListener("click", handleClickInput);
    return () => document.removeEventListener("click", handleClickInput);
  }, []);

  useEffect(() => {
    fetchDataMovie();
  }, []);


  return (  
    <>
      <div className="container pb-9">
        <div className="flex items-center mt-10 mb-10 ">
          <div className="w-full p-4 bg-[#2f3032]">
            <input
              type="text"
              className="input-search w-full outline-none bg-transparent placeholder:text-[15px]"
              placeholder="Type here to search..."
              // value={query}
              // onChange={handleChangeQuery}
            />
          </div>
          <button
            className="px-5 py-4 transition-all bg-primary hover:opacity-80"
            //onClick={handleSearch}
          >
            <i className="text-[16px] bx bx-search"></i>
          </button>
        </div>

        {isLoading && (
          <div className="grid grid-cols-4 gap-5 ">
            {new Array(itemPerPage).fill(0).map(() => (
              <LoadingSkeleton key={v4()}></LoadingSkeleton>
            ))}
          </div>
        )}
        {!isLoading && (
          <div className="grid grid-cols-4 gap-5 ">
            {movies.length > 0 &&
              movies.map((item) => (
                <div key={item.id}>
                  <MovieCard item={item} check="movie"></MovieCard>
                </div>
              ))}
          </div>
        )}
        {/* <Button
          className="max-w-[160px] mx-auto mt-10"
          onClick={() => setSize(size + 1)}
          disabled={isReachingEnd}
        >
          Load more
        </Button> */}
      </div>
    </>
  );
};

export default MoviePage;
