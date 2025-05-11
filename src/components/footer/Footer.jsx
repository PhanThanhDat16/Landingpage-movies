import { NavLink } from "react-router-dom";
import Logo from "../logo/Logo";

const Footer = () => {
  return (
    <>
      <div className="bg-[linear-gradient(to_right_bottom,#47001c,#971132)] w-full p-5">
        <div className="container flex flex-col items-center justify-between md:flex-row ">
          <div className="mb-3 md:mb-0">
            <h1 className="text-xl italic font-bold text-center text-transparent md:text-left bg-gradient-to-b from-primary to-yellow-500 bg-clip-text">
              TRIAL START FIRST 30 DAYS.
            </h1>
            <span className="inline-block text-base italic text-center md:text-left">
              Enter your email to create or restart your membership.
            </span>
          </div>
          <div className="w-full max-w-[500px] py-2 px-4 rounded-md bg-white/20 flex items-center justify-between">
            <input
              type="email"
              className="w-full bg-transparent border-none outline-none placeholder:text-[15px] pr-3"
              placeholder="Enter your email"
            />
            <span className="flex-shrink-0 py-2 px-3 text-[12px] font-semibold uppercase bg-yellow-400 rounded-md cursor-pointer">
              get started
            </span>
          </div>
        </div>
      </div>

      <div className="w-full py-10 bg-black/30">
        <div className="container ">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col justify-between gap-2 md:flex-row">
              <div className="hidden md:block">
                <Logo className="mb-0"></Logo>
              </div>
              <div className="flex justify-center gap-4">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/tv-shows">TV Shows</NavLink>
                <NavLink to="/movies">Movies</NavLink>
                <NavLink to="/actors">Actors</NavLink>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between md:flex-row">
              <p className="mb-3 text-sm md:mb-0">
                2024 Movie World All Rights Reserved by{" "}
                <span className="text-primary">Phan Dat</span>
              </p>
              <div className="flex items-center gap-4">
                <i className="bx bxl-facebook-circle"></i>
                <i className="bx bxl-youtube"></i>
                <i className="bx bxl-twitter"></i>
                <i className="bx bxl-instagram-alt"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
