import { Link } from "react-router-dom";
import logo from "../../assets/logo/netflix-logo.png";
import "../../styles/header.scss";
import useScroll from "../../Utils/useScroll";

export const Header = () => {
  const scrolled = useScroll();


  return (
    <div className={`header ${scrolled ? 'scroll' : ''}`}>
      <span className="logo">
        <img src={logo} alt="Logo" />
      </span>
      <span className="links">
        <Link to={"home"}>Home</Link>
        <Link to={"tvshows"}>Tv Shows</Link>
        <Link to={"movies"}>Movies</Link>
        <Link to={"mylist"}>My List</Link>
      </span>
      <span className="actions">{/* to do */}</span>
    </div>
  );
};
