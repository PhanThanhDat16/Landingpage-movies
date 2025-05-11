import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import { useEffect, useState, useRef } from "react";
import { categoryAPI, countryAPI } from "../../configAPI/movieTotal";

const Header = ({ setShowSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const countryRef = useRef(null);
  const categoryRef = useRef(null);
  const searchMobileRef = useRef(null);

  const handleChangeQuery = (e) => setQuery(e.target.value);

  const fetchData = async () => {
    try {
      const responseCountry = await countryAPI();
      setCountries(responseCountry.data.slice(0, -2));
      const responseCategory = await categoryAPI();
      setCategories(responseCategory.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      if (
        searchMobileRef.current &&
        !searchMobileRef.current.contains(event.target)
      ) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/tim-kiem?keyword=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <div className="h-[75px] flex items-center bg-black fixed top-0 left-0 right-0 z-[100] border-b-2 border-[#363437] bg-gradient-to-r from-[#181818] to-[#181818]/70 px-5 py-5">
      <Logo className="!mb-0" />
      <div className="flex justify-between flex-1 items-center">
        {/* Desktop Menu */}
        <div className="hidden md:flex pl-8 gap-[20px] text-base font-semibold p-3">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/tv-shows"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            TV Shows
          </NavLink>
          <NavLink
            to="/phim-bo"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Phim bộ
          </NavLink>
          <NavLink
            to="/phim-le"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Phim lẻ
          </NavLink>
          <NavLink
            to="/hoat-hinh"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Hoạt hình
          </NavLink>

          {/* Quốc gia Dropdown */}
          <div className="relative select-none" ref={countryRef}>
            <span
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="cursor-pointer hover:text-primary"
            >
              Quốc gia
            </span>
            {showCountryDropdown && (
              <div className="flex flex-wrap absolute top-[130%] right-0 w-[500px] max-h-[500px] overflow-y-auto bg-[#252328] shadow-md rounded-md z-50">
                {countries.map((country) => (
                  <NavLink
                    key={country.slug}
                    to={`/quoc-gia/${country.slug}`}
                    className="w-1/3 content-center hover:bg-pink-400 hover:text-black text-white text-sm text-center rounded-md p-1"
                    onClick={() => setShowCountryDropdown(false)}
                  >
                    {country.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Thể loại Dropdown */}
          <div className="relative select-none" ref={categoryRef}>
            <span
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="cursor-pointer hover:text-primary"
            >
              Thể loại
            </span>
            {showCategoryDropdown && (
              <div className="flex flex-wrap absolute top-[130%] right-0 w-[500px] max-h-[400px] overflow-y-auto bg-[#252328] shadow-md rounded-md z-50">
                {categories.map((category) => (
                  <NavLink
                    key={category.slug}
                    to={`/the-loai/${category.slug}`}
                    className="w-1/3 content-center hover:bg-pink-400 hover:text-black text-white text-sm text-center rounded-md p-1"
                    onClick={() => setShowCategoryDropdown(false)}
                  >
                    {category.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex pl-8 gap-[20px] text-base font-semibold relative items-center">
          <div className="relative">
            <i className="bx bx-search-alt-2 text-stone-800 absolute left-3 top-1/2 -translate-y-1/2 text-2xl"></i>
            <input
              type="text"
              name="keyword"
              className="focus:ring-2 focus:ring-blue-500 focus:outline-none text-base text-black rounded-full py-2 pl-10 pr-5 font-semibold"
              aria-label="Tìm kiếm phim"
              placeholder="Tìm kiếm phim..."
              value={query}
              onChange={handleChangeQuery}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        {/* Mobile Search Icon */}
        <div className="flex justify-end px-4 pt-2 ml-auto md:hidden">
          <i
            className="bx bx-search-alt-2 text-white text-2xl cursor-pointer"
            onClick={() => setShowSearch(!showSearch)}
          ></i>
        </div>

        {/* Mobile Search Box */}
        {showSearch && (
          <div
            ref={searchMobileRef}
            className="absolute top-[75px] left-0 right-0 bg-white p-2 rounded-md shadow-md z-50"
          >
            <input
              type="text"
              name="keyword"
              className="w-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-base text-black rounded-full py-2 pl-4 pr-5 font-semibold"
              aria-label="Tìm kiếm phim"
              placeholder="Tìm kiếm phim..."
              value={query}
              onChange={handleChangeQuery}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {/* Login Button */}
        <div className="hidden md:flex pl-8 gap-[20px] text-base font-semibold p-3">
          <NavLink to="/login">Đăng nhập / Đăng ký</NavLink>
        </div>
      </div>

      {/* Mobile Sidebar Icon */}
      <div className="flex justify-end px-4 pt-2 ml-auto md:hidden">
        <span
          className="flex items-center justify-end px-2 py-1 rounded-md cursor-pointer open-sidebar w-max bg-primary"
          onClick={() => setShowSidebar(true)}
        >
          <i className="text-base text-white pointer-events-none bx bx-menu"></i>
        </span>
      </div>
    </div>
  );
};

export default Header;
