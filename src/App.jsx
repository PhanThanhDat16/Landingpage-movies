import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./layouts/Main";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const TVPage = lazy(() => import("./pages/TVPage"));
// const TVDetail = lazy(() => import("./pages/TVDetail"));
// const MoviePage = lazy(() => import("./pages/MoviePage"));
const SeriesPage = lazy(() => import("./pages/SeriesPage"));
const NonSeriesPage = lazy(() => import("./pages/NonSeriesPage"));
const AnimePage = lazy(() => import("./pages/AnimePage"));
const MoviePageDetail = lazy(() => import("./pages/MoviePageDetail"));
const MovieNewPageDetail = lazy(() => import("./pages/MovieNewPageDetail"));
const MoviePlayDetail = lazy(() => import("./pages/MoviePlayDetail"));
const CountryPage = lazy(() => import("./pages/CountryPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route element={<Main></Main>}>
          <Route
            path="/"
            element={
              <>
                <HomePage></HomePage>
              </>
            }
          ></Route>

          <Route path="/tv-shows" element={<TVPage></TVPage>}></Route>

          {/* <Route
            path="/tv-shows/detail/:id"
            element={<TVDetail></TVDetail>}
          ></Route> */}

          <Route path="/phim-bo" element={<SeriesPage></SeriesPage>}></Route>

          {/* <Route
            path="/phim-bo/detail/:id"
            element={<MoviePageDetail></MoviePageDetail>}
          ></Route> */}

          <Route
            path="/movie/detail/:id"
            element={<MoviePageDetail></MoviePageDetail>}
          ></Route>

          <Route
            path="/phim-le"
            element={<NonSeriesPage></NonSeriesPage>}
          ></Route>

          <Route path="/hoat-hinh" element={<AnimePage></AnimePage>}></Route>

          <Route
            path="/phim/:id"
            element={<MovieNewPageDetail></MovieNewPageDetail>}
          ></Route>

          <Route
            path="/phim/:idMovie/:id"
            element={<MoviePlayDetail></MoviePlayDetail>}
          ></Route>

          <Route
            path="/quoc-gia/:id"
            element={<CountryPage></CountryPage>}
          ></Route>

          <Route
            path="/the-loai/:id"
            element={<CategoryPage></CategoryPage>}
          ></Route>

          <Route path="/tim-kiem" element={<SearchPage></SearchPage>}></Route>
        </Route>

        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
    </Suspense>
  );
};

export default App;
