import React from "react";
import {
  IconArrowTrendUp,
  IconArticleFill,
  IconNewspaperSharp,
  IconPeople16,
} from "../../assets/icons";
import { Link } from "react-router-dom";
import "./style.css";

const Descriptor = () => {
  return (
    <div className="des-card">
      <div className="des-item des-item--1">
        <Link to="/past-question">
          <IconNewspaperSharp
            fill="rgba(149,149,255,1) "
            className="des-icon"
          />
        </Link>
        <span className="des-quantity"> 90k+ </span>
        <span className="text text--1">Pastquestions</span>
      </div>

      <div className="des-item des-item--3">
        <Link to="/blog">
          <IconArticleFill fill="rgba(66,193,110,1)" className="des-icon" />
        </Link>
        <span className="des-quantity"> 150+ </span>
        <span className="text text--3">Articles</span>
      </div>

      <div className="des-item des-item--4">
        <Link to="/events">
          {" "}
          <IconArrowTrendUp fill="#134248" className="des-icon" />
        </Link>
        <span className="text text--4">Events</span>
      </div>
    </div>
  );
};

export default Descriptor;
