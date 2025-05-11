import { NavLink } from "react-router-dom";

const Button = ({
  children,
  className,
  onClick = () => {},
  disabled = false,
  to = "",
}) => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (to !== "") {
    return (
      <NavLink
        to={to}
        className={`flex items-center justify-center w-full px-6 py-3 cursor-pointer  text-center rounded-lg bg-primary gap-x-1 `}
        id="#traffic"
        onClick={handleClick}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <div
      className={`flex items-center justify-center w-full px-6 py-3 cursor-pointer  text-center rounded-lg bg-primary gap-x-1 ${className} ${
        disabled ? "hidden" : "block"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </div>
  );
};

export default Button;
