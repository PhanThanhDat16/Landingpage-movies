import Button from "../button/Button";

const MovieCard = ({ item }) => {
  return (
    <div
      className={`flex flex-col p-3 rounded-lg h-full movie-card bg-[rgb(47,48,50)] w-60`}
    >
      <img
        src={item.poster_url}
        className="h-[250px] object-cover w-full rounded-lg mb-5 flex-shrink-0"
        alt=""
      />
      <div className="flex flex-col h-full">
        <h3 className="mb-auto text-[16px] font-bold text-white line-clamp-2">
          {item.name}
        </h3>
        <div className="flex items-center justify-between text-[#8d939c] text-[13px] mb-4 mt-2">
          <span>{item.year}</span>
          <div className="flex items-center gap-1">
            {Number(item?.tmdb?.vote_average) ||
            Number(item?.tmdb?.vote_average) === 0 ? (
              <span>
                <i className="text-yellow-400 bx bxs-star"></i>
              </span>
            ) : (
              ""
            )}
            <span>
              {Number(item?.tmdb?.vote_average).toFixed(2) || item.time}
            </span>
          </div>
        </div>
        <Button to={`/phim/${item.slug}`}>Xem ngay</Button>
      </div>
    </div>
  );
};

export default MovieCard;
