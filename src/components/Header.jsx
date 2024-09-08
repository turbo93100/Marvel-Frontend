import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">
        <img
          className="header-logo"
          src="src/assets/images/logo.ad6c786b.svg"
          alt="marvel-logo"
        />
      </Link>
      <Link to="/characters">
        <button>Characters</button>
      </Link>
      <Link to="/comics">
        <button>Comics</button>
      </Link>
      <Link to="/favoris">
        <button>Favoris</button>
      </Link>
    </div>
  );
};

export default Header;
