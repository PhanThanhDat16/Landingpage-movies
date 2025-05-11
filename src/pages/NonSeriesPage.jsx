import { useEffect, useState } from "react";
import LoadingSkeleton from "../components/loading/LoadingSkeleton";
import { useLocation } from "react-router-dom";
import { v4 } from "uuid";
import { movieTotalAPI, movieSearchAPI } from "../configAPI/movieTotal";
import Button from "../components/button/Button";
import useDebounceQuery from "../hooks/useDebounceQuery";
import GeneralCard from "../components/movie/GeneralCard";

const itemPerPage = 20;
const NonSeriesPage = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const debounceValue = useDebounceQuery(query, 600);
  const [page, setPage] = useState(1);
  const [isReachingEnd, setIsReachingEnd] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [movies, setMovies] = useState([]);

  const fetchDataMovie = async (currentPage = 1, isReset = false) => {
    setIsloading(true);
    try {
      const response = await movieTotalAPI(location.pathname, currentPage);
      const newItems = response.data.data.items;
      if (isReset) {
        setMovies(newItems);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...newItems]);
      }
      if (newItems.length < itemPerPage) {
        setIsReachingEnd(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const fetchDataSearch = async (keyword, currentPage = 1) => {
    setIsloading(true);
    try {
      const response = await movieSearchAPI(keyword, currentPage);
      const newItems = response.data.data.items;
      setMovies(newItems);
      if (newItems.length < itemPerPage) {
        setIsReachingEnd(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchDataMovie(nextPage);
  };

  useEffect(() => {
    const searchMovie = async () => {
      if (debounceValue.trim() === "") {
        await fetchDataMovie(1, true);
        setIsReachingEnd(false);
        return;
      }
      await fetchDataSearch(debounceValue, 1);
    };
    searchMovie();
  }, [debounceValue]);

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
    const resetAndFetch = async () => {
      setPage(1);
      setMovies([]);
      setIsReachingEnd(false);
      await fetchDataMovie(1, true);
    };
    resetAndFetch();
  }, [location.pathname]);

  return (
    <>
      <div className="container pb-9">
        <div className="flex items-center mt-10 mb-10">
          <div className="w-full p-4 bg-[#2f3032]">
            <input
              type="text"
              className="input-search w-full outline-none bg-transparent placeholder:text-[15px]"
              placeholder="Type here to search..."
              value={query}
              onChange={handleChangeQuery}
            />
          </div>
          <button className="px-5 py-4 transition-all bg-primary hover:opacity-80">
            <i className="text-[16px] bx bx-search"></i>
          </button>
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {new Array(itemPerPage).fill(0).map(() => (
              <LoadingSkeleton key={v4()} />
            ))}
          </div>
        )}

        {!isLoading && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {movies.length > 0 &&
              movies.map((item) => (
                <div key={item.id + v4()}>
                  <GeneralCard item={item} check="movie" />
                </div>
              ))}
          </div>
        )}

        {!isLoading && !isReachingEnd && (
          <Button
            className="max-w-[160px] mx-auto mt-10"
            onClick={handleLoadMore}
            disabled={isReachingEnd}
          >
            Load more
          </Button>
        )}
      </div>
    </>
  );
};

export default NonSeriesPage;
