import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Banner from "../components/banner/Banner";
import SidebarMenu from "../components/sidebar/SidebarMenu";

const Main = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="p-5 bg-black">
        <Header setShowSidebar={setShowSidebar} />
        <div className={`${location.pathname === "/" ? "block" : "hidden"}`}>
          <Banner />
        </div>

        <SidebarMenu show={showSidebar} onClose={() => setShowSidebar(false)} />
        {showSidebar && (
          <div
            onClick={() => setShowSidebar(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-[900] md:hidden"
          ></div>
        )}

        <div
          className={` ${
            location.pathname === "/" ? "pt-[500px] md:pt-[555px]" : "pt-[55px]"
          }`}
        >
          <div className="w-full ">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      {visible && (
        <div className="fixed bottom-0 scroll-header right-5 cursor-pointer p-2 h-10 w-10 bg-red-500 z-[1000]">
          <a
            href="#root"
            className="flex items-center justify-center w-full h-full"
          >
            <i className="text-3xl bx bx-chevron-up"></i>
          </a>
        </div>
      )}
      <Footer></Footer>
    </>
  );
};

export default Main;
