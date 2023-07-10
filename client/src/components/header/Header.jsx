import React from "react";
import SearchBar from "../search/SearchBar";
import { Link } from "react-router-dom";
import { useState } from "react";

import {
  IconNotifications,
  IconHamburgerMenu,
  IconBxSearchAlt,
  IconHouse,
  IconNewspaperSharp,
  Icon010Blog,
  IconProfile,
  IconBxsBookmarks,
  IconArrowTrendUp,
  IconHelp,
  IconLinkAdd,
  IconSquareInstagram,
  IconSquareTwitter,
  Icon402Facebook2,
  Icon458Linkedin,
  IconCalendarEventFill,
  IconMinutemailer,
} from "../../assets/icons";
import "./style.css";

const Header = () => {
  const [isOpened, setIsopen] = useState(false);
  const toggleMenu = () => {
    setIsopen(!isOpened);
  };

  return (
    <>
      <header>
        <div className="h-logo-holder">
          <Link to="/">
            <img className="h-logo" src={''} alt="orderly" />
          </Link>
        </div>
        <div className="lg-search">
          <SearchBar />
        </div>
        <nav className="h-nav">
          <Link to="/past-question">
            <div className="sx-search" title="search">
              <IconBxSearchAlt className="sx-search-icon" />
            </div>
          </Link>
          <div className="hamburger" title="Hamburger" onClick={toggleMenu}>
            <IconHamburgerMenu className="hamburger-icon" />
          </div>
          {/* {isOpened && (
            <div className="h-menu">
              <ul className="h-menu-items">
                <Link to="/">
                  <li title="Home" onClick={toggleMenu}>
                    <IconHouse className="h-menu-icon" /> &nbsp; &nbsp; Home
                  </li>
                </Link>
                <Link to="/past-question">
                  <li title="PQ&A" onClick={toggleMenu}>
                    <IconNewspaperSharp className="h-menu-icon" /> &nbsp; &nbsp;
                    PQ&A
                  </li>
                </Link>
                <Link to="/blog">
                  {" "}
                  <li title="Blog" onClick={toggleMenu}>
                    <Icon010Blog className="h-menu-icon" /> &nbsp; &nbsp; Blog
                  </li>
                </Link>
                <Link to="/events">
                  <li title="Events" onClick={toggleMenu}>
                    <IconCalendarEventFill className="h-menu-icon" /> &nbsp;
                    &nbsp; Events
                  </li>
                </Link>
                <Link to="/profile/">
                  <li title="Profile" onClick={toggleMenu}>
                    <IconProfile className="h-menu-icon" /> &nbsp; &nbsp;
                    Profile
                  </li>
                </Link>

                <Link to="/bookmarks">
                  <li title="Bookmarked" onClick={toggleMenu}>
                    <IconBxsBookmarks className="h-menu-icon" /> &nbsp; &nbsp;
                    Bookmarked
                  </li>
                </Link>
                <li title="Invite a friend" onClick={toggleMenu}>
                  <IconLinkAdd className="h-menu-icon" /> &nbsp; &nbsp; Invite a
                  friend
                </li>
                <Link to="/contact-us">
                  <li title="Contact  us" onClick={toggleMenu}>
                    <IconMinutemailer className="h-menu-icon" /> &nbsp; &nbsp;
                    Contact us
                  </li>
                </Link>
                <Link to="/advert">
                  <li title="Advertise with us" onClick={toggleMenu}>
                    <IconArrowTrendUp className="h-menu-icon" /> &nbsp; &nbsp;
                    Advertise with us
                  </li>
                </Link>
                <Link to="/help">
                  <li title="Help" onClick={toggleMenu}>
                    <IconHelp className="h-menu-icon-help" /> &nbsp; &nbsp; Help
                  </li>
                </Link>
                <span className="seperator"></span>
                <br />
              </ul>
              <div className="socials">
                <span>Follow us on</span>
                <ul>
                  <li title="Instagram" onClick={toggleMenu}>
                    <Link to="/">
                      <IconSquareInstagram className="h-socials-icon" />
                    </Link>
                  </li>
                  <li title="Twitter" onClick={toggleMenu}>
                    <Link to="/">
                      <IconSquareTwitter className="h-socials-icon" />
                    </Link>
                  </li>
                  <li title="Facebook" onClick={toggleMenu}>
                    <Link to="/">
                      <Icon402Facebook2 className="h-socials-icon" />
                    </Link>
                  </li>
                  <li title="Linkedin" onClick={toggleMenu}>
                    <Link to="/">
                      <Icon458Linkedin className="h-socials-icon" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )} */}
        </nav>
      </header>
    </>
  );
};

export default Header;
