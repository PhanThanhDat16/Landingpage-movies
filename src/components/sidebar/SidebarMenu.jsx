import { NavLink } from "react-router-dom";
import SidebarTraffic from "./SidebarTraffic";
import Title from "./Title";
import { useEffect, useState, useRef } from "react";
import { categoryAPI, countryAPI } from "../../configAPI/movieTotal";

const SidebarMenu = ({ show, onClose }) => {
  const [isLoading, setIsloading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const countryRef = useRef(null);
  const categoryRef = useRef(null);

  const fetchData = async (currentPage = 1, isReset = false) => {
    setIsloading(true);
    try {
      const responseCountry = await countryAPI();
      setCountries(responseCountry.data);
      const responseCategory = await categoryAPI();
      setCategories(responseCategory.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-[250px] h-full z-[1000] bg-[#181818] text-white transition-transform duration-300 ease-in-out transform ${
        show ? "translate-x-0" : "-translate-x-full"
      } md:hidden overflow-y-auto`}
    >
      <div className="flex justify-end p-4">
        <button onClick={onClose}>
          <i className="text-xl bx bx-x"></i>
        </button>
      </div>
      <div className="px-4 mb-8">
        <SidebarTraffic />
        <Title>MENU</Title>
      </div>
      <nav className="flex flex-col gap-4 px-6 text-base font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
          onClick={onClose}
        >
          Home
        </NavLink>
        <NavLink
          to="/tv-shows"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
          onClick={onClose}
        >
          TV Shows
        </NavLink>
        <NavLink
          to="/phim-bo"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
          onClick={onClose}
        >
          Phim bộ
        </NavLink>
        <NavLink
          to="/phim-le"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
          onClick={onClose}
        >
          Phim lẻ
        </NavLink>
        <NavLink
          to="/hoat-hinh"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
          onClick={onClose}
        >
          Hoạt hình
        </NavLink>

        {/* Quốc gia */}
        <div className="relative select-none" ref={countryRef}>
          <span
            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            className="cursor-pointer hover:text-primary"
          >
            Quốc gia
          </span>
          {showCountryDropdown && (
            <div className="flex flex-wrap w-full bg-[#252328] shadow-md rounded-md mt-2 transition-all duration-300">
              {countries.map((country) => (
                <NavLink
                  key={country.slug}
                  to={`/quoc-gia/${country.slug}`}
                  className="w-1/2 py-2 hover:bg-pink-400 hover:text-black text-white text-sm text-center rounded-md"
                  onClick={() => setShowCountryDropdown(false)}
                >
                  {country.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
        {/* Thể loại */}
        <div className="relative select-none" ref={categoryRef}>
          <span
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="cursor-pointer hover:text-primary"
          >
            Thể loại
          </span>
          {showCategoryDropdown && (
            <div className="flex flex-wrap w-full bg-[#252328] shadow-md rounded-md mt-2 transition-all duration-300">
              {categories.map((category) => (
                <NavLink
                  key={category.slug}
                  to={`/the-loai/${category.slug}`}
                  className="w-1/2 py-2 hover:bg-pink-400 hover:text-black text-white text-sm text-center rounded-md"
                  onClick={() => setShowCategoryDropdown(false)}
                >
                  {category.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <NavLink to="/login">Đăng nhập/ Đăng ký</NavLink>
      </nav>
    </div>
  );
};

export default SidebarMenu;
