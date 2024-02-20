import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo/netflix-logo.png";
import "../../styles/header.scss";
import useScroll from "../../Utils/useScroll";

export const Header = () => {
  const scrolled = useScroll();
  const location = useLocation();

  const isBrowsePage = location.pathname.includes("browse");

  return (
    <div className={`header ${scrolled ? "scroll" : ""}`}>
      <span className="logo_links">
        <span className="logo">
          <img src={logo} alt="Logo" />
        </span>
        <span className="links">
          {isBrowsePage ? null : <Link to={"home"}>Home</Link>}
          {isBrowsePage ? null : <Link to={"tvshows"}>Tv Shows</Link>}
          {isBrowsePage ? null : <Link to={"movies"}>Movies</Link>}
          <Link to={"mylist"}>My List</Link>
        </span>
      </span>
      <span className="actions">
        {isBrowsePage ? (
          <Link to={"/home"}>
            <span className="material-icons-outlined back">arrow_back</span>
          </Link>
        ) : null}
      </span>
    </div>
  );
};
