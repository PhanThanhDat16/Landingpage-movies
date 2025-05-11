import { API } from "../../configAPI/configAPI";
import Button from "../button/Button";

const MovieCardTVSM = ({ item, check = "tv" }) => {
  return (
    <>
      <div
        className="flex flex-col p-3  rounded-lg movie-scroll bg-[rgb(47,48,50)] flex-shrink-0"
        key={item.id}
      >
        <img
          src={`${API.getImage(item.poster_path)}`}
          className="h-[250px] object-cover w-full rounded-lg mb-5 flex-shrink-0"
          alt=""
        />
        <div className="flex flex-col h-full">
          <h3 className="mb-auto text-[16px] font-bold text-white line-clamp-2 break-words">
            {item.name}
          </h3>
          <div className="flex items-center justify-between text-[#8d939c] text-[13px] mb-4 mt-2">
            <span>
              {" "}
              {new Date(item.first_air_date).getFullYear() ||
                new Date().getFullYear()}
            </span>
            <div className="flex items-center gap-1">
              <span>{Number(item.vote_average).toFixed(1) || 0.0}</span>
              <i className="text-yellow-500 bx bxs-star"></i>
            </div>
          </div>
          <Button
            to={`${
              check === "movies"
                ? `/movies/detail/${item.id}`
                : `/tv/detail/${item.id}`
            }`}
          >
            Watch Now
          </Button>
        </div>
      </div>
    </>
  );
};

export default MovieCardTVSM;
