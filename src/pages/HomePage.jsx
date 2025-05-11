import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <div className="container">
      <section className="pb-16 movies-layout">
        <h2 className="mb-8 text-3xl font-bold text-white capitalize">
          Phim Mới
        </h2>
        <MovieList type="v1"></MovieList>
      </section>
      <section className="pb-16 movies-layout">
        <h2 className="mb-8 text-3xl font-bold text-white capitalize">
          Top Phim
        </h2>
        <MovieList type="v2"></MovieList>
      </section>
      <section className="pb-16 movies-layout">
        <h2 className="mb-8 text-3xl font-bold text-white capitalize">
          Phim Trending
        </h2>
        <MovieList type="v3"></MovieList>
      </section>
    </div>
  );
};

export default HomePage;
