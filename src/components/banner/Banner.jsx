import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { API, fetcher } from "../../configAPI/configAPI";

const Banner = () => {
  const { data } = useSWR(API.getMovieList("upcoming"), fetcher);
  const movies = data?.results || [];
  const navigate = useNavigate();

  return (
    <section className="banner pt-[50px] md:pt-[75px] absolute left-0 right-0 h-[500px] page-container overflow-hidden">
      <Swiper
        grabCursor={"true"}
        slidersPerView={"auto"}
        className="swiper-banner"
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id} className="p-5">
              <div className="relative grid h-full grid-cols-2 gap-5 banner-wrapper">
                <div className="">
                  <h2 className="mb-3 font-bold text-white xs:text-xl md:text-3xl">
                    {item.title}
                  </h2>

                  <p className="text-gray-300 text-fiveLine ">
                    {item.overview}
                  </p>
                  <div className="flex flex-col gap-1 md:flex-row ">
                    <span className="mt-2 text-gray-200">
                      Lượt đánh giá:
                      <span className="text-sm text-yellow-400 md:text-base">
                        <i className="ml-2 mr-1 text-yellow-500 bx bxs-star"></i>
                        <span className="text-gray-400">
                          {Number(item.vote_average).toFixed(2)}
                        </span>
                      </span>
                    </span>

                    <span className="text-sm text-gray-400 md:text-base p-2">
                      Phát hành: {item.release_date}
                    </span>
                  </div>

                  <Button
                    className="flex items-center gap-2 mt-6 text-sm text-white md:px-6 md:text-base w-max "
                    onClick={() => navigate(`/movie/detail/${item.id}`)}
                  >
                    <i className="text-xl bx bx-play-circle"></i>
                    Xem Trailer
                  </Button>
                </div>
                <BannerItem item={item}></BannerItem>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ item }) {
  const { poster_path } = item;
  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="absolute inset-0 overlay bg-gradient-to-t from-[rgba(0,0,0,0.5)] top-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={API.getImage(poster_path)}
        alt=""
        className="object-cover xs:h-[350px] w-full md:h-full "
      />
    </div>
  );
}

export default Banner;
