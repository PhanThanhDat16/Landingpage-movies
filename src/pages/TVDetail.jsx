import { useParams } from "react-router-dom";
import useSWR from "swr";
import { API, fetcher } from "../configAPI/configAPI";
import Button from "../components/button/Button";
import MovieCardTVSM from "../components/movie/MovieCardTVSM";

const TVDetail = () => {
  const { id } = useParams();
  const { data, error } = useSWR(API.getTVDetail(id), fetcher);
  if (!data) return null;
  const { name, genres, backdrop_path, poster_path, overview, homepage } = data;
  return (
    <div className="my-20">
      <div className="h-[600px] relative w-full">
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
      <div className="h-[400px] max-w-[800px] mx-auto rounded-xl overflow-hidden -mt-[200px] z-10 relative">
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
        {name}
      </h1>
      <div className="flex items-center justify-center mb-10 gap-x-5">
        {genres.length > 0 &&
          genres.map((item) => (
            <span
              key={item.id}
              className="px-4 py-2 border rounded border-primary text-primary"
            >
              {item.name}
            </span>
          ))}
      </div>

      <div className="text-[16px] text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        <p className="mb-5">{overview}</p>
        {homepage !== "" ? (
          <a href={`${homepage}`} target="_blank">
            Homepage:{" "}
            <span className="pl-4 underline text-primary">{homepage}</span>
          </a>
        ) : (
          <span className="font-bold text-red-500 ">Locked Movie</span>
        )}
      </div>
      <TVMeta type="logo"></TVMeta>
      <TVMeta type="similar"></TVMeta>
    </div>
  );
};

function TVMeta({ type }) {
  const { id } = useParams();
  const { data } = useSWR(API.getTVMeta(id, type), fetcher);
  if (!data) return null;
  if (type === "logo") {
    const { production_companies } = data;
    const logo = production_companies.slice(0, 2);
    console.log(logo);
    console.log(production_companies);
    if (!data) return null;
    return (
      <div className="py-10">
        {logo.length > 0 && (
          <h1 className="text-4xl italic font-bold text-center text-transparent bg-gradient-to-b from-primary to-yellow-500 bg-clip-text">
            Logo Companies
          </h1>
        )}
        <div className="flex items-center my-5 gap-x-20 max-w-[800px] mx-auto">
          {logo.length > 0 &&
            logo.map((item, index) => {
              if (item.logo_path === null) return null;
              return (
                <div key={item.id} className="flex-1 ">
                  <img
                    src={`${API.getImage(item.logo_path)}`}
                    className="object-cover w-full h-full "
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  if (type === "similar") {
    const { results } = data;
    return (
      <div className="w-full">
        <div className="flex py-4 overflow-y-auto list gap-x-5">
          {results.length > 0 &&
            results.map((item) => (
              <MovieCardTVSM
                item={item}
                key={item.id}
                check="tv"
              ></MovieCardTVSM>
            ))}
        </div>
      </div>
    );
  }
}

// getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,

export default TVDetail;
