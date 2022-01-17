import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BurgerIcon from "../../assets/images/BurgerIcon.svg";
import CloseIcon from "../../assets/images/CloseIcon.svg";
import SearchIcon from "../../assets/images/SearchIcon.svg";
import logo from "../../assets/images/TwitchIcon.svg";

export default function Header() {
  const [menu, showMenu] = useState(false);

  const [smallScreen, setSmallScreen] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    // addlistener c'est comme addeventlisterner pour les medias queries en JS
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  });

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  };

  const toggleNavRes = () => {
    showMenu(!menu);
  };

  const hideMenu = () => {
    if (menu === true) {
      showMenu(!menu);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleKeyPress = (e) => {
    setSearchInput(e.target.value);
  };

    return (
        <div className="SiteHeader">
            <div className="SiteHeader-wrapper">
                <div className="SiteLogo">
                    <Link className="SiteLogo-link" to="/">
                        <img src={logo} alt="logo twitch" className="SiteLogo-img" />
                    </Link>
                </div>
                <nav className={!menu ? "MainMenu" : "MainMenu MainMenu--isOpen"}>
                    {(menu || !smallScreen) && (
                        <ul className="MainMenu-list">
                        <li onClick={hideMenu} className="MainMenu-item">
                            <Link className="MainMenu-link" to="/">
                            Top Games
                            </Link>
                        </li>

                        <li onClick={hideMenu} className="MainMenu-item">
                            <Link className="MainMenu-link" to="/top-streams">
                            Top Streams
                            </Link>
                        </li>
                        </ul>
                    )}
                </nav>
                <div className="QuickSearch">
                    <form
                    className="QuickSearch-form"
                    onSubmit={handleSubmit}
                    >
                        <input
                            required
                            value={searchInput}
                            onChange={(e) => handleKeyPress(e)}
                            type="text"
                            className="QuickSearch-input"
                        />

                        <Link
                            className="QuickSearch-submit"
                            to={{
                            pathname: `/resultats/${searchInput}`,
                            }}
                        >
                            <button type="submit">
                            <img
                                src={SearchIcon}
                                alt="Icône loupe"
                                className="QuickSearch-icon"
                            />
                            </button>
                        </Link>
                    </form>
                </div>
                <div className="BurgerMenu">
                    <img
                        onClick={toggleNavRes}
                        src={!menu ? BurgerIcon : CloseIcon}
                        alt=""
                        className="BurgerMenu-icon"
                    />
                </div>
            </div>
        </div>
    );
}
