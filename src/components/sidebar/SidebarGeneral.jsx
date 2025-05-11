import Title from "./Title";
import { NavLink } from "react-router-dom";

const SidebarGeneral = () => {
  return (
    <>
      <Title>GENERAL</Title>
      <NavLink to="/sign-in" className="flex items-center gap-2 p-3">
        <i className="text-xl bx bx-user-circle"></i>
        <span className="text-base font-semibold ">Login</span>
      </NavLink>
    </>
  );
};

export default SidebarGeneral;
