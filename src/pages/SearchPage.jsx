import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { movieSearchAPI } from "../configAPI/movieTotal";
import LoadingSkeleton from "../components/loading/LoadingSkeleton";
import GeneralCard from "../components/movie/GeneralCard";
import Button from "../components/button/Button";

const itemPerPage = 20;

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword") || "";

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isReachingEnd, setIsReachingEnd] = useState(false);

  const fetchDataMovie = async (currentPage = 1, isReset = false) => {
    if (!keyword.trim()) return;

    setIsLoading(true);
    try {
      const response = await movieSearchAPI(keyword, currentPage);
      const newItems = response.data.data.items;
      setMovies((prev) => (isReset ? newItems : [...prev, ...newItems]));
      if (newItems.length < itemPerPage) {
        setIsReachingEnd(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchDataMovie(nextPage);
  };

  useEffect(() => {
    const resetAndFetch = async () => {
      setPage(1);
      setMovies([]);
      setIsReachingEnd(false);
      await fetchDataMovie(1, true);
    };
    resetAndFetch();
  }, [keyword]);

  return (
    <div className="container pb-9 mt-10">
      <h2 className="text-xl font-bold mb-6">
        Kết quả tìm kiếm cho: "<span className="text-primary">{keyword}</span>"
      </h2>

      {isLoading && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {new Array(itemPerPage).fill(0).map(() => (
            <LoadingSkeleton key={uuidv4()} />
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {movies.length > 0 ? (
            movies.map((item) => (
              <div key={item.id}>
                <GeneralCard item={item} check="movie" />
              </div>
            ))
          ) : (
            <p className="col-span-full text-white text-center">
              Không tìm thấy kết quả.
            </p>
          )}
        </div>
      )}

      {!isLoading && !isReachingEnd && movies.length > 0 && (
        <Button
          className="max-w-[160px] mx-auto mt-10"
          onClick={handleLoadMore}
          disabled={isReachingEnd}
        >
          Load more
        </Button>
      )}
    </div>
  );
};

export default SearchPage;
