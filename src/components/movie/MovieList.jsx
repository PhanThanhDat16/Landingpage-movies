import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/scss";
import "swiper/swiper-bundle.css";
import { v4 } from "uuid";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import { useEffect, useState } from "react";
import {
  newUpdatev1API,
  newUpdatev2API,
  newUpdatev3API,
} from "../../configAPI/newUpdate";

const itemPerPage = 20;
const MovieList = ({ type = "v1" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const fetchMovieUpdate = async () => {
    setIsLoading(true);
    try {
      if (type === "v1") {
        const response = await newUpdatev1API();
        setMovies(response.data.items);
      } else if (type === "v2") {
        const response = await newUpdatev2API(2);
        setMovies(response.data.items);
      } else {
        const response = await newUpdatev3API(3);
        setMovies(response.data.items);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieUpdate();
  }, []);

  return (
    <div className="movie-list">
      <Swiper
        grabCursor={"true"}
        spaceBetween={20}
        slidesPerView={"auto"}
        className="homeSwiper"
      >
        {isLoading &&
          new Array(itemPerPage).fill(0).map(() => (
            <SwiperSlide key={v4()}>
              <LoadingSkeleton></LoadingSkeleton>
            </SwiperSlide>
          ))}
        {!isLoading &&
          movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id + v4()}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
