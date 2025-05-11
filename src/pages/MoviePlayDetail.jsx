import { Link, useParams } from "react-router-dom";
import { movieAPI } from "../configAPI/movie";
import { useEffect, useState } from "react";
import Video from "../components/video/Video";
import LoadingSquareSkeleton from "../components/loading/LoadingSquareSkeleton";

const MoviePlayDetail = () => {
  const params = useParams();
  const { idMovie, id } = params;
  const [movie, setMovie] = useState([]);
  const [episodess, setEpisodess] = useState([]);
  const [url, setUrl] = useState(null);
  const [part, setPart] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovieDetail = async () => {
    setIsLoading(true);
    try {
      const response = await movieAPI(idMovie);
      setEpisodess(response.data.episodes);
      setMovie(response.data.movie);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetail();
  }, [id]);

  useEffect(() => {
    if (!id || episodess.length === 0) return;

    let found = null;
    episodess.forEach((endpoint) => {
      const foundItem = endpoint.server_data.find((item) => item.slug === id);
      if (foundItem) found = foundItem;
    });

    if (found) {
      setUrl(found.link_embed);
    } else if (episodess[0]?.server_data?.length > 0) {
      setUrl(episodess[0].server_data[0].link_embed);
    }

    if (id) {
      setPart(episodess[0].server_data[Number(id.split("-")[1]) - 1]?.name);
    }
  }, [id, episodess]);

  return (
    <div>
      <div className="flex  mb-5 md:mt-5 items-center gap-2 text-sm font-bold text-[#ff9641]">
        <span className="flex items-center gap-2">
          <i className="bx bxs-home"></i>
          <span className="text-xs md:text-sm">Xem Phim</span>
        </span>
        {!isLoading && (
          <>
            <span className="text-xs md:text-sm"> / </span>
            <span className="text-xs md:text-sm">{movie.name}</span>
            <span className="text-xs md:text-sm"> / </span>
            <span className="text-xs text-white md:text-sm">
              {part || "Full"}
            </span>
          </>
        )}
      </div>

      {isLoading && <Video url="" />}
      {!isLoading && url?.trim() && <Video url={url} />}

      {isLoading && (
        <>
          <div className="my-20">
            <div className="flex flex-col gap-1 pb-3 mb-5 border-b-8 border-[#222]">
              <LoadingSquareSkeleton className="h-[30px] rounded-lg w-[200px]" />
              <LoadingSquareSkeleton className="h-[20px] rounded-lg w-[100px]" />
            </div>

            <span className="inline-block mb-2 text-xl font-bold">
              Nội dung
            </span>
            <LoadingSquareSkeleton className="h-[50px] rounded-lg w-[500px]" />
          </div>
        </>
      )}

      {!isLoading && (
        <>
          <div>
            {episodess.length > 0 &&
              episodess.map((endpoint) => (
                <div key={endpoint.server_name}>
                  <span className="inline-block my-2 text-base font-bold">
                    {endpoint.server_name}
                  </span>
                  <div
                    className={` text-sm font-bold grid grid-cols-4 gap-2 sm:grid-cols-7 md:grid-cols-12 lg:grid-cols-16 ${
                      endpoint.server_data.length > 100
                        ? "h-[300px] overflow-y-scroll scroll-box-y"
                        : ""
                    }`}
                  >
                    {endpoint.server_data.length > 1 &&
                      endpoint.server_data.map((item) => (
                        <Link
                          to={`/phim/${params.idMovie}/${item.slug}`}
                          key={item.slug}
                          className="px-2 py-2 flex items-center justify-center text-center text-white transition-all rounded-lg cursor-pointer bg-[#999] hover:bg-slate-400"
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
          </div>

          <div className="my-20">
            <div className="flex flex-col gap-1 pb-3 mb-5 border-b-8 border-[#222]">
              <h1 className="inline-block text-2xl font-bold text-[#c39913]">
                {movie.name}
              </h1>
              <span className="text-lg ">{movie.origin_name}</span>
            </div>

            <span className="inline-block mb-2 text-xl font-bold">
              Nội dung
            </span>
            <div className="text-base text-gray-400">{movie.content}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default MoviePlayDetail;
