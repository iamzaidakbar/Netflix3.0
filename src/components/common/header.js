import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo/netflix-logo.png";
import "../../styles/header.scss";
import useScroll from "../../Utils/useScroll";
import SearchBar from "./search-bar";
import Notification from "./notification";
import Avatar from "./avatar";

export const Header = () => {
  const scrolled = useScroll();
  const location = useLocation();

  const isBrowsePage = location.pathname.includes("browse");
  const isHomePage = location.pathname.includes("home");

  return (
    <div
      className={`header ${scrolled ? "scroll" : ""} ${
        !isHomePage && !isBrowsePage ? "dark" : ""
      }`}
    >
      <span className="logo_links">
        <span className="logo">
          <img src={logo} alt="Logo" />
        </span>
        <span className="links">
          <Link to={"/home"}>Home</Link>
          <Link to={"/genre"}>Exlpore Genre</Link>
          <Link to={"/mylist"}>My List</Link>
        </span>
      </span>
      <span className="actions">
        <SearchBar />
        <Notification />
        <Avatar />
        {isBrowsePage ? (
          <Link
            onClick={() => {
              history.back();
            }}
          >
            <span className="material-icons-outlined back">arrow_back</span>
          </Link>
        ) : null}
      </span>
    </div>
  );
};
