import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import Marvellogo from "../img/marvel-logo.png";
import { MdFavoriteBorder } from "react-icons/md";

const Header = ({ search, setSearch }) => {
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <img src={Marvellogo} alt="marvel logo" />
        </Link>
        <div className="search-bar">
          <IoSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un personnage"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="menu">
          <Link to="/comics">COMICS</Link>
          <Link to="/">CHARACTERS</Link>
          <MdFavoriteBorder />
          <Link to="/comics">FAVORITES</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
